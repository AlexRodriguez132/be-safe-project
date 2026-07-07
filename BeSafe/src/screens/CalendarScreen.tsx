import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconChevronLeft, IconChevronRight, IconPlus } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'Calendar'>;

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAYS_OF_WEEK = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export default function CalendarScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(7); // Julio (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'social') navigation.navigate('Social');
    if (tab === 'courses') navigation.navigate('Courses');
    if (tab === 'live') navigation.navigate('LiveClasses');
    if (tab === 'calendar') navigation.navigate('Calendar');
    if (tab === 'profile') navigation.navigate('Profile');

  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = [];

  // Días del mes anterior
  const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }

  // Días del próximo mes
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  const appointments = [
    { day: 20, month: 'MAY', title: 'Gestión 12:30h', description: 'Defensa personal Módulo 4 de 6', color: '#FAEEDA' },
    { day: 22, month: 'MAY', title: 'Asesoría 17:00h', description: 'Finanzas - Lic. Isabel Morales', color: '#E1F5EE' },
  ];

  return (
    <SafeAreaViewContext style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Calendar Header */}
        <View style={styles.header}>
          <Text style={styles.monthYear}>{MONTHS[currentMonth]} {currentYear}</Text>
          <View style={styles.navButtons}>
            <TouchableOpacity onPress={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)}>
              <IconChevronLeft size={18} color={colors.textMuted} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)}>
              <IconChevronRight size={18} color={colors.textMuted} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Days of week */}
        <View style={styles.daysOfWeek}>
          {DAYS_OF_WEEK.map((day, index) => (
            <Text key={index} style={styles.dayOfWeekText}>{day}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>
          {days.map((dayObj, index) => {
            const isToday = dayObj.isCurrentMonth && dayObj.day === 20;
            const hasAppointment = dayObj.isCurrentMonth && (dayObj.day === 20 || dayObj.day === 22);
            const appointmentColor = dayObj.day === 20 ? '#E1F5EE' : '#FAEEDA';

            return (
              <View key={index} style={styles.dayCell}>
                <View
                  style={[
                    styles.dayNumber,
                    isToday && styles.todayBg,
                    hasAppointment && !isToday && { backgroundColor: appointmentColor, borderRadius: 50 },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !dayObj.isCurrentMonth && styles.otherMonthText,
                      isToday && styles.todayText,
                    ]}
                  >
                    {dayObj.day}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Appointments section */}
        <Text style={styles.sectionTitle}>Próximas citas</Text>
        
        {appointments.map((apt, index) => (
          <View key={index} style={[styles.appointmentCard, { backgroundColor: apt.color }]}>
            <View style={styles.appointmentDate}>
              <Text style={styles.appointmentMonth}>{apt.month}</Text>
              <Text style={styles.appointmentDay}>{apt.day}</Text>
            </View>
            <View style={styles.appointmentDivider} />
            <View style={styles.appointmentContent}>
              <Text style={styles.appointmentTitle}>{apt.title}</Text>
              <Text style={styles.appointmentDescription}>{apt.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
      style={styles.fab}
      onPress={() => navigation.navigate('RequestAdvisory')}>
      <IconPlus size={24} color="white" strokeWidth={2} />
      </TouchableOpacity>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background , paddingTop:30},
  container: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  monthYear: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  navButtons: { flexDirection: 'row', gap: 8 },
  daysOfWeek: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  dayOfWeekText: { fontSize: 10, color: colors.textMuted, fontWeight: '500', width: '14.2%', textAlign: 'center' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  dayCell: { width: '14.2%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  dayNumber: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  dayText: { fontSize: 12, color: colors.textPrimary, fontWeight: '500' },
  otherMonthText: { color: colors.textMuted, opacity: 0.5 },
  todayBg: { backgroundColor: colors.tealDark, borderRadius: 50 },
  todayText: { color: 'white' },
  sectionTitle: { fontSize: 12, color: colors.textMuted, fontWeight: '500', marginBottom: 10 },
  appointmentCard: { borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  appointmentDate: { alignItems: 'center', marginRight: 12, minWidth: 50 },
  appointmentMonth: { fontSize: 9, color: colors.textMuted, fontWeight: '500' },
  appointmentDay: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, lineHeight: 20 },
  appointmentDivider: { width: 0.5, height: 40, backgroundColor: 'rgba(0,0,0,0.1)', marginHorizontal: 12 },
  appointmentContent: { flex: 1 },
  appointmentTitle: { fontSize: 12, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  appointmentDescription: { fontSize: 10, color: colors.textMuted },
  fab: { position: 'absolute', bottom: 120, right: 14, width: 44, height: 44, borderRadius: 22, backgroundColor: colors.tealDark, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
});