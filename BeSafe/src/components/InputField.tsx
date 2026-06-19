import React from 'react';
import { View, TextInput, Text, StyleSheet, StyleProp, ViewStyle, KeyboardTypeOptions } from 'react-native';
import colors from '../theme/colors';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  required?: boolean;
  optional?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function InputField({
  label, placeholder, value, onChangeText,
  keyboardType = 'default', secureTextEntry = false,
  required = false, optional = false, style,
}: InputFieldProps) {
  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
          {optional && <Text style={styles.optional}> (opcional)</Text>}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', color: colors.textPrimary, marginBottom: 6 },
  required: { color: colors.textPrimary },
  optional: { color: colors.textMuted, fontWeight: '400' },
  inputContainer: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.white },
  input: { paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: colors.textPrimary },
});
