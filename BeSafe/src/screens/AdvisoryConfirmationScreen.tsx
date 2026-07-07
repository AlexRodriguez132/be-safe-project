import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconCheck, IconCalendar, IconClock } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'AdvisoryConfirmation'>;

export default function AdvisoryConfirmationScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('calendar');

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
          <View style={styles.checkCircle}>
            <IconCheck size={50} color="white" strokeWidth={2} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>¡Asesoría agendada!</Text>
        <Text style={styles.subtitle}>Te enviamos los detalles a tu correo electrónico. Recibirás un recordatorio el día de tu sesión.</Text>

        {/* Details card */}
        <View style={styles.detailsCard}>
          {/* Instructor */}
          <View style={styles.instructorRow}>
            <View style={[styles.avatar, { backgroundColor: '#F4C0D1' }]}>
              <Text style={styles.avatarText}>IM</Text>
            </View>
            <View>
              <Text style={styles.instructorName}>Lic. Isabel Morales</Text>
              <Text style={styles.instructorRole}>Psicología</Text>
            </View>
          </View>

          {/* Date */}
          <View style={styles.detailRow}>
            <IconCalendar size={18} color={colors.textMuted} strokeWidth={1.5} />
            <Text style={styles.detailText}>Miércoles 22 de mayo</Text>
          </View>

          {/* Time */}
          <View style={styles.detailRow}>
            <IconClock size={18} color={colors.textMuted} strokeWidth={1.5} />
            <Text style={styles.detailText}>17:00 — 18:00 h</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.buttonText}>Ver en mi calendario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Calendar')}>
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
  iconContainer: { marginBottom: 20, marginTop: 20 },
  checkCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#ED93B1', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: '#4B1528', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 12, color: '#72243E', textAlign: 'center', lineHeight: 18, marginBottom: 20 },
  detailsCard: { width: '100%', backgroundColor: 'white', borderRadius: 12, padding: 14, marginBottom: 20 },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 11, fontWeight: '600', color: 'white' },
  instructorName: { fontSize: 12, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  instructorRole: { fontSize: 10, color: colors.textMuted },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  detailText: { fontSize: 12, color: colors.textPrimary },
  button: { width: '100%', backgroundColor: colors.textPrimary, paddingVertical: 14, borderRadius: 24, alignItems: 'center', marginBottom: 12 },
  buttonText: { fontSize: 13, fontWeight: '600', color: 'white' },
  secondaryButton: { paddingVertical: 12 },
  secondaryButtonText: { fontSize: 12, color: '#993556', fontWeight: '500' },
});