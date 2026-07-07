import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconArrowLeft } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'RequestAdvisory'>;

export default function RequestAdvisoryScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('calendar');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Psicología');
  const [selectedTime, setSelectedTime] = useState('10:00');

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'social') navigation.navigate('Social');
    if (tab === 'courses') navigation.navigate('Courses');
    if (tab === 'live') navigation.navigate('LiveClasses');
    if (tab === 'calendar') navigation.navigate('Calendar');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  const specialties = ['Psicología', 'Jurídico', 'Finanzas'];
  const times = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

  return (
    <SafeAreaViewContext style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconArrowLeft size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Solicitar asesoría</Text>
        </View>

        {/* Specialty section */}
        <Text style={styles.sectionLabel}>Especialidad</Text>
        <View style={styles.specialtyContainer}>
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty}
              style={[
                styles.specialtyButton,
                selectedSpecialty === specialty && styles.specialtyButtonActive,
              ]}
              onPress={() => setSelectedSpecialty(specialty)}
            >
              <Text
                style={[
                  styles.specialtyText,
                  selectedSpecialty === specialty && styles.specialtyTextActive,
                ]}
              >
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Instructor section */}
        <Text style={styles.sectionLabel}>Instructora</Text>
        <View style={styles.instructorCard}>
          <View style={[styles.avatar, { backgroundColor: '#F4C0D1' }]}>
            <Text style={styles.avatarText}>IM</Text>
          </View>
          <View>
            <Text style={styles.instructorName}>Lic. Isabel Morales</Text>
            <Text style={styles.instructorRole}>Psicóloga · 4.9 ★</Text>
          </View>
        </View>

        {/* Date section */}
        <Text style={styles.sectionLabel}>Fecha: miércoles 14 de mayo</Text>

        {/* Available times */}
        <Text style={styles.sectionLabel}>Horarios disponibles</Text>
        <View style={styles.timesGrid}>
          {times.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.timeButtonActive,
                time === '12:00' && styles.timeButtonDisabled,
              ]}
              onPress={() => selectedTime !== '12:00' && setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextActive,
                  time === '12:00' && styles.timeTextDisabled,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdvisoryConfirmation')}
        >
          <Text style={styles.buttonText}>Solicitar asesoría</Text>
        </TouchableOpacity>
      </ScrollView>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background , paddingTop:30},
  container: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '600', color: colors.textPrimary },
  sectionLabel: { fontSize: 11, color: colors.textMuted, fontWeight: '500', marginBottom: 10 },
  specialtyContainer: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  specialtyButton: { backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, minWidth: 100 },
  specialtyButtonActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  specialtyText: { fontSize: 12, color: colors.textMuted, fontWeight: '500', textAlign: 'center' },
  specialtyTextActive: { color: 'white' },
  instructorCard: { flexDirection: 'row', gap: 12, backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.border, borderRadius: 12, padding: 12, marginBottom: 20 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 11, fontWeight: '600', color: 'white' },
  instructorName: { fontSize: 12, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  instructorRole: { fontSize: 10, color: colors.textMuted },
  timesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  timeButton: { width: '31%', paddingVertical: 10, backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.border, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  timeButtonActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  timeButtonDisabled: { opacity: 0.5 },
  timeText: { fontSize: 12, color: colors.textMuted, fontWeight: '500' },
  timeTextActive: { color: 'white' },
  timeTextDisabled: { textDecorationLine: 'line-through', color: colors.textMuted },
  button: { width: '100%', backgroundColor: colors.textPrimary, paddingVertical: 14, borderRadius: 24, alignItems: 'center', marginBottom: 20 },
  buttonText: { fontSize: 13, fontWeight: '600', color: 'white' },
});