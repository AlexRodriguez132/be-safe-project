import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import StepIndicator from '../components/StepIndicator';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'RegisterStep1'>;
const orientaciones = ['Heterosexual', 'LGBTQ+', 'Prefiero no decir'] as const;

export default function RegisterStep1({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [orientation, setOrientation] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.stepLabel}>Paso 1 de 3 · Datos personales</Text>
          </View>
        </View>
        <StepIndicator currentStep={1} />
        <InputField label="Nombre completo" placeholder="Escribe tu nombre completo" required value={nombre} onChangeText={setNombre} />
        <View style={styles.row}>
          <InputField label="Edad" placeholder="Ej. 25" keyboardType="numeric" required value={edad} onChangeText={setEdad} style={styles.halfField} />
          <InputField label="Ciudad" placeholder="Tu ciudad" required value={ciudad} onChangeText={setCiudad} style={styles.halfField} />
        </View>
        <Text style={styles.fieldLabel}>Orientación sexual <Text style={styles.optional}>(opcional)</Text></Text>
        <View style={styles.pillsContainer}>
          {orientaciones.map((op) => (
            <TouchableOpacity key={op} style={[styles.pill, orientation === op && styles.pillActive]} onPress={() => setOrientation(op)}>
              <Text style={[styles.pillText, orientation === op && styles.pillTextActive]}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <PrimaryButton title="Siguiente" onPress={() => navigation.navigate('RegisterStep2', { nombre, edad, ciudad })} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { paddingHorizontal: 24, paddingTop: 26, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 28 },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 22, color: colors.textPrimary },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  stepLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  row: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },
  fieldLabel: { fontSize: 14, fontWeight: '500', color: colors.textPrimary, marginBottom: 10 },
  optional: { color: colors.textMuted, fontWeight: '400' },
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 40 },
  pill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 50, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  pillActive: { backgroundColor: colors.teal, borderColor: colors.teal },
  pillText: { fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  pillTextActive: { color: colors.white },
});
