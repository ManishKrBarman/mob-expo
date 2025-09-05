import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from 'react-native';

/**
 * Custom Components Examples
 * 
 * This example demonstrates:
 * - Building reusable custom components
 * - Proper TypeScript interfaces and props
 * - Composition patterns and compound components
 * - Theme integration and styling strategies
 * - Performance optimization techniques
 * - State management in custom components
 * 
 * TO TEST THIS:
 * 1. Copy this entire file content
 * 2. Replace the content in app/concept.tsx
 * 3. Save and explore different custom component patterns!
 */

// Theme system for components
const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    border: '#E9ECEF',
    text: '#212529',
    textSecondary: '#6C757D',
    textMuted: '#ADB5BD',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    h1: { fontSize: 24, fontWeight: 'bold' as const },
    h2: { fontSize: 20, fontWeight: '600' as const },
    h3: { fontSize: 18, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: 'normal' as const },
    caption: { fontSize: 14, fontWeight: 'normal' as const },
    small: { fontSize: 12, fontWeight: 'normal' as const },
  }
};

// 1. Custom Button Component
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  fullWidth?: boolean;
}

const CustomButton = React.memo<CustomButtonProps>(({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary': return buttonStyleSheet.primaryButton;
      case 'secondary': return buttonStyleSheet.secondaryButton;
      case 'outline': return buttonStyleSheet.outlineButton;
      case 'ghost': return buttonStyleSheet.ghostButton;
      default: return buttonStyleSheet.primaryButton;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small': return buttonStyleSheet.smallButton;
      case 'medium': return buttonStyleSheet.mediumButton;
      case 'large': return buttonStyleSheet.largeButton;
      default: return buttonStyleSheet.mediumButton;
    }
  };

  const getTextVariantStyle = () => {
    switch (variant) {
      case 'primary': return buttonStyleSheet.primaryText;
      case 'secondary': return buttonStyleSheet.secondaryText;
      case 'outline': return buttonStyleSheet.outlineText;
      case 'ghost': return buttonStyleSheet.ghostText;
      default: return buttonStyleSheet.primaryText;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small': return buttonStyleSheet.smallText;
      case 'medium': return buttonStyleSheet.mediumText;
      case 'large': return buttonStyleSheet.largeText;
      default: return buttonStyleSheet.mediumText;
    }
  };

  const buttonStyles = useMemo(() => [
    buttonStyleSheet.base,
    getVariantStyle(),
    getSizeStyle(),
    fullWidth && buttonStyleSheet.fullWidth,
    (disabled || loading) && buttonStyleSheet.disabled,
  ], [variant, size, fullWidth, disabled, loading]);

  const textStyles = useMemo(() => [
    buttonStyleSheet.text,
    getTextVariantStyle(),
    getTextSizeStyle(),
  ], [variant, size]);

  const handlePress = useCallback(() => {
    if (!disabled && !loading) {
      onPress();
    }
  }, [disabled, loading, onPress]);

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles,
        pressed && !disabled && !loading && buttonStyleSheet.pressed
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      <View style={buttonStyleSheet.content}>
        {leftIcon && <Text style={[textStyles, { marginRight: theme.spacing.sm }]}>{leftIcon}</Text>}
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : theme.colors.background} 
          />
        ) : (
          <Text style={textStyles}>{title}</Text>
        )}
        {rightIcon && <Text style={[textStyles, { marginLeft: theme.spacing.sm }]}>{rightIcon}</Text>}
      </View>
    </Pressable>
  );
});

const buttonStyleSheet = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Button variants
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  
  // Text variants
  primaryText: { color: theme.colors.background },
  secondaryText: { color: theme.colors.background },
  outlineText: { color: theme.colors.primary },
  ghostText: { color: theme.colors.primary },
  
  // Button sizes
  smallButton: { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md },
  mediumButton: { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg },
  largeButton: { paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.xl },
  
  // Text sizes
  smallText: { fontSize: 14 },
  mediumText: { fontSize: 16 },
  largeText: { fontSize: 18 },
});

// 2. Custom Input Field Component
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const InputField = React.memo<InputFieldProps>(({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View style={[
        inputStyles.inputContainer,
        isFocused && inputStyles.focused,
        !!error && inputStyles.error,
      ]}>
        {leftIcon && <Text style={inputStyles.leftIcon}>{leftIcon}</Text>}
        <TextInput
          style={[inputStyles.input, multiline && inputStyles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress} style={inputStyles.rightIcon}>
            <Text style={inputStyles.iconText}>{rightIcon}</Text>
          </Pressable>
        )}
      </View>
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
});

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
  },
  focused: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  error: {
    borderColor: theme.colors.danger,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  leftIcon: {
    marginLeft: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  rightIcon: {
    marginRight: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  iconText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
});

// 3. Custom Card Component
interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  shadow?: boolean;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = React.memo<CardProps>(({
  children,
  title,
  subtitle,
  onPress,
  shadow = true,
  variant = 'default',
}) => {
  const cardStyles = useMemo(() => [
    cardStyleSheet.base,
    variant === 'elevated' && cardStyleSheet.elevated,
    variant === 'outlined' && cardStyleSheet.outlined,
    shadow && cardStyleSheet.shadow,
  ], [variant, shadow]);

  const CardContent = (
    <View style={cardStyles}>
      {(title || subtitle) && (
        <View style={cardStyleSheet.header}>
          {title && <Text style={cardStyleSheet.title}>{title}</Text>}
          {subtitle && <Text style={cardStyleSheet.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={cardStyleSheet.content}>
        {children}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable 
        onPress={onPress}
        style={({ pressed }) => pressed && cardStyleSheet.pressed}
      >
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
});

const cardStyleSheet = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },
  elevated: {
    backgroundColor: theme.colors.surface,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  content: {},
  pressed: {
    opacity: 0.95,
  },
});

// 4. Compound Component - Accordion
const AccordionContext = createContext<{
  expanded: boolean;
  toggle: () => void;
} | null>(null);

interface AccordionProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

function Accordion({ children, defaultExpanded = false }: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const toggle = useCallback(() => setExpanded(prev => !prev), []);

  return (
    <AccordionContext.Provider value={{ expanded, toggle }}>
      <View style={accordionStyles.container}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

function AccordionHeader({ children }: { children: React.ReactNode }) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionHeader must be used within Accordion');

  return (
    <Pressable style={accordionStyles.header} onPress={context.toggle}>
      <View style={accordionStyles.headerContent}>
        {children}
        <Text style={accordionStyles.chevron}>
          {context.expanded ? '⌄' : '⌃'}
        </Text>
      </View>
    </Pressable>
  );
}

function AccordionContent({ children }: { children: React.ReactNode }) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  return context.expanded ? (
    <View style={accordionStyles.content}>
      {children}
    </View>
  ) : null;
}

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

const accordionStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
  },
  header: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  chevron: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
  },
  content: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

// 5. Custom List Item Component
interface ListItemProps<T> {
  item: T;
  onPress: (item: T) => void;
  renderContent: (item: T) => React.ReactNode;
  renderTrailing?: (item: T) => React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

function ListItem<T>({
  item,
  onPress,
  renderContent,
  renderTrailing,
  selected = false,
  disabled = false,
}: ListItemProps<T>) {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress(item);
    }
  }, [item, onPress, disabled]);

  return (
    <Pressable
      style={[
        listItemStyles.container,
        selected && listItemStyles.selected,
        disabled && listItemStyles.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <View style={listItemStyles.content}>
        {renderContent(item)}
      </View>
      {renderTrailing && (
        <View style={listItemStyles.trailing}>
          {renderTrailing(item)}
        </View>
      )}
    </Pressable>
  );
}

const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  content: {
    flex: 1,
  },
  trailing: {
    marginLeft: theme.spacing.md,
  },
  selected: {
    backgroundColor: theme.colors.surface,
  },
  disabled: {
    opacity: 0.6,
  },
});

// Main Example Component
export default function CustomComponentsExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const sampleData = useMemo(() => [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  ], []);

  const updateField = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Form submitted successfully!');
    }, 2000);
  }, [validateForm]);

  const toggleItemSelection = useCallback((item: typeof sampleData[0]) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.id)) {
        newSet.delete(item.id);
      } else {
        newSet.add(item.id);
      }
      return newSet;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[theme.typography.h1, styles.title]}>Custom Components</Text>
        
        {/* Button Examples */}
        <Card title="Custom Buttons" shadow>
          <View style={styles.buttonGrid}>
            <CustomButton title="Primary" onPress={() => alert('Primary clicked')} />
            <CustomButton 
              title="Secondary" 
              variant="secondary" 
              onPress={() => alert('Secondary clicked')} 
            />
            <CustomButton 
              title="Outline" 
              variant="outline" 
              onPress={() => alert('Outline clicked')} 
            />
            <CustomButton 
              title="Ghost" 
              variant="ghost" 
              onPress={() => alert('Ghost clicked')} 
            />
          </View>
          
          <View style={styles.buttonRow}>
            <CustomButton 
              title="With Icons" 
              leftIcon="🚀" 
              rightIcon="✨" 
              onPress={() => alert('Icons clicked')} 
            />
          </View>
          
          <CustomButton 
            title="Loading Button" 
            loading={loading}
            onPress={handleSubmit}
            fullWidth
          />
        </Card>

        {/* Form Example */}
        <Card title="Custom Form" subtitle="Example of custom input fields" shadow>
          <InputField
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
            placeholder="Enter your full name"
            leftIcon="👤"
            error={errors.name}
          />
          
          <InputField
            label="Email Address"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="Enter your email"
            leftIcon="📧"
            keyboardType="email-address"
            error={errors.email}
          />
          
          <InputField
            label="Password"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            placeholder="Enter your password"
            leftIcon="🔒"
            rightIcon={showPassword ? '🙈' : '👁️'}
            onRightIconPress={() => setShowPassword(!showPassword)}
            secureTextEntry={!showPassword}
            error={errors.password}
          />
          
          <InputField
            label="Message"
            value={formData.message}
            onChangeText={(text) => updateField('message', text)}
            placeholder="Enter your message"
            multiline
          />
          
          <CustomButton 
            title="Submit Form" 
            onPress={handleSubmit}
            loading={loading}
            fullWidth
          />
        </Card>

        {/* Accordion Example */}
        <Card title="Accordion Component" shadow>
          <Accordion defaultExpanded>
            <Accordion.Header>
              <Text style={theme.typography.h3}>What is React Native?</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text style={theme.typography.body}>
                React Native is a framework for building mobile applications using React. 
                It allows you to write once and deploy to both iOS and Android platforms.
              </Text>
            </Accordion.Content>
          </Accordion>
          
          <Accordion>
            <Accordion.Header>
              <Text style={theme.typography.h3}>Why use custom components?</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text style={theme.typography.body}>
                Custom components provide consistency, reusability, and maintainability 
                across your application. They encapsulate design patterns and business logic.
              </Text>
            </Accordion.Content>
          </Accordion>
          
          <Accordion>
            <Accordion.Header>
              <Text style={theme.typography.h3}>Performance benefits?</Text>
            </Accordion.Header>
            <Accordion.Content>
              <Text style={theme.typography.body}>
                Well-designed custom components can improve performance through memoization, 
                proper prop usage, and optimized re-rendering strategies.
              </Text>
            </Accordion.Content>
          </Accordion>
        </Card>

        {/* List Example */}
        <Card title="Custom List Items" shadow>
          <FlatList
            data={sampleData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                onPress={toggleItemSelection}
                selected={selectedItems.has(item.id)}
                renderContent={(user) => (
                  <View>
                    <Text style={[theme.typography.body, { fontWeight: '600' }]}>
                      {user.name}
                    </Text>
                    <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
                      {user.email}
                    </Text>
                  </View>
                )}
                renderTrailing={(user) => (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{user.role}</Text>
                  </View>
                )}
              />
            )}
            scrollEnabled={false}
          />
          
          <Text style={[theme.typography.caption, { marginTop: theme.spacing.md, textAlign: 'center' }]}>
            Selected: {selectedItems.size} item(s)
          </Text>
        </Card>

        {/* Card Variants */}
        <Card title="Card Variants" shadow>
          <Card variant="default" title="Default Card">
            <Text>This is a default card variant.</Text>
          </Card>
          
          <Card variant="elevated" title="Elevated Card">
            <Text>This is an elevated card variant.</Text>
          </Card>
          
          <Card variant="outlined" title="Outlined Card">
            <Text>This is an outlined card variant.</Text>
          </Card>
          
          <Card 
            title="Pressable Card" 
            subtitle="Tap me!"
            onPress={() => alert('Card pressed!')}
          >
            <Text>This card is pressable and will show an alert when tapped.</Text>
          </Card>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    textAlign: 'center',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  buttonGrid: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  buttonRow: {
    marginBottom: theme.spacing.md,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    color: theme.colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
});
