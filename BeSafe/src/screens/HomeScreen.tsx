import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconMoodSad, IconMoodNeutral, IconMoodSmile, IconMoodHappy } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';
import ChatbotFAB from '../components/ChatbotFAB';

type Props = ScreenProps<'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('home');

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
  setActiveTab(tab);
  if (tab === 'social') navigation.navigate('Social');
  if (tab === 'courses') navigation.navigate('Courses');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Hola, Karina</Text>
        <Text style={styles.question}>¿Cómo te sientes hoy?</Text>
        
        {/* Mood selector */}
        <View style={styles.moodContainer}>
          <View style={[styles.moodButton, styles.moodSad]}>
            <IconMoodSad size={24} color="#4B1528" strokeWidth={1.5} />
          </View>
          <View style={[styles.moodButton, styles.moodNeutral]}>
            <IconMoodNeutral size={24} color="#633806" strokeWidth={1.5} />
          </View>
          <View style={[styles.moodButton, styles.moodSmile]}>
            <IconMoodSmile size={24} color="#173404" strokeWidth={1.5} />
          </View>
          <View style={[styles.moodButton, styles.moodHappy]}>
            <IconMoodHappy size={24} color="#042C53" strokeWidth={1.5} />
          </View>
          <View style={[styles.moodButton, styles.moodVeryHappy]}>
            <IconMoodHappy size={24} color="#04342C" strokeWidth={1.5} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Continúa aprendiendo</Text>
        
        {/* Course cards */}
        <View style={[styles.courseCard, styles.courseTeal]}>
          <Text style={styles.courseTitle}>Violencia de género</Text>
          <Text style={styles.courseModule}>Módulo 3 de 5 · 60%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%', backgroundColor: colors.tealDark }]} />
          </View>
        </View>

        <View style={[styles.courseCard, styles.coursePink]}>
          <Text style={styles.courseTitle}>Finanzas básicas</Text>
          <Text style={styles.courseModule}>Módulo 1 de 4 · 25%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '25%', backgroundColor: '#993556' }]} />
          </View>
        </View>

        <View style={[styles.courseCard, styles.courseAmber]}>
          <Text style={styles.courseTitle}>Defensa personal</Text>
          <Text style={styles.courseModule}>Módulo 2 de 6 · 33%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%', backgroundColor: '#BA7517' }]} />
          </View>
        </View>
      </ScrollView>
      
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
      <ChatbotFAB onPress={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background, paddingBottom: 0 ,paddingTop: 40},
  container: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80 },
  greeting: { fontSize: 16, color: colors.textMuted, marginBottom: 8 },
  question: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 24 },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32, gap: 6 },
  moodButton: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  moodSad: { backgroundColor: '#F4C0D1' },
  moodNeutral: { backgroundColor: '#FAC775' },
  moodSmile: { backgroundColor: '#C0DD97' },
  moodHappy: { backgroundColor: '#85B7EB' },
  moodVeryHappy: { backgroundColor: colors.teal },
  sectionTitle: { fontSize: 13, color: colors.textMuted, marginBottom: 12, fontWeight: '500' },
  courseCard: { borderRadius: 16, padding: 14, marginBottom: 10 },
  courseTeal: { backgroundColor: '#E1F5EE' },
  coursePink: { backgroundColor: '#FBEAF0' },
  courseAmber: { backgroundColor: '#FAEEDA' },
  courseTitle: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  courseModule: { fontSize: 11, color: colors.textMuted, marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
});