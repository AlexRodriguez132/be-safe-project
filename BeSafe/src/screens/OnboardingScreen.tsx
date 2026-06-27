import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';
import ShieldIcon from '../components/ShieldIcon';

type Props = ScreenProps<'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
       
        <Logo />
  
        {/* Decorative colored dots */}
        <View style={[styles.decorDot, styles.dotAmber]} />
        <View style={[styles.decorDot, styles.dotPink]} />
        <View style={[styles.decorDot, styles.dotBlue]} />
        <View style={[styles.decorDot, styles.dotGreen]} />
        <View style={styles.decorContainer}>
          <View style={[styles.circle, styles.circleLarge]} />
          <View style={[styles.circle, styles.circleMedium]} />
          <ShieldIcon />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bienvenido a BE SAFE</Text>
          <Text style={styles.subtitle}>Un espacio seguro para{'\n'}aprender, sanar y crecer.</Text>
        </View>
        <View style={styles.buttons}>
          <PrimaryButton title="Comenzar" onPress={() => navigation.navigate('Home')} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.backgroundPink },
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 20, paddingBottom: 40, position: 'relative' },
  
  // Decorative dots
  decorDot: { position: 'absolute', borderRadius: 999 },
  dotAmber: { width: 24, height: 24, backgroundColor: '#FAC775', top: 200, left: 30 },
  dotPink: { width: 18, height: 18, backgroundColor: '#F4C0D1', top: 280, right: 20 },
  dotBlue: { width: 12, height: 12, backgroundColor: '#85B7EB', bottom: 320, left: 20 },
  dotGreen: { width: 16, height: 16, backgroundColor: '#C0DD97', bottom: 200, right: 30 },
  
  decorContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 32, height: 200 },
  circle: { position: 'absolute', borderRadius: 999 },
  circleLarge: { width: 300, height: 300, backgroundColor: colors.tealLight, marginTop: 20 },
  circleMedium: { width: 220, height: 220, backgroundColor: colors.teal, opacity: 0.4 , alignContent: 'center',marginTop: 20},
  textContainer: { alignItems: 'center', marginBottom: 50,marginTop: 20 },
  title: { fontSize: 26, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginTop: 50},
  subtitle: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22, marginTop: 8 },
  buttons: { marginTop: -8 },
});


