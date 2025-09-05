import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const handleTestConcept = () => {
    Alert.alert(
      "How to Test Concepts",
      "1. Copy any concept file from ../../concepts/\n" +
        "2. Paste it in app/concept.tsx\n" +
        "3. Save and see it in action!",
      [{ text: "Got it!" }]
    );
  };

  const navigateToConcept = () => {
    router.push("/concept");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Test App</Text>
        <Text style={styles.subtitle}>
          Copy concepts to app/concept.tsx and test instantly
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <View style={styles.card}>
          <Text style={styles.stepNumber}>1</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose a Concept</Text>
            <Text style={styles.stepText}>
              Browse ../../concepts/ and pick any .tsx file
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.stepNumber}>2</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Copy & Paste</Text>
            <Text style={styles.stepText}>
              Copy content and paste into app/concept.tsx
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.stepNumber}>3</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Test & Learn</Text>
            <Text style={styles.stepText}>
              Save and tap "Test Current Concept" below
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={navigateToConcept}>
          <Text style={styles.primaryButtonText}>Test Current Concept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleTestConcept}>
          <Text style={styles.secondaryButtonText}>How to Test?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Available Concepts</Text>
        <Text style={styles.infoText}>
          📁 concepts/01-core-components/examples/text-basic.tsx
        </Text>
        <Text style={styles.infoText}>
          📁 concepts/01-core-components/examples/view-basic.tsx
        </Text>
        <Text style={styles.infoSubtext}>
          Copy any concept → paste in app/concept.tsx → save → test!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 24,
    backgroundColor: "#2563eb",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#e2e8f0",
    textAlign: "center",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    width: 32,
    height: 32,
    textAlign: "center",
    lineHeight: 32,
    borderRadius: 16,
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    margin: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 6,
    paddingLeft: 8,
  },
  infoSubtext: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 8,
    fontStyle: "italic",
    paddingLeft: 8,
  },
});
