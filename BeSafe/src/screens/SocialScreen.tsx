import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconPlus, IconSend } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import PostCard from '../components/PostCard';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';
import ChatbotFAB from '../components/ChatbotFAB';

type Props = ScreenProps<'Social'>;

export default function SocialScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('social');

  const handleTabPress = (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigation.navigate('Home');
    if (tab === 'calendar') navigation.navigate('Calendar');
    if (tab === 'courses') navigation.navigate('Courses');
    if (tab === 'live') navigation.navigate('LiveClasses');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  return (
    <SafeAreaViewContext style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Grupos de apoyo</Text>
        <Text style={styles.subtitle}>Comparte y lee en un espacio seguro</Text>
        
        <PostCard
          authorInitials="AM"
          authorName="Ana M."
          timeAgo="hace 2 h"
          content="Compartir aquí me ayudó a sentir que no estaba sola. Gracias por leerme."
          likes={24}
          comments={8}
          backgroundColor="#FBEAF0"
          initialsColor="#F4C0D1"
        />
        
        <PostCard
          authorInitials="LR"
          authorName="Lucía R."
          timeAgo="hace 5 h"
          content="Hoy terminé el módulo de defensa personal y me siento más fuerte. 💪"
          likes={41}
          comments={12}
          backgroundColor="#E1F5EE"
          initialsColor="#85B7EB"
        />
        
        <PostCard
          authorInitials="SC"
          authorName="Sofía C."
          timeAgo="hace 1 d"
          content="¿Alguien quiere comentar el último video de la psicóloga Isabel?"
          likes={12}
          comments={5}
          backgroundColor="#FAEEDA"
          initialsColor="#C0DD97"
        />
        <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Escribe un comentario..."
    placeholderTextColor={colors.textMuted}
    multiline
  />
  <TouchableOpacity style={styles.sendButton}>
    <IconSend size={20} color="white" strokeWidth={2} />
  </TouchableOpacity>
</View>
      </ScrollView>
      
      
      
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
      <ChatbotFAB onPress={() => {}} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background , paddingBottom: 0 ,paddingTop: 30},
  container: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 12, color: colors.textMuted, marginBottom: 35 },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 14,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.tealDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
  flexDirection: 'row',
  gap: 10,
  marginTop: 20,
  alignItems: 'flex-end',
},
input: {
  flex: 1,
  backgroundColor: colors.white,
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 10,
  fontSize: 14,
  color: colors.textPrimary,
  borderWidth: 0.5,
  borderColor: colors.border,
  maxHeight: 100,
},
sendButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.tealDark,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 2,
},
});