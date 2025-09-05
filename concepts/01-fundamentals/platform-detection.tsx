import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';

/**
 * Platform Detection and Adaptation Example
 * 
 * Demonstrates how to detect platforms and adapt UI/behavior accordingly.
 * This is fundamental to understanding React Native's cross-platform nature.
 */

// Platform-specific constants
const PLATFORM_COLORS = {
  ios: {
    primary: '#007AFF',
    background: '#F2F2F7',
    text: '#000000',
  },
  android: {
    primary: '#2196F3',
    background: '#FFFFFF',
    text: '#212121',
  },
  web: {
    primary: '#0066CC',
    background: '#F5F5F5',
    text: '#333333',
  },
};

export default function PlatformDetectionExample() {
  const [deviceInfo, setDeviceInfo] = useState({
    platform: Platform.OS,
    version: Platform.Version,
    isTV: Platform.isTV,
    isTesting: Platform.isTesting,
    dimensions: Dimensions.get('window'),
  });

  useEffect(() => {
    // Listen for dimension changes (rotation, window resize)
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDeviceInfo(prev => ({
        ...prev,
        dimensions: window,
      }));
    });

    return () => subscription?.remove();
  }, []);

  // Platform-specific styling
  const platformStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: PLATFORM_COLORS[Platform.OS].background,
    },
    
    header: {
      fontSize: Platform.select({
        ios: 28,      // iOS typically uses larger headers
        android: 24,  // Android Material Design guidelines
        web: 32,      // Web can handle larger text
        default: 24,
      }),
      fontWeight: Platform.select({
        ios: '700',     // iOS system font weights
        android: 'bold', // Android standard weights
        default: 'bold',
      }),
      color: PLATFORM_COLORS[Platform.OS].text,
      marginBottom: 20,
    },
    
    infoCard: {
      backgroundColor: Platform.select({
        ios: '#FFFFFF',
        android: '#F5F5F5',
        web: '#FFFFFF',
        default: '#FFFFFF',
      }),
      padding: 16,
      borderRadius: Platform.select({
        ios: 12,      // iOS uses larger border radius
        android: 8,   // Android Material Design
        web: 6,       // Web conservative approach
        default: 8,
      }),
      marginVertical: 8,
      
      // Platform-specific shadows
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
        web: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        default: {
          // Fallback for other platforms
          borderWidth: 1,
          borderColor: '#E0E0E0',
        },
      }),
    },
    
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: PLATFORM_COLORS[Platform.OS].primary,
      marginBottom: 4,
    },
    
    value: {
      fontSize: 16,
      color: PLATFORM_COLORS[Platform.OS].text,
      fontFamily: Platform.select({
        ios: 'System',           // iOS system font
        android: 'Roboto',       // Android default
        web: 'system-ui',        // Web system font
        default: undefined,
      }),
    },
  });

  // Platform-specific behavior
  const handlePlatformSpecificAction = () => {
    if (Platform.OS === 'ios') {
      // iOS-specific behavior
      console.log('iOS-specific action triggered');
      // Could use iOS-specific APIs here
    } else if (Platform.OS === 'android') {
      // Android-specific behavior  
      console.log('Android-specific action triggered');
      // Could use Android-specific APIs here
    } else {
      // Web or other platforms
      console.log('Generic platform action triggered');
    }
  };

  return (
    <View style={platformStyles.container}>
      <Text style={platformStyles.header}>
        Platform Detection Demo
      </Text>

      <View style={platformStyles.infoCard}>
        <Text style={platformStyles.label}>Platform</Text>
        <Text style={platformStyles.value}>
          {Platform.OS} {Platform.OS === 'ios' ? '(iOS)' : Platform.OS === 'android' ? '(Android)' : '(Other)'}
        </Text>
      </View>

      <View style={platformStyles.infoCard}>
        <Text style={platformStyles.label}>Platform Version</Text>
        <Text style={platformStyles.value}>
          {typeof Platform.Version === 'string' ? Platform.Version : `API Level ${Platform.Version}`}
        </Text>
      </View>

      <View style={platformStyles.infoCard}>
        <Text style={platformStyles.label}>Device Type</Text>
        <Text style={platformStyles.value}>
          {Platform.isTV ? 'TV Device' : 'Mobile/Tablet Device'}
        </Text>
      </View>

      <View style={platformStyles.infoCard}>
        <Text style={platformStyles.label}>Testing Environment</Text>
        <Text style={platformStyles.value}>
          {Platform.isTesting ? 'Running in test environment' : 'Production environment'}
        </Text>
      </View>

      <View style={platformStyles.infoCard}>
        <Text style={platformStyles.label}>Screen Dimensions</Text>
        <Text style={platformStyles.value}>
          {Math.round(deviceInfo.dimensions.width)} × {Math.round(deviceInfo.dimensions.height)} pixels
        </Text>
        <Text style={[platformStyles.value, { fontSize: 12, marginTop: 4, opacity: 0.7 }]}>
          Scale: {deviceInfo.dimensions.scale}x, Font Scale: {deviceInfo.dimensions.fontScale}x
        </Text>
      </View>

      <View style={platformStyles.infoCard}>
        <Text style={platformStyles.label}>Platform-Specific Features</Text>
        <Text style={platformStyles.value}>
          {Platform.OS === 'ios' && 'iOS: Face ID, 3D Touch, iOS-specific animations'}
          {Platform.OS === 'android' && 'Android: Material Design, Hardware back button, Android intents'}
          {Platform.OS === 'web' && 'Web: Browser APIs, Responsive design, URL routing'}
        </Text>
      </View>

      {/* Conditional rendering based on platform */}
      {Platform.OS === 'ios' && (
        <View style={[platformStyles.infoCard, { backgroundColor: '#E3F2FD' }]}>
          <Text style={platformStyles.label}>iOS-Only Feature</Text>
          <Text style={platformStyles.value}>
            This card only appears on iOS devices
          </Text>
        </View>
      )}

      {Platform.OS === 'android' && (
        <View style={[platformStyles.infoCard, { backgroundColor: '#E8F5E8' }]}>
          <Text style={platformStyles.label}>Android-Only Feature</Text>
          <Text style={platformStyles.value}>
            This card only appears on Android devices
          </Text>
        </View>
      )}
    </View>
  );
}

/**
 * Key Concepts Demonstrated:
 * 
 * 1. Platform.OS - Detecting current platform (ios, android, web)
 * 2. Platform.Version - Getting platform version information
 * 3. Platform.select() - Choosing values based on platform
 * 4. Platform.isTV - Detecting TV devices
 * 5. Platform.isTesting - Detecting test environment
 * 6. Dimensions API - Getting screen dimensions and listening for changes
 * 7. Platform-specific styling (shadows vs elevation)
 * 8. Conditional rendering based on platform
 * 9. Platform-specific fonts and design patterns
 * 10. Understanding scale and fontScale for responsive design
 * 
 * Production Usage:
 * - Use platform detection for API differences
 * - Implement platform-specific UI patterns
 * - Handle different navigation systems
 * - Adapt to platform design guidelines
 * - Optimize for platform-specific performance characteristics
 */
