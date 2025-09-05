import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

/**
 * Inline Styles - Dynamic and Immediate Styling
 * 
 * Demonstrates inline styling patterns, when to use them,
 * dynamic styling based on state/props, and performance considerations.
 */

export default function InlineStylesExample() {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  // Theme configurations
  const themes = {
    light: {
      background: '#ffffff',
      surface: '#f8f9fa',
      primary: '#007bff',
      text: '#212529',
      secondary: '#6c757d',
    },
    dark: {
      background: '#212529',
      surface: '#343a40',
      primary: '#0d6efd',
      text: '#ffffff',
      secondary: '#adb5bd',
    },
    colorful: {
      background: '#ffeaa7',
      surface: '#fab1a0',
      primary: '#e17055',
      text: '#2d3436',
      secondary: '#636e72',
    },
  };

  const currentTheme = themes[selectedTheme];

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      {/* Main Title with Dynamic Styling */}
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: currentTheme.text,
        // Dynamic text shadow based on theme
        textShadowColor: selectedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      }}>
        Inline Styles Mastery
      </Text>

      {/* Section 1: Basic Inline Styling */}
      <View style={{
        marginHorizontal: 20,
        marginVertical: 16,
        padding: 20,
        backgroundColor: currentTheme.surface,
        borderRadius: 12,
        // Dynamic shadow based on theme
        shadowColor: selectedTheme === 'dark' ? '#000000' : '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selectedTheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 12,
          color: currentTheme.text,
        }}>
          1. Basic Inline Styling
        </Text>
        
        <Text style={{
          fontSize: 14,
          lineHeight: 20,
          color: currentTheme.secondary,
          marginBottom: 16,
        }}>
          Inline styles are JavaScript objects applied directly to components.
          They're perfect for dynamic styling and quick prototyping.
        </Text>

        {/* Simple styled elements */}
        <View style={{
          backgroundColor: currentTheme.primary,
          padding: 12,
          borderRadius: 8,
          marginVertical: 8,
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '500',
          }}>
            Simple Inline Styled Container
          </Text>
        </View>

        {/* Multiple style properties */}
        <View style={{
          backgroundColor: '#e74c3c',
          padding: 16,
          marginVertical: 8,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#c0392b',
          borderStyle: 'solid',
          // Transform properties
          transform: [
            { rotateZ: '2deg' },
            { scale: 0.98 },
          ],
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
            Complex Styling
          </Text>
        </View>
      </View>

      {/* Section 2: Dynamic State-Based Styling */}
      <View style={{
        marginHorizontal: 20,
        marginVertical: 16,
        padding: 20,
        backgroundColor: currentTheme.surface,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selectedTheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 12,
          color: currentTheme.text,
        }}>
          2. Dynamic State-Based Styling
        </Text>

        {/* Interactive Button with State */}
        <Pressable
          style={{
            backgroundColor: isPressed ? '#0056b3' : currentTheme.primary,
            padding: 16,
            borderRadius: 8,
            marginVertical: 8,
            // Dynamic transform
            transform: [
              { scale: isPressed ? 0.95 : 1 },
            ],
            // Dynamic shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: isPressed ? 1 : 4 },
            shadowOpacity: isPressed ? 0.1 : 0.2,
            shadowRadius: isPressed ? 2 : 8,
            elevation: isPressed ? 2 : 6,
          }}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
          }}>
            {isPressed ? 'Pressing...' : 'Press Me!'}
          </Text>
        </Pressable>

        {/* Conditional Styling */}
        <View style={{
          backgroundColor: isPressed ? '#d4edda' : '#f8d7da',
          borderColor: isPressed ? '#c3e6cb' : '#f5c6cb',
          borderWidth: 1,
          padding: 12,
          borderRadius: 6,
          marginVertical: 8,
        }}>
          <Text style={{
            color: isPressed ? '#155724' : '#721c24',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '500',
          }}>
            Status: {isPressed ? 'Button is pressed' : 'Button is not pressed'}
          </Text>
        </View>
      </View>

      {/* Section 3: Theme Selection */}
      <View style={{
        marginHorizontal: 20,
        marginVertical: 16,
        padding: 20,
        backgroundColor: currentTheme.surface,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selectedTheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 12,
          color: currentTheme.text,
        }}>
          3. Theme-Based Dynamic Styling
        </Text>

        <Text style={{
          fontSize: 14,
          lineHeight: 20,
          color: currentTheme.secondary,
          marginBottom: 16,
        }}>
          Select a theme to see how inline styles can adapt to different design systems:
        </Text>

        {/* Theme Selection Buttons */}
        <View style={{
          flexDirection: 'row',
          gap: 8,
          marginBottom: 16,
        }}>
          {Object.keys(themes).map((theme) => (
            <Pressable
              key={theme}
              style={{
                backgroundColor: selectedTheme === theme ? currentTheme.primary : 'transparent',
                borderColor: currentTheme.primary,
                borderWidth: 2,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                flex: 1,
              }}
              onPress={() => setSelectedTheme(theme)}
            >
              <Text style={{
                color: selectedTheme === theme ? 'white' : currentTheme.primary,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 12,
                textTransform: 'capitalize',
              }}>
                {theme}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Current Theme Display */}
        <View style={{
          backgroundColor: currentTheme.primary,
          padding: 16,
          borderRadius: 8,
          marginVertical: 8,
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 8,
          }}>
            Current Theme: {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
          </Text>
          <Text style={{
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            fontSize: 12,
          }}>
            Background: {currentTheme.background} | Primary: {currentTheme.primary}
          </Text>
        </View>
      </View>

      {/* Section 4: Responsive Font Sizing */}
      <View style={{
        marginHorizontal: 20,
        marginVertical: 16,
        padding: 20,
        backgroundColor: currentTheme.surface,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selectedTheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 12,
          color: currentTheme.text,
        }}>
          4. Dynamic Font Sizing
        </Text>

        {/* Font Size Controls */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <Pressable
            style={{
              backgroundColor: currentTheme.primary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 6,
            }}
            onPress={() => setFontSize(Math.max(12, fontSize - 2))}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>A-</Text>
          </Pressable>

          <Text style={{
            fontSize: 16,
            color: currentTheme.text,
            fontWeight: '500',
          }}>
            Font Size: {fontSize}px
          </Text>

          <Pressable
            style={{
              backgroundColor: currentTheme.primary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 6,
            }}
            onPress={() => setFontSize(Math.min(24, fontSize + 2))}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>A+</Text>
          </Pressable>
        </View>

        {/* Dynamic Font Size Demo */}
        <View style={{
          backgroundColor: currentTheme.background,
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: currentTheme.primary,
        }}>
          <Text style={{
            fontSize: fontSize,
            color: currentTheme.text,
            lineHeight: fontSize * 1.4,
            textAlign: 'center',
          }}>
            This text size changes dynamically based on state. Font size: {fontSize}px
          </Text>
        </View>
      </View>

      {/* Section 5: Complex Conditional Styling */}
      <View style={{
        marginHorizontal: 20,
        marginVertical: 16,
        padding: 20,
        backgroundColor: currentTheme.surface,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selectedTheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 12,
          color: currentTheme.text,
        }}>
          5. Complex Conditional Styling
        </Text>

        {/* Multi-state element */}
        <View style={{
          // Complex conditional background
          backgroundColor: 
            selectedTheme === 'dark' && isPressed ? '#495057' :
            selectedTheme === 'light' && isPressed ? '#e9ecef' :
            selectedTheme === 'colorful' && isPressed ? '#fab1a0' :
            selectedTheme === 'dark' ? '#343a40' :
            selectedTheme === 'light' ? '#ffffff' :
            '#ffeaa7',
          
          // Dynamic border
          borderWidth: isPressed ? 3 : 1,
          borderColor: 
            isPressed ? currentTheme.primary : 
            selectedTheme === 'dark' ? '#495057' : '#dee2e6',
          
          // Responsive padding
          padding: fontSize > 18 ? 20 : 16,
          borderRadius: 8,
          marginVertical: 8,
          
          // Complex transform
          transform: [
            { scale: isPressed ? 0.98 : 1 },
            { rotateZ: selectedTheme === 'colorful' ? '1deg' : '0deg' },
          ],
        }}>
          <Text style={{
            // Dynamic font properties
            fontSize: fontSize,
            fontWeight: isPressed ? 'bold' : '500',
            color: 
              selectedTheme === 'dark' ? '#ffffff' :
              selectedTheme === 'light' ? '#212529' :
              '#2d3436',
            textAlign: 'center',
            lineHeight: fontSize * 1.3,
            
            // Conditional text decoration
            textDecorationLine: isPressed ? 'underline' : 'none',
            textDecorationColor: currentTheme.primary,
          }}>
            Complex Multi-State Styling
          </Text>
          
          <Text style={{
            fontSize: 12,
            color: currentTheme.secondary,
            textAlign: 'center',
            marginTop: 8,
            fontStyle: selectedTheme === 'colorful' ? 'italic' : 'normal',
          }}>
            Theme: {selectedTheme} | Pressed: {isPressed ? 'Yes' : 'No'} | Font: {fontSize}px
          </Text>
        </View>
      </View>

      {/* Section 6: Performance Considerations */}
      <View style={{
        marginHorizontal: 20,
        marginVertical: 16,
        marginBottom: 40,
        padding: 20,
        backgroundColor: currentTheme.surface,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selectedTheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 12,
          color: currentTheme.text,
        }}>
          6. Performance Best Practices
        </Text>

        <Text style={{
          fontSize: 14,
          lineHeight: 20,
          color: currentTheme.secondary,
          marginBottom: 16,
        }}>
          Inline styles are recalculated on every render. Use them wisely:
        </Text>

        {/* Performance Tips */}
        <View style={{
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          borderWidth: 1,
          borderRadius: 6,
          padding: 12,
          marginVertical: 4,
        }}>
          <Text style={{
            fontSize: 12,
            color: '#856404',
            fontWeight: '600',
            marginBottom: 4,
          }}>
            ✅ Good Use Cases:
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#856404',
            lineHeight: 16,
          }}>
            • Dynamic styles based on props/state{'\n'}
            • Prototyping and experimentation{'\n'}
            • One-off styles that won't be reused{'\n'}
            • Small performance impact scenarios
          </Text>
        </View>

        <View style={{
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          borderWidth: 1,
          borderRadius: 6,
          padding: 12,
          marginVertical: 4,
        }}>
          <Text style={{
            fontSize: 12,
            color: '#721c24',
            fontWeight: '600',
            marginBottom: 4,
          }}>
            ❌ Avoid For:
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#721c24',
            lineHeight: 16,
          }}>
            • Static styles that don't change{'\n'}
            • Reused styles across components{'\n'}
            • Performance-critical components{'\n'}
            • Complex style objects
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Key Concepts Demonstrated:
 * 
 * 1. Basic Inline Styling - JavaScript objects as styles
 * 2. Dynamic State-Based Styling - Styles that respond to component state
 * 3. Theme System Integration - Using inline styles with design systems
 * 4. Responsive Font Sizing - Dynamic text sizing based on user preferences
 * 5. Complex Conditional Logic - Multi-factor styling decisions
 * 6. Performance Considerations - When to use vs avoid inline styles
 * 7. Transform Properties - Rotation, scaling, and translation
 * 8. Platform-Specific Styling - Adapting to different platforms
 * 9. Accessibility Considerations - Color contrast and text sizing
 * 10. Real-world Patterns - Practical inline styling applications
 * 
 * Production Tips:
 * - Use inline styles for truly dynamic styling
 * - Combine with StyleSheet for optimal performance
 * - Consider memoization for expensive style calculations
 * - Test performance impact on slower devices
 * - Use TypeScript for style object type safety
 */
