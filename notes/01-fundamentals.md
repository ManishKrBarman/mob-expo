# React Native Fundamentals - Architecture and Runtime

Master the foundational concepts of React Native architecture, understand how it works under the hood, and learn the core differences from web development.

## 🎯 Learning Progression
**Phase 1: Foundations** → You are here ✅  
**Next**: [Core Components](02-core-components.md) → [Basic Styling](03-basic-styling.md) → [Interactive Components](04-interactive-components.md)

## 📋 Table of Contents

1. [React Native Architecture](#react-native-architecture)
2. [The Bridge vs New Architecture](#the-bridge-vs-new-architecture)
3. [JavaScript Runtime](#javascript-runtime)
4. [Platform Differences](#platform-differences)
5. [Component Lifecycle](#component-lifecycle)
6. [Metro Bundler](#metro-bundler)
7. [Development vs Production](#development-vs-production)

---

## React Native Architecture

## React Native Architecture

### 🏗️ The Three-Layer Architecture

React Native operates on a three-layer architecture that enables JavaScript to control native UI components:

```
┌─────────────────────────────────────┐
│          JavaScript Layer           │
│    ┌─────────────────────────┐      │
│    │   Your React Code       │      │
│    │   Business Logic        │      │  
│    │   State Management      │      │
│    └─────────────────────────┘      │
├─────────────────────────────────────┤
│             Bridge Layer            │
│    ┌─────────────────────────┐      │
│    │   Message Queue         │      │
│    │   JSON Serialization    │      │
│    │   Async Communication   │      │
│    └─────────────────────────┘      │
├─────────────────────────────────────┤
│            Native Layer             │
│    ┌─────────────┬─────────────┐    │
│    │    iOS      │   Android   │    │
│    │   UIKit     │    Views    │    │
│    │  Objective-C│    Java     │    │
│    └─────────────┴─────────────┘    │
└─────────────────────────────────────┘
```

**JavaScript Layer**: 
- Your React components written in JavaScript/TypeScript
- Business logic, state management, and UI descriptions
- Runs in a JavaScript engine (Hermes on newer versions)

**Bridge Layer**: 
- Asynchronous communication between JavaScript and native code
- Serializes data between JavaScript and native platforms
- Handles method calls and event dispatching

**Native Layer**: 
- Actual iOS and Android native components
- Platform-specific UI rendering and user interaction
- Access to device APIs and platform features

### 🔄 How Components Actually Work

When you write this React Native code:
```tsx
import { View, Text } from 'react-native';

function WelcomeScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Hello React Native!</Text>
    </View>
  );
}
```

Here's what happens under the hood:

```
Step 1: JavaScript Execution
┌─────────────────────────────┐
│ WelcomeScreen() renders     │
│ React creates Virtual DOM:  │
│                             │
│ {                           │
│   type: 'View',             │
│   props: {                  │
│     style: { padding: 20 }  │
│   },                        │
│   children: [{              │
│     type: 'Text',           │
│     props: {                │
│       style: { fontSize: 18}│
│     },                      │
│     children: 'Hello!'      │
│   }]                        │
│ }                           │
└─────────────────────────────┘
                ↓
Step 2: Bridge Communication
┌─────────────────────────────┐
│ Bridge serializes message: │
│                             │
│ {                           │
│   "type": "createView",     │
│   "viewTag": 101,           │
│   "viewName": "RCTView",    │
│   "props": {                │
│     "style": {"padding":20} │
│   }                         │
│ }                           │
└─────────────────────────────┘
                ↓
Step 3: Native Rendering
┌─────────────────────────────┐
│ iOS:                        │
│ UIView *view = [[UIView     │
│   alloc] init];             │
│ view.padding = 20;          │
│                             │
│ Android:                    │
│ ViewGroup view = new        │
│   ViewGroup(context);       │
│ view.setPadding(20,20,20,20)│
└─────────────────────────────┘
```

💡 **Try this**: Copy the [platform detection example](../concepts/01-fundamentals/platform-detection.tsx) to see how React Native handles platform differences in real code!

---

## The Bridge vs New Architecture

### 🌉 Legacy Bridge Architecture (React Native < 0.68)

```
JavaScript Thread              Bridge Queue              Native Thread
                                                        
┌─────────────────┐            ┌─────────────┐         ┌─────────────────┐
│ Your Component  │            │ Message     │         │ Native Views    │
│                 │            │ Serializer  │         │                 │
│ function App() {│            │             │         │ UIView *view =  │
│   return (      │───────────►│ JSON        │────────►│   [[UIView      │
│     <View>      │            │ {type:      │         │     alloc]      │
│       <Text/>   │            │  "createV", │         │     init];      │
│     </View>     │            │  props: {}} │         │                 │
│   );            │            │             │         │ [view addSub-   │
│ }               │            │             │         │   view: label]; │
└─────────────────┘            └─────────────┘         └─────────────────┘
                                                        
Event Handling Flow:
                                                        
┌─────────────────┐            ┌─────────────┐         ┌─────────────────┐
│ onPress={() =>  │◄───────────│ Event       │◄────────│ User taps       │
│   setCount(c+1) │            │ Dispatcher  │         │ native button   │
│ }               │            │             │         │                 │
│                 │            │ {           │         │ [button addTarg-│
│ count: 5        │            │   type:     │         │  et: self       │
└─────────────────┘            │   "touch",  │         │  action: @sel   │
                               │   target: 1 │         │  (buttonTapped)]│
                               │ }           │         └─────────────────┘
                               └─────────────┘         
```

**Bridge Limitations**:
- ⏱️ **Async Delays**: Every interaction requires bridge round-trip
- 📦 **JSON Overhead**: All data must be serialized/deserialized  
- 🚫 **No Shared Memory**: Cannot pass object references
- 🐌 **Performance Bottleneck**: Single-threaded JavaScript execution

**Real Example of Bridge Delay**:
```tsx
// This simple touch can take 16-32ms due to bridge communication
<Pressable onPress={() => {
  // 1. Touch event → Bridge → JavaScript (8ms)
  setCount(count + 1);
  // 2. State update → Bridge → Native rerender (8ms)
  // Total: 16ms delay (could miss 60fps frame)
}}>
  <Text>{count}</Text>
</Pressable>
```

### ⚡ New Architecture (JSI + Fabric + TurboModules)

```
JavaScript Interface (JSI) - Direct Communication

┌─────────────────────────────────────────────────────────────┐
│                    Shared Memory Space                      │
├─────────────────────┬───────────────────────────────────────┤
│ JavaScript Thread   │           Native Thread              │
│                     │                                       │
│ function App() {    │  UIView *view = createView();         │
│   const result =    │                                       │
│   nativeModule      │  // Direct function call!            │
│   .calculate(a, b); │  int calculate(int a, int b) {        │
│   return <View/>;   │    return a * b;  // No bridge!       │
│ }                   │  }                                    │
└─────────────────────┴───────────────────────────────────────┘
```

**JSI Advantages**:
- 🚀 **Synchronous Calls**: Direct function invocation, no async delays
- 💨 **Zero Copy**: Shared memory, no serialization needed
- 🔧 **Type Safety**: C++ integration with TypeScript definitions
- ⚡ **Performance**: ~10x faster than bridge for computational tasks

**Fabric (New Renderer)**:
```tsx
// Concurrent rendering - multiple updates can happen simultaneously
function AnimatedCounter() {
  const [count, setCount] = useState(0);
  
  // These updates can be processed concurrently
  const increment = () => {
    startTransition(() => {      // Low priority
      setCount(c => c + 1);
    });
    
    setUrgentUpdate(true);       // High priority - renders first!
  };
  
  return <Text>{count}</Text>;
}
```

**TurboModules Example**:
```tsx
// Old way: All modules loaded at startup
import { NativeModules } from 'react-native';
const { MathModule } = NativeModules; // Loaded even if never used!

// New way: Lazy loading with type safety
import MathTurboModule from './MathTurboModule';

function Calculator() {
  const result = MathTurboModule.calculateFast(10, 20); // Only loads when called!
  return <Text>{result}</Text>;
}
```

💡 **Performance Comparison**:
```
Bridge Architecture:    Touch → 16ms → Update
New Architecture:       Touch → 2ms → Update
Result: 8x faster interactions!
```

---

## JavaScript Runtime

### 🚀 Engine Evolution

**Hermes (Current Default)**:
- Bytecode compilation for faster startup
- Optimized garbage collection
- Better memory usage
- Ahead-of-time compilation

**V8 (Alternative)**:
- Same engine as Chrome
- Just-in-time compilation
- Advanced optimization techniques

### 🧵 Threading Model

```
Main Thread (UI)     │  JavaScript Thread  │  Background Threads
                    │                     │
Native UI Rendering │  React Components   │  Image Loading
Touch Events       │  Business Logic     │  Network Requests  
Animations         │  State Updates      │  File Operations
                    │                     │
```

**Key Points**:
- UI thread must never be blocked
- JavaScript thread handles all React logic
- Background threads for heavy operations
- Bridge/JSI handles thread communication

---

## Platform Differences

### 📱 iOS vs Android: Under the Hood

React Native components map to completely different native implementations:

```
React Native          iOS (UIKit)           Android (Views)
┌─────────────┐      ┌─────────────┐       ┌─────────────┐
│   <View />  │ ────►│   UIView    │       │ ViewGroup   │
│             │      │             │       │             │
│ Container   │      │ Base view   │       │ Layout      │
│ for other   │      │ class for   │       │ container   │
│ components  │      │ drawing     │       │ for child   │
└─────────────┘      └─────────────┘       │ views       │
                                           └─────────────┘

┌─────────────┐      ┌─────────────┐       ┌─────────────┐
│   <Text />  │ ────►│  UILabel    │       │  TextView   │
│             │      │             │       │             │
│ Display     │      │ Label for   │       │ Text        │
│ text        │      │ text        │       │ display     │
│ content     │      │ display     │       │ widget      │
└─────────────┘      └─────────────┘       └─────────────┘

┌─────────────┐      ┌─────────────┐       ┌─────────────┐
│  <Image />  │ ────►│UIImageView  │       │ ImageView   │
│             │      │             │       │             │
│ Display     │      │ Image       │       │ Image       │
│ images      │      │ display     │       │ display     │
│ from URIs   │      │ view        │       │ view        │
└─────────────┘      └─────────────┘       └─────────────┘
```

### 🎨 Platform-Specific Styling

Each platform has different approaches to common UI patterns:

```tsx
import { Platform, StyleSheet } from 'react-native';

// Shadow Implementation - Completely Different!
const styles = StyleSheet.create({
  cardShadow: {
    ...Platform.select({
      ios: {
        // iOS: Uses CGLayer shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        // Android: Uses material elevation
        elevation: 5,
      },
    }),
  },
});

// The result LOOKS similar but uses completely different native APIs:
// iOS: [view.layer setShadowColor:color.CGColor]
// Android: view.setElevation(5.0f)
```

**Real Platform Differences in Action**:

```tsx
function PlatformAwareButton() {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#ddd' : '#fff',
          padding: 15,
          borderRadius: Platform.select({
            ios: 8,      // iOS prefers rounded corners
            android: 4,  // Android prefers subtle rounding
          }),
        },
        // Shadow works differently on each platform
        Platform.OS === 'ios' && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        },
        Platform.OS === 'android' && {
          elevation: 3,
        },
      ]}
    >
      <Text style={{
        fontSize: Platform.select({
          ios: 17,     // iOS system font sizing
          android: 16, // Android material design sizing
        }),
        fontWeight: Platform.select({
          ios: '500',    // iOS medium weight
          android: 'normal', // Android normal weight
        }),
      }}>
        {Platform.OS === 'ios' ? 'iOS Button' : 'Android Button'}
      </Text>
    </Pressable>
  );
}
```

### 📐 Layout Differences

Platform-specific layout behaviors you need to know:

```tsx
function PlatformLayoutDemo() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Status bar handling is different */}
      <StatusBar 
        barStyle={Platform.select({
          ios: 'dark-content',      // iOS status bar
          android: 'light-content', // Android status bar
        })}
        backgroundColor={Platform.select({
          android: '#000',  // Only Android needs this
          ios: undefined,   // iOS ignores this prop
        })}
      />
      
      <View style={{
        flex: 1,
        // Different safe area approaches
        paddingTop: Platform.select({
          ios: 0,      // SafeAreaView handles this
          android: 25, // Manual status bar padding
        }),
      }}>
        <Text>Platform-aware layout</Text>
      </View>
    </SafeAreaView>
  );
}
```

### 🔧 Platform Detection Patterns

**Runtime Platform Detection**:
```tsx
import { Platform } from 'react-native';

// Simple platform checks
if (Platform.OS === 'ios') {
  // iOS-specific code
} else if (Platform.OS === 'android') {
  // Android-specific code
}

// Version checking
if (Platform.OS === 'ios' && Platform.Version >= '14') {
  // iOS 14+ specific features
}

if (Platform.OS === 'android' && Platform.Version >= 29) {
  // Android API level 29+ features
}
```

**Compile-time Platform Selection**:
```tsx
const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        backgroundColor: '#007AFF', // iOS blue
      },
      android: {
        backgroundColor: '#2196F3', // Material blue
      },
      default: {
        backgroundColor: '#0066CC', // Fallback
      },
    }),
  },
});
```

💡 **Practice Platform Differences**: 
Try the [platform detection example](../concepts/01-fundamentals/platform-detection.tsx) to see these concepts in action!

---

## Component Lifecycle

### 🔄 React Native Component Lifecycle

React Native follows React's lifecycle but with native considerations:

```tsx
import { useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';

function LifecycleAwareComponent() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Component Mount - Native views created
    console.log('Component mounted, native views created');
    
    const handleAppStateChange = (nextAppState: string) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        // Refresh data, restart animations
      } else if (nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background!');
        // Pause animations, save state
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Component Unmount - Native views destroyed
      subscription.remove();
      console.log('Component unmounted, native views cleaned up');
    };
  }, [appState]);

  // Component Update - Native views updated via bridge/JSI
  useEffect(() => {
    console.log('Component updated, native views synchronized');
  });

  return null; // Your component JSX
}
```

**Critical Lifecycle Moments**:
1. **Mount**: Native views created, memory allocated
2. **Update**: Bridge messages sent, native properties updated
3. **Background**: App lifecycle affects component behavior
4. **Unmount**: Native views destroyed, memory freed

---

## Metro Bundler

### 📦 How Metro Works

Metro is React Native's JavaScript bundler, responsible for:

```
Source Files (.js, .tsx)
         │
         ▼
    Metro Bundler
    ┌─────────────┐
    │ Transform   │ ← Babel, TypeScript
    │ Bundle      │ ← Combine modules
    │ Optimize    │ ← Minify, tree-shake
    └─────────────┘
         │
         ▼
    Bundle (.bundle)
```

**Metro Configuration** (`metro.config.js`):
```javascript
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Performance optimization
      },
    }),
  },
  resolver: {
    alias: {
      '@components': './src/components',
      '@utils': './src/utils',
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

**Bundle Analysis**:
```bash
# Generate bundle analysis
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android-release.bundle \
  --verbose
```

---

## Development vs Production

### 🔧 Development Mode

**Features**:
- Hot reloading and fast refresh
- Detailed error messages and stack traces
- Development server connection
- Debugging tools integration

```tsx
import { __DEV__ } from 'react-native';

function DevelopmentFeatures() {
  useEffect(() => {
    if (__DEV__) {
      // Development-only code
      console.log('Running in development mode');
      
      // Enable Flipper integration
      import('react-native-flipper').then(flipper => {
        flipper.logger.info('Flipper connected');
      });
    }
  }, []);

  return null;
}
```

### 🚀 Production Build

**Optimizations**:
- Hermes bytecode compilation
- Bundle minification and optimization
- Dead code elimination
- Image optimization

```bash
# Android production build
cd android && ./gradlew assembleRelease

# iOS production build  
cd ios && xcodebuild -workspace MyApp.xcworkspace \
  -scheme MyApp -configuration Release
```

**Performance Characteristics**:
```
Development Build:
- Bundle size: ~5-10MB
- Startup time: 2-5 seconds
- Memory usage: Higher (debug symbols)

Production Build:
- Bundle size: ~1-3MB (with Hermes)
- Startup time: 0.5-2 seconds  
- Memory usage: Optimized
```

---

## 🎯 Key Takeaways

1. **Architecture Understanding**: React Native bridges JavaScript and native code
2. **Performance Implications**: Bridge communication affects app performance
3. **Platform Awareness**: iOS and Android have different behaviors and APIs
4. **Lifecycle Management**: Component lifecycle affects native resource management
5. **Build Optimization**: Development and production builds have different characteristics

## 🚀 Next Steps

After mastering these fundamentals, you're ready to explore:
- Core Components (View, Text, Image, ScrollView)
- Basic styling with inline styles and StyleSheet API
- Understanding component rendering and optimization patterns

This foundation will help you understand why certain patterns work better than others and how to build performant React Native applications.
