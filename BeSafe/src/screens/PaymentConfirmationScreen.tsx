import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconHeart } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'PaymentConfirmation'>;

export default function PaymentConfirmationScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('profile');

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'social') navigation.navigate('Social');
    if (tab === 'courses') navigation.navigate('Courses');
    if (tab === 'live') navigation.navigate('LiveClasses');
    if (tab === 'calendar') navigation.navigate('Calendar');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  return (
    <SafeAreaViewContext style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Success icon */}
        <View style={styles.iconContainer}>
          <View style={styles.heartCircle}>
            <IconHeart size={50} color="white" strokeWidth={2} fill="white" />
          </View>
          <View style={styles.dot1} />
          <View style={styles.dot2} />
        </View>

        {/* Title */}
        <Text style={styles.title}>¡Gracias por unirte!</Text>
        <Text style={styles.subtitle}>Tu suscripción está activa. Tu apoyo ayuda a sostener este espacio seguro.</Text>

        {/* Details card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plan</Text>
            <Text style={styles.detailValue}>Premium</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Próximo cargo</Text>
            <Text style={styles.detailValue}>19 jun, 2026</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Folio</Text>
            <Text style={[styles.detailValue, styles.folioText]}>#BS-04827</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Empezar a aprender</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => {}}
        >
          <Text style={styles.secondaryButtonText}>Descargar comprobante</Text>
        </TouchableOpacity>
      </ScrollView>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FBEAF0' },
  container: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100, alignItems: 'center' },
  iconContainer: { position: 'relative', marginBottom: 20, marginTop: 20 },
  heartCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ED93B1', alignItems: 'center', justifyContent: 'center' },
  dot1: { position: 'absolute', top: -8, right: -2, width: 16, height: 16, borderRadius: 8, backgroundColor: '#FAC775' },
  dot2: { position: 'absolute', bottom: 8, left: -10, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.teal },
  title: { fontSize: 18, fontWeight: '700', color: '#4B1528', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 12, color: '#72243E', textAlign: 'center', lineHeight: 18, marginBottom: 20 },
  detailsCard: { width: '100%', backgroundColor: 'white', borderRadius: 12, padding: 14, marginBottom: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  detailLabel: { fontSize: 11, color: colors.textMuted, fontWeight: '500' },
  detailValue: { fontSize: 12, color: colors.textPrimary, fontWeight: '600' },
  folioText: { fontFamily: 'monospace' },
  divider: { height: 0.5, backgroundColor: colors.border },
  button: { width: '100%', backgroundColor: colors.textPrimary, paddingVertical: 14, borderRadius: 24, alignItems: 'center', marginBottom: 12 },
  buttonText: { fontSize: 13, fontWeight: '600', color: 'white' },
  secondaryButton: { paddingVertical: 12 },
  secondaryButtonText: { fontSize: 12, color: '#993556', fontWeight: '500' },
});