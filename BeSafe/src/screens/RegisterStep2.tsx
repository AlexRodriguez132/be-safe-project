import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import StepIndicator from '../components/StepIndicator';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'RegisterStep2'>;

export default function RegisterStep2({ navigation, route }: Props) {
  const { nombre, edad, ciudad } = route.params;
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.stepLabel}>Paso 2 de 3 · Contacto</Text>
          </View>
        </View>
        <StepIndicator currentStep={2} />
        <InputField label="Correo electrónico" placeholder="tucorreo@ejemplo.com" keyboardType="email-address" required value={email} onChangeText={setEmail} />
        <InputField label="Teléfono" placeholder="+52 000 000 0000" keyboardType="phone-pad" required value={telefono} onChangeText={setTelefono} />
        <View style={styles.privacyBox}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>Tu información está protegida por un acuerdo de confidencialidad. Nunca compartiremos tus datos.</Text>
        </View>
        <View style={styles.buttonRow}>
          <SecondaryButton title="Atrás" onPress={() => navigation.goBack()} style={styles.backButton} />
          <PrimaryButton title="Siguiente" onPress={() => navigation.navigate('RegisterStep3', { nombre, edad, ciudad, email, telefono })} style={styles.nextButton} />
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
  privacyBox: { flexDirection: 'row', backgroundColor: colors.warningBg, borderRadius: 12, padding: 14, gap: 10, alignItems: 'flex-start', marginBottom: 32, borderWidth: 1, borderColor: colors.warning },
  privacyIcon: { fontSize: 18 },
  privacyText: { flex: 1, fontSize: 13, color: '#7A4A20', lineHeight: 19 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  backButton: { flex: 1 },
  nextButton: { flex: 2 },
});
