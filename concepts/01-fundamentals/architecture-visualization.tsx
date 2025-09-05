import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Alert } from 'react-native';

/**
 * Architecture Visualization - See React Native Concepts in Action
 * 
 * This example demonstrates:
 * - How React Native components map to native elements
 * - Platform-specific differences in real-time
 * - Bridge communication through interactions
 * - Component hierarchy and styling
 * 
 * 🔗 Related Notes:
 * - Architecture: notes/01-fundamentals.md#react-native-architecture
 * - Platform Differences: notes/01-fundamentals.md#platform-differences
 * - View Component: notes/02-core-components.md#view-component
 */

export default function ArchitectureVisualization() {
  const [tapCount, setTapCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const handleTap = () => {
    setTapCount(count => count + 1);
    
    // Demonstrate bridge communication
    console.log(`Bridge Communication: Touch event #${tapCount + 1} processed`);
    
    if (tapCount > 0 && tapCount % 5 === 0) {
      Alert.alert(
        'Bridge Demo',
        `Touch event traveled through the bridge ${tapCount} times!`
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header showing current platform */}
      <View style={styles.header}>
        <Text style={styles.title}>React Native Architecture</Text>
        <Text style={styles.subtitle}>
          Running on: {Platform.OS} {Platform.Version}
        </Text>
      </View>

      {/* Component Mapping Visualization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Component → Native Mapping</Text>
        
        <View style={styles.mappingContainer}>
          <View style={styles.mappingRow}>
            <Text style={styles.codeText}>{'<View />'}</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.nativeText}>
              {Platform.OS === 'ios' ? 'UIView' : 'ViewGroup'}
            </Text>
          </View>
          
          <View style={styles.mappingRow}>
            <Text style={styles.codeText}>{'<Text />'}</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.nativeText}>
              {Platform.OS === 'ios' ? 'UILabel' : 'TextView'}
            </Text>
          </View>
          
          <View style={styles.mappingRow}>
            <Text style={styles.codeText}>{'<Pressable />'}</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.nativeText}>
              {Platform.OS === 'ios' ? 'UIControl' : 'TouchableView'}
            </Text>
          </View>
        </View>
      </View>

      {/* Interactive Bridge Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bridge Communication Demo</Text>
        
        <Pressable
          style={({ pressed }) => [
            styles.bridgeButton,
            pressed && styles.bridgeButtonPressed,
            // Platform-specific shadow
            Platform.select({
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
          ]}
          onPress={handleTap}
        >
          <Text style={styles.buttonText}>
            Tap to Test Bridge Communication
          </Text>
          <Text style={styles.tapCount}>
            Bridge Events: {tapCount}
          </Text>
        </Pressable>
        
        <Text style={styles.bridgeExplanation}>
          Each tap sends an event through the bridge from native → JavaScript
        </Text>
      </View>

      {/* Platform Differences Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform-Specific Features</Text>
        
        <Pressable
          style={styles.infoButton}
          onPress={() => setShowInfo(!showInfo)}
        >
          <Text style={styles.infoButtonText}>
            {showInfo ? 'Hide' : 'Show'} Platform Details
          </Text>
        </Pressable>

        {showInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Current Platform Info:</Text>
            <Text style={styles.infoText}>• OS: {Platform.OS}</Text>
            <Text style={styles.infoText}>• Version: {Platform.Version}</Text>
            <Text style={styles.infoText}>• Is TV: {Platform.isTV ? 'Yes' : 'No'}</Text>
            
            {Platform.OS === 'ios' && (
              <>
                <Text style={styles.infoText}>• Shadow: Core Animation</Text>
                <Text style={styles.infoText}>• Font: SF Pro</Text>
              </>
            )}
            
            {Platform.OS === 'android' && (
              <>
                <Text style={styles.infoText}>• Shadow: Material Elevation</Text>
                <Text style={styles.infoText}>• Font: Roboto</Text>
              </>
            )}
          </View>
        )}
      </View>

      {/* Component Hierarchy Visualization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Component Hierarchy</Text>
        
        <View style={styles.hierarchyContainer}>
          <Text style={styles.hierarchyText}>{'<View> (Container)'}</Text>
          <View style={styles.hierarchyIndent}>
            <Text style={styles.hierarchyText}>{'├── <View> (Header)'}</Text>
            <Text style={styles.hierarchyText}>{'├── <View> (Section)'}</Text>
            <View style={styles.hierarchyIndent}>
              <Text style={styles.hierarchyText}>{'│   ├── <Text> (Title)'}</Text>
              <Text style={styles.hierarchyText}>{'│   └── <Pressable> (Button)'}</Text>
            </View>
            <Text style={styles.hierarchyText}>{'└── <View> (Footer)'}</Text>
          </View>
        </View>
      </View>

      {/* Performance Note */}
      <View style={styles.performanceNote}>
        <Text style={styles.performanceTitle}>⚡ Performance Insight</Text>
        <Text style={styles.performanceText}>
          All components you see are rendered natively on {Platform.OS}, 
          not in a web view. This ensures 60 FPS performance and platform-native behavior.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  mappingContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    padding: 12,
  },
  mappingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeText: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
    }),
    fontSize: 14,
    backgroundColor: '#e9ecef',
    padding: 4,
    borderRadius: 4,
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: '#007AFF',
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  nativeText: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  bridgeButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  bridgeButtonPressed: {
    backgroundColor: '#0056b3',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tapCount: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
  bridgeExplanation: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  infoButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    padding: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 4,
  },
  hierarchyContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    padding: 12,
  },
  hierarchyText: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
    }),
    fontSize: 12,
    color: '#495057',
    marginBottom: 2,
  },
  hierarchyIndent: {
    marginLeft: 20,
  },
  performanceNote: {
    backgroundColor: '#d1ecf1',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#17a2b8',
    marginTop: 10,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c5460',
    marginBottom: 8,
  },
  performanceText: {
    fontSize: 14,
    color: '#0c5460',
    lineHeight: 20,
  },
});
