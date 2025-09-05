import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';

/**
 * Pressable Mastery - Modern Touch Handling in React Native
 * 
 * This example demonstrates:
 * - Pressable component with advanced configurations
 * - Touch state management (pressed state)
 * - Custom styling based on interaction states
 * - Hit area optimization for better usability
 * - Touch feedback and long press handling
 */

export default function PressableMastery() {
  const [pressCount, setPressCount] = useState(0);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pressable Component Examples</Text>
      
      {/* Basic Pressable */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Pressable</Text>
        <Pressable
          style={styles.basicButton}
          onPress={() => Alert.alert('Pressable pressed!')}
        >
          <Text style={styles.buttonText}>Press Me</Text>
        </Pressable>
      </View>

      {/* Pressable with State-based Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State-based Styling</Text>
        <Pressable
          style={({ pressed }) => [
            styles.stateButton,
            pressed && styles.pressedButton
          ]}
          onPress={() => setPressCount(count => count + 1)}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, pressed && styles.pressedText]}>
              {pressed ? 'Pressed!' : `Tap Count: ${pressCount}`}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Toggle Button */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toggle Button</Text>
        <Pressable
          style={[
            styles.toggleButton,
            isToggled && styles.toggledButton
          ]}
          onPress={() => setIsToggled(!isToggled)}
        >
          <Text style={[
            styles.buttonText,
            isToggled && styles.toggledText
          ]}>
            {isToggled ? 'ON' : 'OFF'}
          </Text>
        </Pressable>
      </View>

      {/* Custom Hit Area */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Optimized Hit Area</Text>
        <Text style={styles.description}>
          This button has a larger hit area than its visual size
        </Text>
        <Pressable
          style={styles.smallButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => Alert.alert('Hit area works!', 'Easier to tap')}
        >
          <Text style={styles.smallButtonText}>Small Button</Text>
        </Pressable>
      </View>

      {/* Advanced Pressable with Touch States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Touch States</Text>
        <Pressable
          style={({ pressed }) => [
            styles.advancedButton,
            pressed && styles.pressed,
          ]}
          onPress={() => Alert.alert('Advanced touch!')}
          onPressIn={() => console.log('Press started')}
          onPressOut={() => console.log('Press ended')}
          onLongPress={() => Alert.alert('Long press detected!')}
          delayLongPress={800}
        >
          {({ pressed }) => (
            <Text style={styles.buttonText}>
              {pressed ? 'Pressing...' : 'Advanced Button'}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Custom Styled Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styled Buttons</Text>
        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryPressed
            ]}
            onPress={() => Alert.alert('Primary action')}
          >
            <Text style={styles.primaryButtonText}>Primary</Text>
          </Pressable>
          
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryPressed
            ]}
            onPress={() => Alert.alert('Secondary action')}
          >
            <Text style={styles.secondaryButtonText}>Secondary</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  basicButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  stateButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    transform: [{ scale: 1 }],
  },
  pressedButton: {
    backgroundColor: '#1e7e34',
    transform: [{ scale: 0.95 }],
  },
  toggleButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggledButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pressedText: {
    color: '#f8f9fa',
  },
  toggledText: {
    color: 'white',
  },
  smallButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
  smallButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  advancedButton: {
    backgroundColor: '#17a2b8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: '#138496',
    transform: [{ scale: 0.98 }],
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  primaryPressed: {
    backgroundColor: '#0056b3',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  secondaryPressed: {
    backgroundColor: '#e9ecef',
  },
  secondaryButtonText: {
    color: '#6c757d',
    fontWeight: '600',
  },
});
