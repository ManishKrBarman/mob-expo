import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

/**
 * Button Basics - Understanding React Native's Button Component
 * 
 * This example demonstrates:
 * - Basic Button usage and properties
 * - Platform-specific button styling
 * - Event handling with onPress
 * - Button limitations and when to use alternatives
 */

export default function ButtonBasics() {
  // Simple button press handler
  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You tapped the button');
  };

  // Handler with parameters
  const handleActionPress = (action: string) => {
    Alert.alert('Action', `You selected: ${action}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Button Examples</Text>
      
      {/* Basic Button */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Button</Text>
        <Button
          title="Press Me"
          onPress={handlePress}
        />
      </View>

      {/* Button with Color (Platform Specific) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colored Button</Text>
        <Button
          title="Blue Button"
          color="#007AFF"
          onPress={() => Alert.alert('Blue button pressed!')}
        />
      </View>

      {/* Disabled Button */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled Button</Text>
        <Button
          title="Disabled"
          disabled={true}
          onPress={() => {}} // Won't be called when disabled
        />
      </View>

      {/* Multiple Action Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Action Buttons</Text>
        <View style={styles.buttonGroup}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Save"
              color="#28a745"
              onPress={() => handleActionPress('Save')}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Cancel"
              color="#dc3545"
              onPress={() => handleActionPress('Cancel')}
            />
          </View>
        </View>
      </View>

      {/* Button Limitations Note */}
      <View style={styles.noteSection}>
        <Text style={styles.noteTitle}>Button Limitations:</Text>
        <Text style={styles.noteText}>
          • Limited styling options{'\n'}
          • Platform-specific appearance{'\n'}
          • No custom layout flexibility{'\n'}
          • Consider Pressable for custom designs
        </Text>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  noteSection: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    borderLeft: 4,
    borderLeftColor: '#ffc107',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#856404',
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});
