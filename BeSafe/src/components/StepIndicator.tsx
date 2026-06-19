import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({ currentStep, totalSteps = 3 }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <React.Fragment key={stepNum}>
            <View style={[styles.circle, isDone && styles.circleDone, isActive && styles.circleActive]}>
              {isDone
                ? <Text style={styles.checkmark}>✓</Text>
                : <Text style={[styles.stepText, isActive && styles.stepTextActive]}>{stepNum}</Text>
              }
            </View>
            {stepNum < totalSteps && (
              <View style={[styles.line, isDone && styles.lineDone]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  circle: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.stepInactive, alignItems: 'center', justifyContent: 'center' },
  circleActive: { backgroundColor: colors.teal },
  circleDone: { backgroundColor: colors.teal },
  stepText: { fontSize: 14, fontWeight: '600', color: colors.white },
  stepTextActive: { color: colors.white },
  checkmark: { fontSize: 14, color: colors.white, fontWeight: '700' },
  line: { flex: 1, height: 2, backgroundColor: colors.stepInactive, marginHorizontal: 4 },
  lineDone: { backgroundColor: colors.teal },
});
