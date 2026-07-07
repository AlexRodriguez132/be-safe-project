import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconArrowLeft, IconStar, IconSend } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import PostCard from '../components/PostCard';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'CourseDetail'>;

export default function CourseDetailScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('courses');

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'social') navigation.navigate('Social');
    if (tab === 'courses') navigation.navigate('Courses');
    if (tab === 'calendar') navigation.navigate('Calendar');
    if (tab === 'live') navigation.navigate('LiveClasses');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  return (
    <SafeAreaViewContext style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconArrowLeft size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Video placeholder */}
        <View style={[styles.videoContainer, { backgroundColor: '#FAC775' }]}>
          <View style={styles.playControls}>
    <IconArrowLeft size={20} color="white" strokeWidth={1.5} />
    <TouchableOpacity style={styles.playButton}>
    <Text style={styles.playIcon}>▶</Text>
  </TouchableOpacity>
  <IconArrowLeft size={20} color="white" strokeWidth={1.5} />
</View>
          <View style={styles.progressBar} />
        </View>

        {/* Title */}
        <Text style={styles.title}>¿Qué es la violencia?</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <IconStar key={i} size={14} color="#FAC775" fill="#FAC775" strokeWidth={0} />
            ))}
          </View>
          <Text style={styles.ratingText}>4.8</Text>
          <Text style={styles.reviewCount}>(214 reseñas)</Text>
        </View>

        {/* Comments section */}
        <Text style={styles.sectionTitle}>Comentarios</Text>
        
        <PostCard
          authorInitials="RM"
          authorName="Regina M."
          timeAgo="hace 2 h"
          content="Súper claro y respetuoso. Me ayudó muchísimo."
          likes={24}
          comments={8}
          backgroundColor="#FBEAF0"
          initialsColor="#F4C0D1"
        />

        <PostCard
          authorInitials="MV"
          authorName="Mariana V."
          timeAgo="hace 5 h"
          content="Buen contenido, me gustaría más profundidad."
          likes={12}
          comments={5}
          backgroundColor="#E1F5EE"
          initialsColor="#85B7EB"
        />
      </ScrollView>

      {/* Input comentario */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un comentario..."
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity style={styles.sendButton}>
          <IconSend size={18} color={colors.tealDark} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  videoContainer: { width: '100%', height: 140, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  playControls: { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 10 },
  playButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  playIcon: { fontSize: 16, color: 'white', fontWeight: '600' },
  progressBar: { width: '80%', height: 3, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 1.5 },
  title: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  stars: { flexDirection: 'row', gap: 2 },
  ratingText: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  reviewCount: { fontSize: 12, color: colors.textMuted },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 },
  inputContainer: { flexDirection: 'row', gap: 8, paddingHorizontal: 14, paddingBottom: 80, alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: colors.white, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, fontSize: 13, color: colors.textPrimary, borderWidth: 0.5, borderColor: colors.border },
  sendButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: colors.border },
});