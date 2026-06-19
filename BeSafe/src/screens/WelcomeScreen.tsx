import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.decorContainer}>
          <View style={[styles.circle, styles.circleLarge]} />
          <View style={[styles.circle, styles.circleMedium]} />
          <View style={styles.shieldContainer}>
            <Text style={styles.shieldIcon}>🛡️</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bienvenida a BE SAFE</Text>
          <Text style={styles.subtitle}>Un espacio seguro para{'\n'}aprender, sanar y crecer.</Text>
        </View>
        <View style={styles.buttons}>
          <PrimaryButton title="Crear cuenta" onPress={() => navigation.navigate('RegisterStep1')} />
          <SecondaryButton title="Iniciar sesión" onPress={() => navigation.navigate('Login')} style={{ marginTop: 12 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.backgroundPink },
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 20, paddingBottom: 40 },
  decorContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 32, height: 200 },
  circle: { position: 'absolute', borderRadius: 999 },
  circleLarge: { width: 180, height: 180, backgroundColor: colors.tealLight },
  circleMedium: { width: 130, height: 130, backgroundColor: colors.teal, opacity: 0.4 },
  shieldContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  shieldIcon: { fontSize: 36 },
  textContainer: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 26, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  buttons: { marginTop: 'auto' },
});
