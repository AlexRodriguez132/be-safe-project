import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import BottomTabBar from '../components/ BottomTabBar';
import LiveClassCard from '../components/LiveClassCard';
import UpcomingClassCard from '../components/UpcomingClassCard';
import ChatbotFAB from '../components/ChatbotFAB';
import { ScreenProps } from '../types/navigation';
import colors from '../theme/colors';

type Props = ScreenProps<'LiveClasses'>;

export default function LiveClassesScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('live');

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'social') navigation.navigate('Social');
    if (tab === 'courses') navigation.navigate('Courses');
    if (tab === 'calendar') navigation.navigate('Calendar');
    if (tab === 'profile') navigation.navigate('Profile');

  };

  return (
    <SafeAreaViewContext style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Clases en vivo</Text>
        <Text style={styles.subtitle}>Sesiones sincrónicas con expertos</Text>
        
        {/* Live class */}
        <LiveClassCard
          title="Reconocer la violencia psicológica"
          instructor="Lic. Isabel Morales"
          attendees={18}
          onPress={() => {}}
        />

        {/* Upcoming classes */}
        <Text style={styles.sectionTitle}>Próximas</Text>
        
        <UpcomingClassCard
          day={22}
          month="MAY"
          title="Finanzas para mujeres"
          time="18:00"
          instructor="Lic. Karla F."
          onPress={() => {}}
        />

        <UpcomingClassCard
          day={25}
          month="MAY"
          title="Tus derechos legales"
          time="18:00"
          instructor="Lic. Irma C."
          onPress={() => {}}
        />

        <UpcomingClassCard
          day={30}
          month="MAY"
          title="Autodefensa básica"
          time="18:00"
          instructor="Profe Diana L."
          onPress={() => {}}
        />
      </ScrollView>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background,paddingTop: 30 },
  container: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 12, color: colors.textMuted, marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, marginBottom: 12, marginTop: 8 },
});