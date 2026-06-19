import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.decorTopRight}>
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />
        </View>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Inicia sesión</Text>
          <Text style={styles.subtitle}>Bienvenida de regreso</Text>
        </View>
        <View style={styles.form}>
          <InputField label="Correo electrónico" placeholder="tucorreo@ejemplo.com" keyboardType="email-address" required />
          <InputField label="Contraseña" placeholder="••••••••" secureTextEntry required />
          <TouchableOpacity style={styles.forgotLink}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton title="Ingresar" onPress={() => {}} />
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterStep1')}>
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 20, paddingBottom: 40 },
  decorTopRight: { position: 'absolute', top: 0, right: 0, width: 140, height: 140 },
  decorCircle1: { position: 'absolute', width: 110, height: 110, borderRadius: 55, backgroundColor: colors.tealLight, top: -20, right: -20 },
  decorCircle2: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#FEF3ED', top: 65, right: 30 },
  headerSection: { marginTop: 48, marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 4 },
  form: { marginBottom: 24 },
  forgotLink: { alignSelf: 'flex-end', marginTop: 4 },
  forgotText: { fontSize: 13, color: colors.tealDark, fontWeight: '500' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 20, marginBottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.stepInactive },
  dotActive: { backgroundColor: colors.primary },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto' },
  registerText: { fontSize: 14, color: colors.textSecondary },
  registerLink: { fontSize: 14, color: colors.tealDark, fontWeight: '600' },
});
