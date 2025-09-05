# Basic Styling - Foundation Styles and StyleSheet API

Master the fundamental styling approaches in React Native, from inline styles to the StyleSheet API, understanding style precedence and building efficient styling patterns.

## 🎯 Learning Progression
**Previous**: [React Native Fundamentals](01-fundamentals.md) → [Core Components](02-core-components.md) ← **Phase 1: Foundations** → You are here ✅  
**Next**: [Interactive Components](04-interactive-components.md) → **Phase 2: User Interaction**

## 📋 Table of Contents

1. [Styling Philosophy](#styling-philosophy)
2. [Inline Styles](#inline-styles)
3. [StyleSheet API](#stylesheet-api)
4. [Style Arrays and Precedence](#style-arrays-and-precedence)
5. [Dynamic Styling](#dynamic-styling)
6. [Common Style Patterns](#common-style-patterns)
7. [Performance Optimization](#performance-optimization)
8. [Best Practices](#best-practices)

---

## Styling Philosophy

### 🎨 React Native Styling Approach

React Native styling is **not CSS** - it's a subset of CSS properties implemented as JavaScript objects:

```tsx
// Not CSS - it's JavaScript objects with CSS-like properties
const styles = {
  backgroundColor: '#ffffff',    // camelCase instead of kebab-case
  fontSize: 16,                 // numbers without 'px' 
  marginTop: 20,                // no units needed for most properties
  fontWeight: 'bold',           // strings for text values
};
```

**Key Differences from Web CSS**:
- **JavaScript Objects**: Styles are JS objects, not CSS strings
- **camelCase Properties**: `backgroundColor` instead of `background-color`
- **No Units**: Most numeric values don't need units (defaults to points)
- **Limited Properties**: Only mobile-relevant CSS properties are available
- **No Cascading**: Styles don't cascade like web CSS

### 🏗️ Style Application Flow

```
Component Definition
         │
         ▼
Style Object Created
         │
         ▼
Bridge/JSI Communication  
         │
         ▼
Native Platform Styling
(iOS: CALayer, Android: Paint)
```

---

## Inline Styles

### 📝 Basic Inline Styling

Inline styles are JavaScript objects applied directly to the `style` prop:

```tsx
import { View, Text } from 'react-native';

function InlineStyleExample() {
  return (
    <View style={{
      backgroundColor: '#f8f9fa',
      padding: 20,
      margin: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e9ecef',
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        textAlign: 'center',
        marginBottom: 10,
      }}>
        Inline Styled Component
      </Text>
      
      <Text style={{
        fontSize: 14,
        color: '#6c757d',
        lineHeight: 20,
      }}>
        This text uses inline styling for quick prototyping and one-off styles.
      </Text>
    </View>
  );
}
```

### 🎯 When to Use Inline Styles

**✅ Good for**:
- Quick prototyping and experimentation
- Dynamic styles based on props or state
- One-off styles that won't be reused
- Conditional styling

**❌ Avoid for**:
- Styles that will be reused across components
- Complex style objects that make JSX hard to read
- Performance-critical components with frequent re-renders

### 🔄 Dynamic Inline Styles

```tsx
function DynamicInlineExample({ isPressed, isDisabled, variant }) {
  const isActive = !isDisabled;
  
  return (
    <Pressable
      style={{
        backgroundColor: isDisabled 
          ? '#e9ecef' 
          : isPressed 
            ? '#0056b3' 
            : variant === 'primary' 
              ? '#007bff' 
              : '#6c757d',
        
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        
        // Dynamic opacity
        opacity: isDisabled ? 0.6 : 1,
        
        // Dynamic transform
        transform: [
          { scale: isPressed ? 0.95 : 1 }
        ],
      }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={{
        color: isActive ? 'white' : '#6c757d',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      }}>
        Dynamic Button
      </Text>
    </Pressable>
  );
}
```

---

## StyleSheet API

### 📚 Creating Reusable Styles

The `StyleSheet` API provides better performance and development experience:

```tsx
import { StyleSheet, View, Text } from 'react-native';

// Define styles once, use many times
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  card: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  
  cardContent: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});

function StyleSheetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>StyleSheet Example</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardContent}>
          This card uses StyleSheet for better performance and reusability.
        </Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Another Card</Text>
        <Text style={styles.cardContent}>
          Same styles, different content. Very efficient!
        </Text>
      </View>
    </View>
  );
}
```

### 🚀 StyleSheet Benefits

**Performance Advantages**:
```tsx
// StyleSheet validates styles once at creation time
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    // ↑ Validated once, optimized for native bridge
  },
});

// vs inline styles validated on every render
<View style={{
  backgroundColor: '#007bff',
  padding: 12,
  borderRadius: 6,
  // ↑ Re-validated every render
}} />
```

**Development Benefits**:
- **Auto-completion**: Better IDE support
- **Type Safety**: TypeScript integration
- **Validation**: Catches invalid properties early
- **Performance**: Optimized style object references

### 🔧 Advanced StyleSheet Patterns

```tsx
// Modular style organization
const typography = StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  heading2: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
});

const colors = StyleSheet.create({
  primary: { color: '#007bff' },
  secondary: { color: '#6c757d' },
  success: { color: '#28a745' },
  danger: { color: '#dc3545' },
  warning: { color: '#ffc107' },
  info: { color: '#17a2b8' },
});

const spacing = StyleSheet.create({
  xs: { margin: 4 },
  sm: { margin: 8 },
  md: { margin: 16 },
  lg: { margin: 24 },
  xl: { margin: 32 },
});

// Usage with style composition
function ModularStyledComponent() {
  return (
    <View>
      <Text style={[typography.heading1, colors.primary]}>
        Modular Typography
      </Text>
      <Text style={[typography.body, colors.secondary]}>
        Composed from modular style objects
      </Text>
    </View>
  );
}
```

---

## Style Arrays and Precedence

### 🎲 Style Composition

React Native supports arrays of style objects, with later styles taking precedence:

```tsx
const baseStyles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  primaryButton: {
    backgroundColor: '#007bff',
  },
  
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  
  disabledButton: {
    opacity: 0.6,
    backgroundColor: '#e9ecef',
  },
});

function StyleCompositionExample({ variant, size, disabled }) {
  return (
    <Pressable 
      style={[
        baseStyles.button,                           // Base styles
        variant === 'primary' && baseStyles.primaryButton,     // Conditional style
        variant === 'secondary' && baseStyles.secondaryButton, // Alternative style
        size === 'large' && baseStyles.largeButton,           // Size modifier
        disabled && baseStyles.disabledButton,                // State modifier
        // Inline override (highest precedence)
        { marginTop: 20 }
      ]}
    >
      <Text style={{ 
        color: variant === 'primary' ? 'white' : '#333',
        fontSize: size === 'large' ? 18 : 16,
        fontWeight: '600',
      }}>
        Composed Button
      </Text>
    </Pressable>
  );
}
```

### 📈 Precedence Rules

```tsx
// Style precedence: right-to-left, last wins
<View style={[
  { backgroundColor: 'red' },    // 1st: red background
  { backgroundColor: 'blue' },   // 2nd: overrides to blue
  { backgroundColor: 'green' },  // 3rd: final background is green
  
  // Conditional styles
  condition && { backgroundColor: 'yellow' }, // Applies if condition is true
  
  // Inline override
  { marginTop: 10 } // Always applied, highest precedence
]} />
```

### 🎨 Advanced Composition Patterns

```tsx
// Theme-based composition
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.sm,
  },
  
  // Variant styles
  primaryCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  
  secondaryCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
  },
});

function ThemedComponent({ variant = 'default' }) {
  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.card,
        variant === 'primary' && styles.primaryCard,
        variant === 'secondary' && styles.secondaryCard,
      ]}>
        <Text>Themed card content</Text>
      </View>
    </View>
  );
}
```

---

## Dynamic Styling

### 🔄 State-Based Styling

```tsx
function DynamicStyledComponent() {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: isActive ? '#007bff' : '#f8f9fa',
      borderColor: isHovered ? '#0056b3' : '#dee2e6',
      borderWidth: 2,
      padding: 20,
      borderRadius: 8,
      // Transform based on state
      transform: [
        { scale: isActive ? 1.05 : 1 },
        { rotate: `${progress * 360}deg` }
      ],
    },
    
    text: {
      color: isActive ? 'white' : '#495057',
      fontSize: 16,
      fontWeight: isActive ? '600' : '400',
    },
    
    progressBar: {
      height: 4,
      backgroundColor: '#e9ecef',
      borderRadius: 2,
      marginTop: 10,
      overflow: 'hidden',
    },
    
    progressFill: {
      height: '100%',
      backgroundColor: '#28a745',
      width: `${progress * 100}%`,
    },
  });

  return (
    <Pressable
      style={dynamicStyles.container}
      onPress={() => setIsActive(!isActive)}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
    >
      <Text style={dynamicStyles.text}>
        Dynamic Component (Active: {isActive ? 'Yes' : 'No'})
      </Text>
      
      <View style={dynamicStyles.progressBar}>
        <View style={dynamicStyles.progressFill} />
      </View>
    </Pressable>
  );
}
```

### 🎨 Interpolated Styling

```tsx
import { Animated } from 'react-native';

function AnimatedStyledComponent() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  // Interpolated styles
  const animatedStyles = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
      {
        rotateZ: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
    
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
    }),
  };

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // backgroundColor requires false
    }).start(() => {
      animatedValue.setValue(0); // Reset for next animation
    });
  };

  return (
    <View style={{ padding: 50, alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 50,
          },
          animatedStyles,
        ]}
      />
      
      <Pressable
        style={{
          marginTop: 20,
          backgroundColor: '#007bff',
          padding: 12,
          borderRadius: 6,
        }}
        onPress={startAnimation}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          Animate
        </Text>
      </Pressable>
    </View>
  );
}
```

---

## Common Style Patterns

### 📐 Layout Patterns

```tsx
const layoutStyles = StyleSheet.create({
  // Centering patterns
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  centerHorizontal: {
    alignItems: 'center',
  },
  
  centerVertical: {
    justifyContent: 'center',
  },
  
  // Flex patterns
  flexRow: {
    flexDirection: 'row',
  },
  
  flexColumn: {
    flexDirection: 'column',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  
  // Common containers
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
```

### 🎨 Visual Patterns

```tsx
const visualStyles = StyleSheet.create({
  // Shadow patterns
  lightShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  mediumShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  
  strongShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Border patterns
  thinBorder: {
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  
  mediumBorder: {
    borderWidth: 2,
    borderColor: '#dee2e6',
  },
  
  roundedBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  
  // Background patterns
  gradientBackground: {
    backgroundColor: '#667eea', // Fallback
    // For actual gradients, use react-native-linear-gradient
  },
  
  overlayBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
```

---

## Performance Optimization

### 🚀 StyleSheet Optimization

```tsx
// ✅ Create StyleSheet outside component for better performance
const optimizedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

// ❌ Avoid creating styles inside render
function BadExample() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ffffff', // Created on every render
    }}>
      {/* content */}
    </View>
  );
}

// ✅ Use StyleSheet for static styles
function GoodExample() {
  return (
    <View style={optimizedStyles.container}>
      {/* content */}
    </View>
  );
}
```

### 🎯 Dynamic Style Optimization

```tsx
// ✅ Optimize dynamic styles with useMemo
function OptimizedDynamicStyles({ isActive, theme }) {
  const dynamicStyles = useMemo(() => ({
    container: {
      backgroundColor: isActive ? theme.primary : theme.background,
      borderColor: isActive ? theme.primaryDark : theme.border,
    },
    text: {
      color: isActive ? 'white' : theme.text,
    },
  }), [isActive, theme]);

  return (
    <View style={[styles.baseContainer, dynamicStyles.container]}>
      <Text style={[styles.baseText, dynamicStyles.text]}>
        Optimized Dynamic Content
      </Text>
    </View>
  );
}

// ✅ Use StyleSheet.flatten for complex style composition
function FlattenedStyles({ styles: propStyles }) {
  const flattenedStyle = StyleSheet.flatten([
    baseStyles.container,
    propStyles,
    { marginTop: 10 },
  ]);

  return <View style={flattenedStyle} />;
}
```

---

## Best Practices

### ✅ Style Organization

```tsx
// 1. Organize styles by component or feature
// styles/
//   ├── components/
//   │   ├── Button.styles.ts
//   │   ├── Card.styles.ts
//   │   └── Input.styles.ts
//   ├── screens/
//   │   ├── Home.styles.ts
//   │   └── Profile.styles.ts
//   └── shared/
//       ├── colors.ts
//       ├── typography.ts
//       └── spacing.ts

// 2. Create reusable style constants
export const Colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
};

export const Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    loose: 1.6,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 3. Use consistent naming conventions
const styles = StyleSheet.create({
  // Use descriptive, semantic names
  container: {},           // Top-level container
  headerContainer: {},     // Section containers
  contentContainer: {},    
  footerContainer: {},
  
  // Element-specific styles
  title: {},              // Headings
  subtitle: {},
  body: {},               // Body text
  caption: {},            // Small text
  
  // State-based naming
  buttonPrimary: {},      // Default state
  buttonPrimaryPressed: {}, // Interaction state
  buttonPrimaryDisabled: {}, // Disabled state
  
  // Size variations
  buttonSmall: {},
  buttonMedium: {},
  buttonLarge: {},
});
```

### 🎯 Performance Guidelines

```tsx
// ✅ Do's
// 1. Use StyleSheet.create for static styles
const styles = StyleSheet.create({
  staticStyle: { backgroundColor: 'blue' },
});

// 2. Memoize dynamic styles
const dynamicStyle = useMemo(() => ({
  backgroundColor: isActive ? 'blue' : 'gray',
}), [isActive]);

// 3. Use style arrays for composition
<View style={[styles.base, props.style]} />

// 4. Minimize style objects in render
// ❌ Don't do this
<View style={{ backgroundColor: isActive ? 'blue' : 'gray' }} />

// ✅ Do this instead
<View style={[styles.base, isActive && styles.active]} />
```

### 🔧 Development Workflow

```tsx
// 1. Start with inline styles for prototyping
function PrototypeComponent() {
  return (
    <View style={{ padding: 20, backgroundColor: 'red' }}>
      <Text style={{ fontSize: 18, color: 'white' }}>Prototype</Text>
    </View>
  );
}

// 2. Extract to StyleSheet when stable
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

function StableComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stable</Text>
    </View>
  );
}

// 3. Create reusable components for repeated patterns
function ReusableCard({ children, variant = 'default' }) {
  return (
    <View style={[
      styles.card,
      variant === 'primary' && styles.cardPrimary,
      variant === 'secondary' && styles.cardSecondary,
    ]}>
      {children}
    </View>
  );
}
```

---

## 🎯 Key Takeaways

1. **Style Strategy**: Use inline styles for prototyping, StyleSheet for production
2. **Performance**: StyleSheet.create optimizes style objects for native bridge
3. **Composition**: Style arrays enable flexible, reusable styling patterns
4. **Organization**: Consistent naming and modular organization improve maintainability
5. **Dynamic Styles**: Use useMemo and conditional application for state-based styling

## 🚀 Next Steps

With basic styling mastered, you're ready for:
- Interactive components (Button, Pressable) building on these styling foundations
- Advanced layout with Flexbox system
- Complex styling patterns including Box Model and platform differences

Understanding these styling fundamentals is crucial as every React Native interface depends on effective styling strategies.
