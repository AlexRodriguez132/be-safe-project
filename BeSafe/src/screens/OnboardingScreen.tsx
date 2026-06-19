import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.decorContainer}>
          <View style={[styles.dot, { top: 10, left: 20, backgroundColor: colors.teal }]} />
          <View style={[styles.dot, { top: 60, right: 10, backgroundColor: '#F5A623', width: 14, height: 14 }]} />
          <View style={[styles.dot, { bottom: 20, left: 40, backgroundColor: '#E24B4A', width: 10, height: 10 }]} />
          <View style={[styles.dot, { bottom: 40, right: 30, backgroundColor: colors.teal, width: 8, height: 8 }]} />
          <View style={styles.bigCircle}>
            <Text style={styles.shieldIcon}>🛡️</Text>
          </View>
        </View>
        <Text style={styles.title}>Bienvenido a BE SAFE</Text>
        <Text style={styles.subtitle}>Un espacio seguro para{'\n'}aprender, sanar y crecer.</Text>
        <View style={styles.buttons}>
          <PrimaryButton title="Comenzar" onPress={() => navigation.navigate('RegisterStep1')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.backgroundPink },
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 20, paddingBottom: 40 },
  decorContainer: { height: 240, alignItems: 'center', justifyContent: 'center', marginTop: 32, marginBottom: 24, position: 'relative' },
  dot: { position: 'absolute', width: 18, height: 18, borderRadius: 999 },
  bigCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  shieldIcon: { fontSize: 64 },
  title: { fontSize: 26, fontWeight: '700', color: colors.textPrimary, marginBottom: 10 },
  subtitle: { fontSize: 15, color: colors.textSecondary, lineHeight: 22, marginBottom: 40 },
  buttons: { marginTop: 'auto' },
});
