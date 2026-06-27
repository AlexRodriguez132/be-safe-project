import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import StepIndicator from '../components/StepIndicator';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'RegisterStep3'>;

function getStrength(pwd: string) {
  if (pwd.length === 0) return { label: '', bars: 0, color: '' };
  if (pwd.length < 6) return { label: 'Débil', bars: 1, color: colors.error };
  if (pwd.length < 10) return { label: 'Buena', bars: 2, color: colors.teal };
  return { label: 'Fuerte', bars: 3, color: '#1D9E75' };
}

export default function RegisterStep3({ navigation }: Props) {
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const strength = getStrength(password);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.stepLabel}>Paso 3 de 3 · Contraseña</Text>
          </View>
        </View>
        <StepIndicator currentStep={3} />
        <InputField label="Contraseña" placeholder="Mínimo 8 caracteres" secureTextEntry required value={password} onChangeText={setPassword} />
        <InputField label="Confirmar contraseña" placeholder="Repite tu contraseña" secureTextEntry required value={confirmPassword} onChangeText={setConfirmPassword} />
        {password.length > 0 && (
          <View style={styles.strengthContainer}>
            <Text style={styles.strengthLabel}>Seguridad de la contraseña</Text>
            <View style={styles.barsRow}>
              {[1, 2, 3].map((b) => (
                <View key={b} style={[styles.bar, b <= strength.bars && { backgroundColor: strength.color }]} />
              ))}
            </View>
            {strength.label ? <Text style={[styles.strengthText, { color: strength.color }]}>{strength.label}</Text> : null}
          </View>
        )}
        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)} activeOpacity={0.7}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkText}>
            Acepto el <Text style={styles.link}>aviso de privacidad y el acuerdo de confidencialidad de BE SAFE.</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <SecondaryButton title="Atrás" onPress={() => navigation.goBack()} style={styles.backButton} />
          <PrimaryButton title="Crear cuenta" onPress={() => navigation.navigate('Onboarding')}  style={styles.nextButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 28 },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 22, color: colors.textPrimary },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  stepLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  strengthContainer: { marginBottom: 16 },
  strengthLabel: { fontSize: 13, color: colors.textSecondary, marginBottom: 6 },
  barsRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  bar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.stepInactive },
  strengthText: { fontSize: 13, fontWeight: '500' },
  checkRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginBottom: 32 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
  checkboxActive: { backgroundColor: colors.teal, borderColor: colors.teal },
  checkmark: { fontSize: 12, color: colors.white, fontWeight: '700' },
  checkText: { flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  link: { color: colors.tealDark, fontWeight: '500' },
  buttonRow: { flexDirection: 'row', gap: 12 },
  backButton: { flex: 1 },
  nextButton: { flex: 2 },
});
