# React Native Fundamentals - Practical Examples 🏗️

> Hands-on examples demonstrating React Native architecture concepts and platform differences.

## 📚 Examples Overview

### Platform Architecture Understanding
- **`platform-detection.tsx`** - Platform-specific development patterns and conditional rendering
- **`architecture-visualization.tsx`** - Interactive demonstration of React Native architecture concepts

## 🎯 Learning Objectives

After working through these examples, you'll understand:

### Core Architecture
- **🌉 Bridge Communication** - How React Native bridges JavaScript and native code
- **📱 Platform Differences** - Key differences between iOS and Android development
- **🔧 Component Mapping** - How React Native components map to native elements
- **📊 Platform Detection** - Using Platform API for conditional logic

### Practical Skills
- **🎯 Platform-Specific Code** - Writing code that adapts to different platforms
- **🔄 Conditional Rendering** - Showing different UI based on platform
- **📐 Responsive Design** - Using dimensions and scale factors
- **🎨 Platform-Native Design** - Following iOS and Android design guidelines

## 🚀 Usage Guide

### Quick Testing
```bash
# From repository root
cd playground/test-app

# Test platform detection patterns
cp ../../concepts/01-fundamentals/platform-detection.tsx app/index.tsx
npm start

# Test interactive architecture demo  
cp ../../concepts/01-fundamentals/architecture-visualization.tsx app/index.tsx
# App automatically reloads with new example
```

### Learning Path
1. **Start with Theory**: Read [notes/01-fundamentals.md](../../notes/01-fundamentals.md)
2. **Platform Detection**: Copy and run `platform-detection.tsx`
3. **Architecture Demo**: Copy and run `architecture-visualization.tsx`
4. **Experiment**: Modify examples to deepen understanding

## 💡 Key Concepts Demonstrated

### Platform Detection Example (`platform-detection.tsx`)
- **Platform.OS** - Detecting current platform (ios, android, web)
- **Platform.Version** - Getting platform version information
- **Platform.select()** - Choosing values based on platform
- **Platform.isTV** - Detecting TV devices
- **Dimensions API** - Getting screen dimensions and handling changes
- **Conditional Styling** - Platform-specific visual design
- **Platform-Specific Fonts** - Using system fonts appropriately

### Architecture Visualization (`architecture-visualization.tsx`)
- **Component Hierarchy** - Understanding React Native's component tree
- **Native Mapping** - Real-time demonstration of component-to-native translation
- **Bridge Events** - Interactive bridge communication through touch events
- **Platform Differences** - Side-by-side iOS vs Android behavior
- **Performance Insights** - Understanding native rendering performance

## 📖 Related Theory

**📚 Complete theoretical foundation**: [../../notes/01-fundamentals.md](../../notes/01-fundamentals.md)

This theory covers:
- React Native architecture deep-dive
- Bridge vs JSI communication
- Platform development considerations
- Performance implications of architectural choices

## 🔗 Building Foundation For

These fundamentals prepare you for:
- **[Core Components](../02-core-components/)** - Understanding how View, Text, etc. work
- **[Basic Styling](../03-basic-styling/)** - Platform-aware styling strategies
- **[Interactive Components](../04-interactive-components/)** - Touch handling and user interaction

## 💻 Example Details

### Platform Detection Example
```tsx
// Key patterns demonstrated:
Platform.OS                    // 'ios' | 'android' | 'web'
Platform.Version              // iOS: '14.5', Android: 30
Platform.select({             // Conditional values
  ios: 'iOS value',
  android: 'Android value',
  default: 'Fallback value'
})
```

### Architecture Visualization
```tsx
// Interactive concepts:
- Touch event → Bridge → JavaScript
- Component tree visualization  
- Platform-specific native elements
- Real-time performance monitoring
```

## � Development Tips

### Testing on Multiple Platforms
```bash
# Test on iOS (Mac only)
npm run ios

# Test on Android  
npm run android

# Test on Web
npm run web
```

### Debugging Platform Issues
- Use React Native Debugger for bridge inspection
- Test platform-specific code on actual devices
- Monitor performance differences between platforms
- Validate design consistency across platforms

## ✨ Next Steps

After mastering these fundamentals:

1. **📱 [Core Components](../02-core-components/)** - Dive into View, Text, Image, ScrollView
2. **🎨 [Basic Styling](../03-basic-styling/)** - Learn styling patterns and best practices  
3. **🎮 [Interactive Components](../04-interactive-components/)** - Add user interaction and touch handling

Each example in this directory is self-contained with comprehensive comments explaining underlying architectural concepts.

---

*These examples provide the foundational understanding necessary for all React Native development. Master these concepts before progressing to component-specific learning.*
