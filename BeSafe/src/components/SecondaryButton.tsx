import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import colors from '../theme/colors';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function SecondaryButton({ title, onPress, style }: SecondaryButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
});
