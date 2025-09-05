import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Text Component Basics
 * 
 * This example demonstrates the fundamental usage of the Text component
 * in React Native, including different styling options and text properties.
 */

export default function TextBasicExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text Component Examples</Text>
      
      {/* Basic Text */}
      <Text style={styles.basicText}>
        This is a basic text component
      </Text>
      
      {/* Styled Text */}
      <Text style={styles.styledText}>
        This text has custom styling
      </Text>
      
      {/* Bold Text */}
      <Text style={styles.boldText}>
        This text is bold
      </Text>
      
      {/* Italic Text */}
      <Text style={styles.italicText}>
        This text is italic
      </Text>
      
      {/* Colored Text */}
      <Text style={styles.coloredText}>
        This text has a custom color
      </Text>
      
      {/* Multiple Styles */}
      <Text style={[styles.boldText, styles.coloredText, styles.largeText]}>
        This text combines multiple styles
      </Text>
      
      {/* Nested Text */}
      <Text style={styles.basicText}>
        This is a paragraph with{" "}
        <Text style={styles.highlightText}>highlighted</Text> text and{" "}
        <Text style={styles.boldText}>bold</Text> text.
      </Text>
      
      {/* Text with line height */}
      <Text style={styles.textWithLineHeight}>
        This text has increased line height for better readability. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      
      {/* Text Alignment */}
      <Text style={styles.centeredText}>Centered Text</Text>
      <Text style={styles.rightAlignedText}>Right Aligned Text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 24,
    textAlign: "center",
  },
  basicText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
  },
  styledText: {
    fontSize: 18,
    color: "#2563eb",
    marginBottom: 12,
    fontWeight: "500",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 12,
  },
  italicText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#374151",
    marginBottom: 12,
  },
  coloredText: {
    fontSize: 16,
    color: "#dc2626",
    marginBottom: 12,
  },
  largeText: {
    fontSize: 20,
  },
  highlightText: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    fontWeight: "600",
  },
  textWithLineHeight: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 12,
  },
  centeredText: {
    fontSize: 16,
    textAlign: "center",
    color: "#374151",
    marginBottom: 12,
  },
  rightAlignedText: {
    fontSize: 16,
    textAlign: "right",
    color: "#374151",
    marginBottom: 12,
  },
});