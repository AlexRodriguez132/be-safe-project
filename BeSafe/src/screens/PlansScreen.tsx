import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconArrowLeft, IconCheck } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'Plans'>;

export default function PlansScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('profile');
  const [selectedPlan, setSelectedPlan] = useState('premium');

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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconArrowLeft size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Elige tu plan</Text>
        </View>

        <Text style={styles.subtitle}>Apoya nuestra misión y desbloquea todo el contenido.</Text>

        {/* Basic plan */}
        <TouchableOpacity
          style={[styles.planCard, selectedPlan === 'basic' && styles.planCardSelected]}
          onPress={() => setSelectedPlan('basic')}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Básico</Text>
            <Text style={styles.planPrice}>Gratis</Text>
          </View>
          <Text style={styles.planDescription}>Cursos básicos · Chatbot</Text>
        </TouchableOpacity>

        {/* Premium plan */}
        <View style={styles.premiumContainer}>
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>RECOMENDADO</Text>
          </View>
          <TouchableOpacity
            style={[styles.planCard, styles.planCardPremium, selectedPlan === 'premium' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('premium')}
          >
            <View style={styles.planHeader}>
              <Text style={[styles.planName, styles.premiumText]}>Premium</Text>
              <Text style={[styles.planPrice, styles.premiumText]}>$149/mes</Text>
            </View>
            <Text style={styles.premiumSubtitle}>Todo lo del Básico, más:</Text>
            
            <View style={styles.featureList}>
              <View style={styles.feature}>
                <IconCheck size={16} color={colors.tealDark} strokeWidth={2} />
                <Text style={styles.featureText}>Cursos intermedios y avanzados</Text>
              </View>
              <View style={styles.feature}>
                <IconCheck size={16} color={colors.tealDark} strokeWidth={2} />
                <Text style={styles.featureText}>2 asesorías al mes</Text>
              </View>
              <View style={styles.feature}>
                <IconCheck size={16} color={colors.tealDark} strokeWidth={2} />
                <Text style={styles.featureText}>Clases en vivo</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Scholarship plan */}
        <TouchableOpacity
          style={[styles.planCard, selectedPlan === 'scholarship' && styles.planCardSelected]}
          onPress={() => setSelectedPlan('scholarship')}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Beca</Text>
            <Text style={styles.planPrice}>Postular</Text>
          </View>
          <Text style={styles.planDescription}>Para quienes lo necesitan, gracias a patrocinadores</Text>
        </TouchableOpacity>

        {/* Continue button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (selectedPlan === 'premium') {
              navigation.navigate('PaymentConfirmation');
            }
          }}
        >
          <Text style={styles.buttonText}>Continuar con {selectedPlan === 'premium' ? 'Premium' : selectedPlan === 'basic' ? 'Básico' : 'Beca'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  subtitle: { fontSize: 12, color: colors.textMuted, marginBottom: 20, lineHeight: 18 },
  planCard: { backgroundColor: colors.white, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 0.5, borderColor: colors.border },
  planCardSelected: { borderWidth: 2, borderColor: colors.tealDark },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  planName: { fontSize: 12, fontWeight: '600', color: colors.textPrimary },
  planPrice: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  planDescription: { fontSize: 10, color: colors.textMuted },
  premiumContainer: { position: 'relative', marginBottom: 12 },
  recommendedBadge: { position: 'absolute', top: -12, right: 12, backgroundColor: colors.tealDark, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, zIndex: 1 },
  recommendedText: { fontSize: 8, color: 'white', fontWeight: '600', letterSpacing: 0.5 },
  planCardPremium: { backgroundColor: colors.tealLight, borderColor: colors.tealDark, borderWidth: 2, marginTop: 8 },
  premiumText: { color: colors.tealDark },
  premiumSubtitle: { fontSize: 10, color: colors.tealDark, fontWeight: '500', marginBottom: 10 },
  featureList: { gap: 8 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 10, color: colors.tealDark, fontWeight: '500' },
  button: { width: '100%', backgroundColor: colors.textPrimary, paddingVertical: 14, borderRadius: 24, alignItems: 'center', marginTop: 20 },
  buttonText: { fontSize: 13, fontWeight: '600', color: 'white' },
});