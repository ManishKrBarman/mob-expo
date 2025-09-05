# Interactive Components - Button, Pressable, and Touch Handling

Master user interaction in React Native through Button, Pressable, and advanced touch handling patterns. Learn gesture recognition, feedback systems, and building responsive interactive interfaces.

## 🎯 Learning Progression
**Previous**: [React Native Fundamentals](01-fundamentals.md) → [Core Components](02-core-components.md) → [Basic Styling](03-basic-styling.md) ← **Phase 2: User Interaction** → You are here ✅  
**Next**: Advanced UI Components → Form Components

## 📋 Table of Contents

1. [Touch System Architecture](#touch-system-architecture)
2. [Button Component](#button-component)
3. [Pressable Component](#pressable-component)
4. [TouchableOpacity (Legacy)](#touchableopacity-legacy)
5. [Advanced Touch Handling](#advanced-touch-handling)
6. [Custom Interactive Components](#custom-interactive-components)
7. [Accessibility in Touch Components](#accessibility-in-touch-components)
8. [Performance Optimization](#performance-optimization)

---

## Touch System Architecture

### 🎯 React Native Touch System

React Native's touch system bridges JavaScript touch events with native platform gesture recognizers:

```
User Touch Input
        │
        ▼
Native Gesture Recognition
(iOS: UIGestureRecognizer, Android: GestureDetector)
        │
        ▼
Bridge/JSI Communication
        │
        ▼
JavaScript Touch Events
        │
        ▼
React Component Handlers
```

### 📱 Touch Event Lifecycle

```tsx
function TouchEventExample() {
  return (
    <Pressable
      onTouchStart={(event) => {
        console.log('Touch started:', event.nativeEvent);
        // { identifier, locationX, locationY, pageX, pageY, target, timestamp }
      }}
      
      onTouchMove={(event) => {
        console.log('Touch moved:', event.nativeEvent);
        // Continuous updates during drag
      }}
      
      onTouchEnd={(event) => {
        console.log('Touch ended:', event.nativeEvent);
        // Final touch position and timing
      }}
      
      onTouchCancel={(event) => {
        console.log('Touch cancelled:', event.nativeEvent);
        // System interruption (call, notification, etc.)
      }}
    >
      <Text>Touch Event Demo</Text>
    </Pressable>
  );
}
```

### 🔧 Touch Event Properties

```tsx
interface TouchEvent {
  identifier: number;        // Unique touch ID for multi-touch
  locationX: number;         // Touch position relative to component
  locationY: number;
  pageX: number;            // Touch position relative to screen
  pageY: number;
  target: number;           // Component that received the touch
  timestamp: number;        // Event timestamp
  force?: number;           // iOS 3D Touch pressure (0-1)
}

// Multi-touch handling
function MultiTouchExample() {
  const handleTouchStart = (event) => {
    const touches = event.nativeEvent.touches;
    console.log(`${touches.length} fingers on screen`);
    
    touches.forEach((touch, index) => {
      console.log(`Touch ${index}:`, {
        x: touch.pageX,
        y: touch.pageY,
        identifier: touch.identifier,
      });
    });
  };

  return (
    <View
      style={{ flex: 1 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchStart} // Track all active touches
    >
      <Text>Multi-touch enabled area</Text>
    </View>
  );
}
```

---

## Button Component

### 🔘 Basic Button Usage

The `Button` component provides platform-native button styling and behavior:

```tsx
import { Button, View, Alert } from 'react-native';

function BasicButtonExample() {
  const handlePress = () => {
    Alert.alert('Button Pressed', 'You tapped the button!');
  };

  return (
    <View style={{ padding: 20, gap: 15 }}>
      {/* Basic button */}
      <Button
        title="Basic Button"
        onPress={handlePress}
      />
      
      {/* Colored button */}
      <Button
        title="Primary Button"
        color="#007AFF"           // iOS: button color, Android: background
        onPress={handlePress}
      />
      
      {/* Disabled button */}
      <Button
        title="Disabled Button"
        onPress={handlePress}
        disabled={true}
      />
      
      {/* Accessibility enhanced */}
      <Button
        title="Accessible Button"
        onPress={handlePress}
        accessibilityLabel="Tap to perform action"
        accessibilityHint="Double tap to activate"
      />
    </View>
  );
}
```

### 🎨 Platform-Specific Button Behavior

```tsx
import { Platform } from 'react-native';

function PlatformButtonExample() {
  return (
    <View style={{ padding: 20 }}>
      <Button
        title={Platform.OS === 'ios' ? 'iOS Button' : 'Android Button'}
        color={Platform.select({
          ios: '#007AFF',      // iOS: text color
          android: '#2196F3',  // Android: background color
        })}
        onPress={() => {
          // Platform-specific actions
          if (Platform.OS === 'ios') {
            // iOS-specific behavior
            Alert.alert('iOS Alert', 'This is an iOS-style alert');
          } else {
            // Android-specific behavior
            Alert.alert(
              'Android Alert',
              'This is an Android-style alert',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', style: 'default' },
              ]
            );
          }
        }}
      />
    </View>
  );
}
```

### ⚡ Button Limitations and Alternatives

```tsx
// ❌ Button limitations:
// - Limited styling options
// - No custom children (only title string)
// - Platform-specific appearance differences
// - No complex layouts or icons

// ✅ When to use Button:
function AppropriateButtonUsage() {
  return (
    <View>
      {/* Simple actions with text only */}
      <Button title="Save" onPress={saveData} />
      <Button title="Cancel" onPress={cancel} />
      
      {/* Platform-native appearance desired */}
      <Button title="Platform Native" onPress={handlePress} />
    </View>
  );
}

// ✅ Use Pressable for custom buttons:
function CustomButtonAlternative() {
  return (
    <Pressable
      style={{
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={handlePress}
    >
      <Icon name="star" size={16} color="white" style={{ marginRight: 8 }} />
      <Text style={{ color: 'white', fontWeight: '600' }}>
        Custom Button with Icon
      </Text>
    </Pressable>
  );
}
```

---

## Pressable Component

### 🎯 Modern Touch Handling

`Pressable` is the modern, flexible component for handling touch interactions:

```tsx
import { Pressable, Text, View } from 'react-native';

function BasicPressableExample() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#0056b3' : '#007bff',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      onPress={() => console.log('Pressed!')}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onLongPress={() => console.log('Long pressed!')}
      
      // Timing configuration
      delayLongPress={500}           // Long press delay (ms)
      pressRetentionOffset={50}      // Touch area extension
      hitSlop={10}                   // Expand touchable area
      
      // Advanced configuration
      unstable_pressDelay={100}      // Delay before onPressIn
      android_disableSound={false}   // Android touch sound
      android_ripple={{              // Android ripple effect
        color: 'rgba(255, 255, 255, 0.3)',
        borderless: false,
        radius: 100,
      }}
    >
      {({ pressed }) => (
        <Text style={{
          color: 'white',
          fontWeight: '600',
          textAlign: 'center',
        }}>
          {pressed ? 'Pressing...' : 'Press Me'}
        </Text>
      )}
    </Pressable>
  );
}
```

### 🎨 Advanced Pressable Patterns

```tsx
// 1. Button with multiple states
function StatefulButton({ variant = 'primary', size = 'medium', disabled = false }) {
  const getButtonStyles = ({ pressed }) => {
    const baseStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size variants
    const sizeStyles = {
      small: { paddingHorizontal: 12, paddingVertical: 6 },
      medium: { paddingHorizontal: 16, paddingVertical: 10 },
      large: { paddingHorizontal: 24, paddingVertical: 14 },
    };

    // Color variants
    const colorStyles = {
      primary: {
        backgroundColor: disabled ? '#94a3b8' : pressed ? '#1d4ed8' : '#2563eb',
      },
      secondary: {
        backgroundColor: disabled ? '#e2e8f0' : pressed ? '#64748b' : '#94a3b8',
        borderWidth: 1,
        borderColor: disabled ? '#cbd5e1' : pressed ? '#475569' : '#64748b',
      },
      danger: {
        backgroundColor: disabled ? '#fca5a5' : pressed ? '#dc2626' : '#ef4444',
      },
    };

    return [
      baseStyle,
      sizeStyles[size],
      colorStyles[variant],
      {
        opacity: disabled ? 0.6 : 1,
        transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
      },
    ];
  };

  const getTextStyles = () => ({
    color: variant === 'secondary' ? '#374151' : 'white',
    fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
    fontWeight: '600',
  });

  return (
    <Pressable
      style={getButtonStyles}
      disabled={disabled}
      onPress={() => console.log(`${variant} ${size} button pressed`)}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.3)',
        borderless: false,
      }}
    >
      <Text style={getTextStyles()}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
      </Text>
    </Pressable>
  );
}

// 2. Card with press feedback
function PressableCard({ title, subtitle, onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          marginVertical: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        pressed && {
          backgroundColor: '#f8f9fa',
          shadowOpacity: 0.05,
        },
      ]}
      onPress={onPress}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.1)',
        borderless: false,
      }}
    >
      <View>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: 4,
        }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 12,
          }}>
            {subtitle}
          </Text>
        )}
        {children}
      </View>
    </Pressable>
  );
}

// 3. Icon button with ripple effect
function IconButton({ icon, onPress, size = 40, color = '#007AFF' }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pressed ? `${color}20` : 'transparent',
        },
      ]}
      onPress={onPress}
      hitSlop={8}
      android_ripple={{
        color: `${color}30`,
        borderless: true,
        radius: size / 2,
      }}
    >
      {typeof icon === 'string' ? (
        <Text style={{ fontSize: size * 0.5, color }}>{icon}</Text>
      ) : (
        icon
      )}
    </Pressable>
  );
}
```

### 🎛️ Pressable Configuration Deep Dive

```tsx
interface PressableProps {
  // Core touch events
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  
  // Timing and behavior
  delayLongPress?: number;           // Default: 500ms
  pressRetentionOffset?: number;     // Touch area retention
  hitSlop?: number | Insets;         // Expand touch area
  unstable_pressDelay?: number;      // Delay before press feedback
  
  // Platform specific
  android_disableSound?: boolean;    // Disable Android touch sound
  android_ripple?: RippleConfig;     // Android Material ripple
  
  // Accessibility
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  
  // Styling
  style?: StyleProp<ViewStyle> | ((state: PressableState) => StyleProp<ViewStyle>);
  
  // Children
  children?: React.ReactNode | ((state: PressableState) => React.ReactNode);
}

// Advanced configuration example
function AdvancedPressableConfig() {
  return (
    <Pressable
      // Extend touch area by 20px on all sides
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      
      // Keep press state active within 50px of original touch
      pressRetentionOffset={50}
      
      // 750ms long press threshold
      delayLongPress={750}
      
      // 150ms delay before showing press feedback
      unstable_pressDelay={150}
      
      // Android ripple configuration
      android_ripple={{
        color: 'rgba(255, 0, 0, 0.2)',  // Red ripple
        borderless: false,               // Contained within bounds
        radius: 120,                     // Custom ripple radius
      }}
      
      // Disable Android system sound
      android_disableSound={true}
      
      onPress={() => console.log('Press')}
      onPressIn={() => console.log('Press in')}
      onPressOut={() => console.log('Press out')}
      onLongPress={() => console.log('Long press')}
    >
      <Text>Advanced Configuration</Text>
    </Pressable>
  );
}
```

---

## TouchableOpacity (Legacy)

### 📱 Legacy Touch Component

While `Pressable` is preferred, `TouchableOpacity` is still widely used:

```tsx
import { TouchableOpacity, Text } from 'react-native';

function TouchableOpacityExample() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
      }}
      activeOpacity={0.7}              // Opacity when pressed (0-1)
      onPress={() => console.log('TouchableOpacity pressed')}
      onPressIn={() => console.log('Press in')}
      onPressOut={() => console.log('Press out')}
      onLongPress={() => console.log('Long press')}
      delayLongPress={500}
      delayPressIn={0}                 // Delay before onPressIn
      delayPressOut={100}              // Delay before onPressOut
      disabled={false}
      hitSlop={10}
      pressRetentionOffset={50}
    >
      <Text style={{ color: 'white', fontWeight: '600' }}>
        TouchableOpacity Button
      </Text>
    </TouchableOpacity>
  );
}

// Migration from TouchableOpacity to Pressable
function MigrationExample() {
  // ❌ Old TouchableOpacity approach
  const OldButton = () => (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Old Button</Text>
    </TouchableOpacity>
  );

  // ✅ New Pressable approach
  const NewButton = () => (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.7 : 1 }
      ]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>New Button</Text>
    </Pressable>
  );

  return (
    <View>
      <OldButton />
      <NewButton />
    </View>
  );
}
```

---

## Advanced Touch Handling

### 🎯 Gesture Recognition

```tsx
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

function DraggableComponent() {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Snap back to center or handle drop
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: '#007AFF',
            borderRadius: 50,
          },
          {
            transform: [
              { translateX },
              { translateY },
            ],
          },
        ]}
      />
    </PanGestureHandler>
  );
}
```

### 🎛️ Touch Area Optimization

```tsx
function TouchAreaOptimization() {
  return (
    <View style={{ padding: 20 }}>
      {/* Small visual element with extended touch area */}
      <Pressable
        style={{
          width: 20,
          height: 20,
          backgroundColor: '#007AFF',
          borderRadius: 10,
        }}
        hitSlop={20}  // Extend touch area by 20px in all directions
        onPress={() => console.log('Small target pressed')}
      />
      
      {/* Custom hit area shape */}
      <Pressable
        hitSlop={{
          top: 30,
          bottom: 10,
          left: 50,
          right: 50,
        }}
        style={{
          marginTop: 50,
          padding: 10,
          backgroundColor: '#28a745',
        }}
        onPress={() => console.log('Custom hit area pressed')}
      >
        <Text>Custom Hit Area</Text>
      </Pressable>
      
      {/* Overlapping touch areas with z-index handling */}
      <View style={{ position: 'relative', marginTop: 50 }}>
        <Pressable
          style={{
            width: 200,
            height: 100,
            backgroundColor: '#dc3545',
            position: 'absolute',
            zIndex: 1,
          }}
          onPress={() => console.log('Background pressed')}
        >
          <Text style={{ color: 'white', padding: 10 }}>Background</Text>
        </Pressable>
        
        <Pressable
          style={{
            width: 100,
            height: 50,
            backgroundColor: '#ffc107',
            position: 'absolute',
            top: 25,
            left: 50,
            zIndex: 2,
          }}
          onPress={() => console.log('Foreground pressed')}
        >
          <Text style={{ padding: 5 }}>Foreground</Text>
        </Pressable>
      </View>
    </View>
  );
}
```

---

## Custom Interactive Components

### 🎨 Building Reusable Interactive Components

```tsx
// 1. Toggle Switch Component
function CustomToggle({ value, onValueChange, disabled = false }) {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const backgroundColorInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e2e8f0', '#3b82f6'],
  });

  const translateXInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: 44,
          height: 24,
          borderRadius: 12,
          justifyContent: 'center',
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
      ]}
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <Animated.View
        style={{
          backgroundColor: backgroundColorInterpolation,
          width: '100%',
          height: '100%',
          borderRadius: 12,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            transform: [{ translateX: translateXInterpolation }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}

// 2. Rating Component
function StarRating({ rating, maxRating = 5, onRatingChange, readonly = false }) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarPress = (starIndex) => {
    if (readonly) return;
    
    const newRating = starIndex + 1;
    setCurrentRating(newRating);
    onRatingChange?.(newRating);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            {
              padding: 4,
              transform: [{ scale: pressed && !readonly ? 1.2 : 1 }],
            },
          ]}
          onPress={() => handleStarPress(index)}
          disabled={readonly}
          hitSlop={8}
        >
          <Text
            style={{
              fontSize: 24,
              color: index < currentRating ? '#fbbf24' : '#e5e7eb',
            }}
          >
            ★
          </Text>
        </Pressable>
      ))}
      <Text style={{ marginLeft: 8, fontSize: 16, color: '#6b7280' }}>
        {currentRating}/{maxRating}
      </Text>
    </View>
  );
}

// 3. Floating Action Button
function FloatingActionButton({ onPress, icon, style }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      style={[
        {
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#007AFF',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        style,
      ]}
      onPress={() => {
        animatePress();
        onPress();
      }}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.3)',
        borderless: true,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
        }}
      >
        {icon}
      </Animated.View>
    </Pressable>
  );
}
```

---

## Accessibility in Touch Components

### ♿ Comprehensive Accessibility

```tsx
function AccessibleInteractiveComponents() {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={{ padding: 20 }}>
      {/* Accessible button */}
      <Pressable
        style={{
          backgroundColor: '#007AFF',
          padding: 16,
          borderRadius: 8,
          marginBottom: 20,
        }}
        onPress={() => console.log('Action performed')}
        accessibilityRole="button"
        accessibilityLabel="Perform important action"
        accessibilityHint="Double tap to execute the primary action"
        accessibilityState={{ disabled: false }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
          Accessible Action Button
        </Text>
      </Pressable>

      {/* Accessible toggle */}
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
        onPress={() => setIsToggled(!isToggled)}
        accessibilityRole="switch"
        accessibilityLabel="Enable notifications"
        accessibilityState={{ checked: isToggled }}
        accessibilityValue={{ text: isToggled ? 'enabled' : 'disabled' }}
      >
        <View
          style={{
            width: 50,
            height: 30,
            borderRadius: 15,
            backgroundColor: isToggled ? '#34d399' : '#d1d5db',
            justifyContent: 'center',
            paddingHorizontal: 2,
          }}
        >
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              backgroundColor: 'white',
              alignSelf: isToggled ? 'flex-end' : 'flex-start',
            }}
          />
        </View>
        <Text style={{ marginLeft: 12, fontSize: 16 }}>
          Enable Notifications
        </Text>
      </Pressable>

      {/* Accessible radio group */}
      <View accessibilityRole="radiogroup" accessibilityLabel="Choose payment method">
        {['Credit Card', 'PayPal', 'Apple Pay'].map((option, index) => (
          <Pressable
            key={option}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}
            onPress={() => setSelectedOption(option)}
            accessibilityRole="radio"
            accessibilityLabel={option}
            accessibilityState={{ checked: selectedOption === option }}
            accessibilityHint={`Select ${option} as payment method`}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selectedOption === option ? '#007AFF' : '#d1d5db',
                backgroundColor: selectedOption === option ? '#007AFF' : 'transparent',
                marginRight: 12,
              }}
            />
            <Text style={{ fontSize: 16 }}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
```

---

## Performance Optimization

### 🚀 Touch Performance Best Practices

```tsx
// 1. Memoize expensive touch handlers
function OptimizedTouchComponent({ onPress, data }) {
  const handlePress = useCallback(() => {
    // Expensive operation
    onPress(data);
  }, [onPress, data]);

  return (
    <Pressable onPress={handlePress}>
      <Text>Optimized Touch Handler</Text>
    </Pressable>
  );
}

// 2. Optimize style functions
function OptimizedStyledPressable({ color, size }) {
  const getStyles = useCallback(({ pressed }) => [
    {
      backgroundColor: pressed ? `${color}AA` : color,
      padding: size === 'large' ? 16 : 12,
      borderRadius: 8,
    },
  ], [color, size]);

  return (
    <Pressable style={getStyles}>
      <Text>Optimized Styles</Text>
    </Pressable>
  );
}

// 3. Debounce rapid touches
function DebouncedButton({ onPress, delay = 300 }) {
  const timeoutRef = useRef(null);

  const debouncedPress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onPress();
    }, delay);
  }, [onPress, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Pressable onPress={debouncedPress}>
      <Text>Debounced Button</Text>
    </Pressable>
  );
}

// 4. Use native driver for animations
function AnimatedPressable({ children, onPress }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={() => {
        animatePress();
        onPress();
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}
```

---

## 🎯 Key Takeaways

1. **Component Choice**: Use `Pressable` for modern, flexible touch handling; `Button` for simple, native-styled buttons
2. **Performance**: Memoize handlers and styles, use native driver for animations
3. **Accessibility**: Always implement proper accessibility props and roles
4. **Touch Areas**: Optimize hit areas for better user experience
5. **Platform Awareness**: Leverage platform-specific features like Android ripple effects

## 🚀 Next Steps

With interactive components mastered, you're ready for:
- Advanced UI components (Modal, StatusBar, ActivityIndicator, Alert)
- Complex layout patterns with Flexbox
- Form handling and input validation

Understanding touch interactions is fundamental to creating engaging, responsive mobile interfaces that feel native and perform well.
