# Core Components - The Building Blocks

Master the fundamental components that form the foundation of every React Native application. These components map directly to native platform elements and are essential for building any user interface.

## 🎯 Learning Progression
**Previous**: [React Native Fundamentals](01-fundamentals.md) ← **Phase 1: Foundations** → You are here ✅  
**Next**: [Basic Styling](03-basic-styling.md) → [Interactive Components](04-interactive-components.md)

## 📋 Table of Contents

1. [Component Architecture](#component-architecture)
2. [View Component](#view-component)
3. [Text Component](#text-component)
4. [Image Component](#image-component)
5. [ScrollView Component](#scrollview-component)
6. [Platform Mapping](#platform-mapping)
7. [Performance Considerations](#performance-considerations)
8. [Best Practices](#best-practices)

---

## Component Architecture

### 🏗️ Native Component Mapping

Every React Native component corresponds to actual native platform components. Here's how the bridge transforms your JSX:

```
Your React Native Code        iOS Native Result         Android Native Result
┌─────────────────────┐      ┌─────────────────┐       ┌─────────────────┐
│ <View               │      │ UIView *view =  │       │ ViewGroup view =│
│   style={{          │ ────►│   [[UIView      │ ────► │   new ViewGroup │
│     flex: 1,        │      │     alloc]      │       │   (context);    │
│     backgroundColor:│      │     init];      │       │ view.setBackground│
│     '#f0f0f0'       │      │ view.backgroundColor│   │   Color(0xfff0f0f0)│
│   }}>               │      │   = [UIColor    │       │ view.setFlex(1);│
│   <Text>Hello</Text>│      │     grayColor]; │       │                 │
│ </View>             │      │ [view addSub-   │       │ TextView text = │
└─────────────────────┘      │   view: label]; │       │   new TextView();│
                             └─────────────────┘       │ view.addView(text)│
                                                       └─────────────────┘
```

### 🎯 Why Core Components Matter

**Performance**: 
```tsx
// ✅ Native rendering - 60 FPS possible
<View>
  <Text>Native performance</Text>
</View>

// ❌ Web view rendering - slower, inconsistent
<WebView html="<div>Web content</div>" />
```

**Platform Integration**: Automatic platform-specific behavior
**Accessibility**: Built-in screen reader and voice control support  
**Gesture Handling**: Native touch events and gesture recognition

💡 **See It in Action**: Try the [View comprehensive example](../concepts/02-core-components/view-comprehensive.tsx) to see these concepts working!

---

## View Component

### 🏠 The Foundation Container

`View` is the fundamental building block - equivalent to `div` in web development but with native performance.

```
View Component Hierarchy
┌─────────────────────────────────────┐
│              <View>                 │ ← Container (like div)
│  ┌─────────────────────────────┐    │
│  │         <View>              │    │ ← Nested container
│  │  ┌─────────────────────┐    │    │
│  │  │      <Text>         │    │    │ ← Content component
│  │  │   "Hello World"     │    │    │
│  │  └─────────────────────┘    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Basic Usage**:
```tsx
import { View } from 'react-native';

function BasicContainer() {
  return (
    <View style={{
      flex: 1,                 // Take all available space
      backgroundColor: '#f0f0f0', // Light gray background  
      padding: 20,             // 20px padding on all sides
    }}>
      {/* Child components go here */}
    </View>
  );
}
```

### 🎨 View Layout Patterns

**Flexbox Layout** (Default behavior):
```tsx
function FlexboxLayout() {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {/* Visual representation:
      ┌─────────────┐
      │    Header   │
      ├─────────────┤
      │             │
      │   Content   │
      │             │
      ├─────────────┤
      │   Footer    │
      └─────────────┘
      */}
      <View style={{ height: 60, backgroundColor: '#007AFF' }}>
        {/* Header */}
      </View>
      <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        {/* Content area - takes remaining space */}
      </View>
      <View style={{ height: 80, backgroundColor: '#6c757d' }}>
        {/* Footer */}
      </View>
    </View>
  );
}
```

**Row Layout**:
```tsx
function RowLayout() {
  return (
    <View style={{ flexDirection: 'row', padding: 20 }}>
      {/* Visual representation:
      ┌───────┬─────────────┬───────┐
      │ Left  │   Center    │ Right │
      │ 100px │   (flex)    │ 80px  │
      └───────┴─────────────┴───────┘
      */}
      <View style={{ width: 100, backgroundColor: '#ff6b6b' }}>
        {/* Fixed width left column */}
      </View>
      <View style={{ flex: 1, backgroundColor: '#4ecdc4' }}>
        {/* Flexible center column */}
      </View>
      <View style={{ width: 80, backgroundColor: '#45b7d1' }}>
        {/* Fixed width right column */}
      </View>
    </View>
  );
}
```

### 🎯 Advanced View Features

**Interactive Views**:
```tsx
import { View, Pressable } from 'react-native';

function InteractiveCard() {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#f0f0f0' : 'white',
          borderRadius: 12,
          padding: 16,
          margin: 10,
          // Platform-specific shadow
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 4,
            },
          }),
        },
      ]}
      onPress={() => console.log('Card pressed!')}
    >
      {/* Card content goes here */}
    </Pressable>
  );
}
```

**Border and Corner Styling**:
```tsx
function StyledView() {
  return (
    <View style={{
      borderWidth: 2,           // Border thickness
      borderColor: '#007AFF',   // Border color
      borderRadius: 12,         // Rounded corners
      borderStyle: 'dashed',    // Border style (solid, dashed, dotted)
      
      // Individual corner radius
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      
      // Individual border sides
      borderTopWidth: 3,
      borderBottomWidth: 1,
      borderLeftColor: '#ff6b6b',
      borderRightColor: '#4ecdc4',
    }}>
      {/* Styled content */}
    </View>
  );
}
```

💡 **Practice with Views**: 
Copy the [View comprehensive example](../concepts/02-core-components/view-comprehensive.tsx) to your playground and experiment with different layout patterns!
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3, // Android shadow
      }}
      // Accessibility
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Card container"
    >
      {/* Content */}
    </View>
  );
}
```

### 🔧 View Props Deep Dive

```tsx
interface ViewProps {
  // Layout
  style?: StyleProp<ViewStyle>;
  
  // Touch handling
  onLayout?: (event: LayoutChangeEvent) => void;
  onTouchStart?: (event: GestureResponderEvent) => void;
  onTouchMove?: (event: GestureResponderEvent) => void;
  onTouchEnd?: (event: GestureResponderEvent) => void;
  
  // Accessibility
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  
  // Performance
  removeClippedSubviews?: boolean; // Optimize off-screen views
  collapsable?: boolean;          // Android optimization
  
  // Platform specific
  needsOffscreenAlphaCompositing?: boolean; // iOS transparency
  renderToHardwareTextureAndroid?: boolean; // Android GPU rendering
}
```

**Key Insights**:
- `View` handles layout, styling, and basic touch events
- Essential for creating visual hierarchy and component structure
- Platform-specific optimizations available for performance tuning

---

## Text Component

### 📝 Typography Foundation

`Text` is the only component that can display text in React Native. All text must be wrapped in a Text component.

```tsx
import { Text } from 'react-native';

// Basic text display
function BasicText() {
  return (
    <Text style={{
      fontSize: 16,
      fontWeight: '500',
      color: '#333333',
      lineHeight: 22,
    }}>
      Hello React Native!
    </Text>
  );
}
```

### 🎨 Advanced Text Features

```tsx
function AdvancedTextExample() {
  return (
    <Text
      style={{
        fontSize: 18,
        fontFamily: 'System', // Platform-specific fonts
        textAlign: 'center',
      }}
      // Text behavior
      numberOfLines={2}              // Limit lines
      ellipsizeMode="tail"           // Truncation method
      selectable={true}              // Allow text selection
      allowFontScaling={false}       // Disable accessibility scaling
      
      // Events
      onPress={() => console.log('Text pressed')}
      onLongPress={() => console.log('Text long pressed')}
      
      // Accessibility
      accessibilityRole="header"
      accessibilityLevel={1}
    >
      This is a long text that might overflow and will be truncated with ellipsis
      <Text style={{ fontWeight: 'bold', color: '#007AFF' }}>
        {' '}with nested styled text
      </Text>
    </Text>
  );
}
```

### 🔤 Typography Best Practices

```tsx
// Create reusable text components
const Typography = {
  Heading1: ({ children, style, ...props }: TextProps) => (
    <Text
      style={[{
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
        color: '#1a1a1a',
      }, style]}
      accessibilityRole="header"
      accessibilityLevel={1}
      {...props}
    >
      {children}
    </Text>
  ),
  
  Body: ({ children, style, ...props }: TextProps) => (
    <Text
      style={[{
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        color: '#333333',
      }, style]}
      {...props}
    >
      {children}
    </Text>
  ),
  
  Caption: ({ children, style, ...props }: TextProps) => (
    <Text
      style={[{
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: '#666666',
      }, style]}
      {...props}
    >
      {children}
    </Text>
  ),
};

// Usage
function TypographyExample() {
  return (
    <View>
      <Typography.Heading1>Article Title</Typography.Heading1>
      <Typography.Body>Article content goes here...</Typography.Body>
      <Typography.Caption>Published 2 hours ago</Typography.Caption>
    </View>
  );
}
```

### 🌍 Platform-Specific Typography

```tsx
import { Platform } from 'react-native';

const platformTypography = {
  heading: {
    fontSize: 24,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        letterSpacing: 0.35,
      },
      android: {
        fontFamily: 'Roboto',
        letterSpacing: 0.25,
      },
    }),
  },
};
```

---

## Image Component

### 🖼️ Visual Content Display

`Image` handles all image display scenarios - from static assets to dynamic network images.

### 📁 Static Images (Local Assets)

```tsx
import { Image } from 'react-native';

// Import static images
const logoImage = require('../assets/images/logo.png');

function StaticImageExample() {
  return (
    <Image
      source={logoImage}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
      }}
      // Performance
      resizeMode="cover"
      fadeDuration={300} // Android fade-in animation
    />
  );
}
```

### 🌐 Network Images (Remote URLs)

```tsx
function NetworkImageExample() {
  return (
    <Image
      source={{
        uri: 'https://example.com/image.jpg',
        // Optional headers for authentication
        headers: {
          'Authorization': 'Bearer token',
        },
        // Caching behavior
        cache: 'force-cache',
      }}
      style={{
        width: 200,
        height: 150,
        borderRadius: 12,
      }}
      // Loading states
      onLoadStart={() => console.log('Loading started')}
      onLoad={() => console.log('Image loaded')}
      onLoadEnd={() => console.log('Loading finished')}
      onError={(error) => console.log('Loading error:', error)}
      
      // Placeholder while loading
      defaultSource={require('../assets/images/placeholder.png')}
      
      // Resize behavior
      resizeMode="cover" // cover, contain, stretch, repeat, center
    />
  );
}
```

### 📱 Device Images (Camera Roll)

```tsx
import { launchImageLibrary } from 'react-native-image-picker';

function DeviceImageExample() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const selectImage = () => {
    launchImageLibrary({ 
      mediaType: 'photo',
      quality: 0.8,
    }, (response) => {
      if (response.assets && response.assets[0]) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View>
      <Pressable onPress={selectImage}>
        <Text>Select Image</Text>
      </Pressable>
      
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 200,
            height: 200,
            marginTop: 20,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      )}
    </View>
  );
}
```

### 🎨 Advanced Image Techniques

```tsx
// Image with loading state and error handling
function AdvancedImageComponent({ uri, placeholder }: ImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={{ uri }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 12,
        }}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        resizeMode="cover"
      />
      
      {loading && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: 12,
        }}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      )}
      
      {error && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f8f8',
          borderRadius: 12,
        }}>
          <Text style={{ color: '#666', fontSize: 12 }}>
            Failed to load image
          </Text>
        </View>
      )}
    </View>
  );
}
```

---

## ScrollView Component

### 📜 Scrollable Content Container

`ScrollView` creates scrollable content areas for content that exceeds screen boundaries.

### ⚡ Basic Vertical Scrolling

```tsx
import { ScrollView, View, Text } from 'react-native';

function BasicScrollExample() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40, // Extra bottom padding
      }}
      // Scroll behavior
      showsVerticalScrollIndicator={true}
      bounces={true}              // iOS bounce effect
      alwaysBounceVertical={false} // iOS bounce when content fits
      
      // Performance
      removeClippedSubviews={true}
      scrollEventThrottle={16}    // 60fps scroll events
    >
      {/* Long content that needs scrolling */}
      {Array.from({ length: 20 }, (_, index) => (
        <View
          key={index}
          style={{
            height: 80,
            backgroundColor: '#f0f0f0',
            marginVertical: 5,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Item {index + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
```

### ↔️ Horizontal Scrolling

```tsx
function HorizontalScrollExample() {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      // Snap to items
      pagingEnabled={false}
      snapToInterval={150} // Snap every 150 points
      snapToAlignment="center"
      decelerationRate="fast"
    >
      {Array.from({ length: 10 }, (_, index) => (
        <View
          key={index}
          style={{
            width: 120,
            height: 120,
            backgroundColor: '#007AFF',
            marginRight: 15,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            {index + 1}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
```

### 🎛️ Advanced ScrollView Features

```tsx
function AdvancedScrollViewExample() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  return (
    <ScrollView
      // Scroll events
      onScroll={(event) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        setScrollY(currentScrollY);
      }}
      onScrollBeginDrag={() => setIsScrolling(true)}
      onScrollEndDrag={() => setIsScrolling(false)}
      onMomentumScrollBegin={() => setIsScrolling(true)}
      onMomentumScrollEnd={() => setIsScrolling(false)}
      
      // Refresh control
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            // Refresh data
            console.log('Refreshing...');
          }}
          colors={['#007AFF']} // Android
          tintColor="#007AFF"  // iOS
        />
      }
      
      // Keyboard behavior
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      
      // Content insets (iOS)
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 0, bottom: 0 }}
      scrollIndicatorInsets={{ top: 0, bottom: 0 }}
    >
      {/* Header that responds to scroll */}
      <View style={{
        height: 200,
        backgroundColor: '#007AFF',
        opacity: Math.max(0.3, 1 - scrollY / 200),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          Parallax Header
        </Text>
      </View>
      
      {/* Scrollable content */}
      <View style={{ padding: 20 }}>
        {Array.from({ length: 15 }, (_, index) => (
          <View key={index} style={{
            height: 60,
            backgroundColor: 'white',
            marginVertical: 5,
            borderRadius: 8,
            justifyContent: 'center',
            paddingHorizontal: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}>
            <Text>Content Item {index + 1}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
```

---

## Platform Mapping

### 🎯 Understanding Native Implementation

```tsx
// How React Native components map to platform components:

// iOS UIKit Mapping
<View />        → UIView
<Text />        → UILabel  
<Image />       → UIImageView
<ScrollView />  → UIScrollView
<TextInput />   → UITextField

// Android Views Mapping  
<View />        → android.view.ViewGroup
<Text />        → android.widget.TextView
<Image />       → android.widget.ImageView
<ScrollView />  → android.widget.ScrollView
<TextInput />   → android.widget.EditText
```

### 🔧 Platform-Specific Behavior

```tsx
import { Platform } from 'react-native';

function PlatformAwareComponent() {
  return (
    <View style={{
      // Different elevation/shadow approaches
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    }}>
      <Text style={{
        // Platform-specific fonts
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto',
        }),
      }}>
        Platform-specific styling
      </Text>
    </View>
  );
}
```

---

## Performance Considerations

### 🚀 Optimization Strategies

**1. View Optimization**
```tsx
// Use removeClippedSubviews for large scrollable content
<ScrollView removeClippedSubviews={true}>
  {/* Many items */}
</ScrollView>

// Avoid unnecessary View nesting
// ❌ Over-nesting
<View>
  <View>
    <View>
      <Text>Content</Text>
    </View>
  </View>
</View>

// ✅ Simplified structure
<View>
  <Text>Content</Text>
</View>
```

**2. Image Optimization**
```tsx
// Optimize image loading
<Image
  source={{ uri: 'https://example.com/large-image.jpg' }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover" // Don't load full resolution for small display
  fadeDuration={0}   // Disable fade animation if not needed
/>

// Use appropriate image formats
// WebP for Android, optimized PNG/JPEG for iOS
```

**3. ScrollView Performance**
```tsx
// For large lists, use FlatList instead of ScrollView
// ScrollView renders all children immediately
// FlatList renders only visible items

// ❌ ScrollView with many items
<ScrollView>
  {hugeArray.map(item => <ItemComponent key={item.id} item={item} />)}
</ScrollView>

// ✅ FlatList for large datasets
<FlatList
  data={hugeArray}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={item => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

---

## Best Practices

### ✅ Component Usage Guidelines

**1. Semantic Component Usage**
```tsx
// Use components for their intended purpose
<View>          {/* Container, layout */}
<Text>          {/* All text content */}
<Image>         {/* Visual content */}
<ScrollView>    {/* Scrollable content */}
<Pressable>     {/* Interactive elements */}
```

**2. Accessibility First**
```tsx
// Always consider accessibility
<View
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Add to favorites"
  accessibilityHint="Double tap to add this item to your favorites"
>
  <Text>⭐</Text>
</View>
```

**3. Performance-Conscious Development**
```tsx
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return (
    <View>
      {/* Complex rendering logic */}
    </View>
  );
});

// Use callback hooks for event handlers
const handlePress = useCallback(() => {
  // Handle press
}, [dependencies]);
```

**4. Responsive Design**
```tsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive sizing
<View style={{
  width: width * 0.9,        // 90% of screen width
  height: height * 0.3,      // 30% of screen height
  aspectRatio: 16/9,         // Maintain aspect ratio
}}>
```

---

## 🎯 Key Takeaways

1. **Foundation Understanding**: Core components map directly to native platform elements
2. **Performance Impact**: Component choice affects app performance and user experience
3. **Platform Awareness**: Components behave differently on iOS vs Android
4. **Accessibility**: Built-in accessibility features should always be utilized
5. **Optimization**: Choose the right component for the use case (ScrollView vs FlatList)

## 🚀 Next Steps

With core components mastered, you're ready for:
- Basic styling with inline styles and StyleSheet API
- Understanding Flexbox layout system
- Adding interactivity with Button and Pressable components

These components form the foundation of every React Native interface, so understanding them deeply will benefit all future development.