import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconSearch } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import CourseCard from '../components/CourseCard';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'Courses'>;

export default function CoursesScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
    setActiveTab(tab);
      if (tab === 'home') navigation.navigate('Home');
    if (tab === 'social') navigation.navigate('Social');
    if (tab === 'courses') navigation.navigate('Courses');
    if (tab === 'calendar') navigation.navigate('Calendar');
    if (tab === 'live') navigation.navigate('LiveClasses');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  const continuingCourses = [
    {
      title: 'Violencia de género',
      description: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit mollis.',
      instructor: 'Jose Rodolfo',
      progress: 48,
      total: 60,
      progressPercent: 40,
      backgroundColor: '#FBEAF0',
      iconColor: '#F4C0D1',
    },
    {
      title: 'Finanzas básicas',
      description: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit mollis.',
      instructor: 'Jose Rodolfo',
      progress: 48,
      total: 60,
      progressPercent: 70,
      backgroundColor: '#E1F5EE',
      iconColor: '#85B7EB',
    },
    {
      title: 'Defensa personal',
      description: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit mollis.',
      instructor: 'Jose Rodolfo',
      progress: 48,
      total: 60,
      progressPercent: 90,
      backgroundColor: '#FAEEDA',
      iconColor: '#FAC775',
    },
  ];

  return (
    <SafeAreaViewContext style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Mis cursos</Text>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <IconSearch size={18} color={colors.textMuted} strokeWidth={1.5} />
          <TextInput
            style={styles.searchInput}
            placeholder="Busca entre tus cursos..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Continúa aprendiendo */}
        <Text style={styles.sectionTitle}>Continúa aprendiendo</Text>
        {continuingCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            description={course.description}
            instructor={course.instructor}
            progress={course.progress}
            total={course.total}
            progressPercent={course.progressPercent}
            backgroundColor={course.backgroundColor}
            iconColor={course.iconColor}
            onPress={() => {}}
          />
        ))}

        {/* Todos tus cursos */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Todos tus cursos</Text>
        {continuingCourses.map((course, index) => (
          <CourseCard
            key={`all-${index}`}
            title={course.title}
            description={course.description}
            instructor={course.instructor}
            progress={course.progress}
            total={course.total}
            progressPercent={course.progressPercent}
            backgroundColor={course.backgroundColor}
            iconColor={course.iconColor}
            onPress={() => {}}
          />
        ))}
      </ScrollView>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background,paddingBottom: 0 ,paddingTop: 30 },
  container: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 20, paddingHorizontal: 12, marginBottom: 20, borderWidth: 0.5, borderColor: colors.border , marginTop: 10},
  searchInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 13, color: colors.textPrimary },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 15 },
});