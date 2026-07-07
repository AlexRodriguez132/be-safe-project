import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { IconPencil, IconChevronRight, IconLogout, IconMail, IconPhone, IconLock, IconMoon, IconBell, IconMapPin, IconShield, IconInfoCircle } from 'tabler-icons-react-native';
import BottomTabBar from '../components/ BottomTabBar';
import ChatbotFAB from '../components/ChatbotFAB';
import colors from '../theme/colors';
import { ScreenProps } from '../types/navigation';

type Props = ScreenProps<'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'>('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

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
        <Text style={styles.pageTitle}>Mi perfil</Text>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: colors.teal }]}>
              <Text style={styles.avatarText}>KP</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Karina Peña</Text>
              <Text style={styles.location}>Cuernavaca · 23 años</Text>
            </View>
            <TouchableOpacity>
              <IconPencil size={20} color={colors.textMuted} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          <View style={styles.planBadge}>
            <Text style={styles.planText}>Plan Premium</Text>
          </View>
        </View>

        {/* General data */}
        <Text style={styles.sectionTitle}>Datos generales</Text>
        
        <View style={styles.dataItem}>
          <IconMail size={18} color={colors.textMuted} strokeWidth={1.5} />
          <View style={styles.dataContent}>
            <Text style={styles.dataLabel}>Correo</Text>
            <Text style={styles.dataValue}>karina@correo.com</Text>
          </View>
          <IconChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
        </View>

        <View style={styles.dataItem}>
          <IconPhone size={18} color={colors.textMuted} strokeWidth={1.5} />
          <View style={styles.dataContent}>
            <Text style={styles.dataLabel}>Teléfono</Text>
            <Text style={styles.dataValue}>+52 777 000 0000</Text>
          </View>
          <IconChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
        </View>

        <View style={styles.dataItem}>
          <IconLock size={18} color={colors.textMuted} strokeWidth={1.5} />
          <View style={styles.dataContent}>
            <Text style={styles.dataLabel}>Contraseña</Text>
            <Text style={styles.dataValue}>••••••••</Text>
          </View>
          <IconChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
        </View>

        {/* Subscription */}
        <Text style={styles.sectionTitle}>Mi suscripción</Text>
        <View style={styles.subscriptionCard}>
          <View>
            <Text style={styles.subscriptionPlan}>Plan Premium · $149/mes</Text>
            <Text style={styles.subscriptionDate}>Próximo cargo 19 jun, 2026 · Folio #BS-04827</Text>
          </View>
          <View style={styles.subscriptionButtons}>
            <TouchableOpacity 
            style={styles.managePlanButton}
            onPress={() => navigation.navigate('Plans')}
            >
              <Text style={styles.managePlanText}>Gestionar plan</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferencias</Text>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <IconMoon size={18} color={colors.textMuted} strokeWidth={1.5} />
            <Text style={styles.preferenceName}>Modo oscuro</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: colors.border, true: colors.teal }}
            thumbColor={darkMode ? colors.tealDark : colors.white}
          />
        </View>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <IconBell size={18} color={colors.textMuted} strokeWidth={1.5} />
            <Text style={styles.preferenceName}>Notificaciones</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.border, true: colors.teal }}
            thumbColor={notifications ? colors.tealDark : colors.white}
          />
        </View>

        <View style={styles.dataItem}>
          <IconMapPin size={18} color={colors.textMuted} strokeWidth={1.5} />
          <View style={styles.dataContent}>
            <Text style={styles.dataLabel}>Ciudad</Text>
            <Text style={styles.dataValue}>Cuernavaca</Text>
          </View>
          <IconChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>Acerca de</Text>
        
        <View style={styles.dataItem}>
          <IconShield size={18} color={colors.textMuted} strokeWidth={1.5} />
          <View style={styles.dataContent}>
            <Text style={styles.dataLabel}>Aviso de privacidad</Text>
          </View>
          <IconChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
        </View>

        <View style={styles.dataItem}>
          <IconInfoCircle size={18} color={colors.textMuted} strokeWidth={1.5} />
          <View style={styles.dataContent}>
            <Text style={styles.dataLabel}>Versión de la app</Text>
            <Text style={styles.dataValue}>1.0.0</Text>
          </View>
        </View>

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton}>
          <IconLogout size={18} color="#993556" strokeWidth={2} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <ChatbotFAB onPress={() => {}} />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background ,paddingTop: 30 },
  container: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  profileCard: { backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 20, borderWidth: 0.5, borderColor: colors.border },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '600', color: 'white' },
  profileInfo: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  location: { fontSize: 11, color: colors.textMuted },
  planBadge: { backgroundColor: colors.tealLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  planText: { fontSize: 10, color: colors.tealDark, fontWeight: '600' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 12, marginTop: 16 },
  dataItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 0.5, borderColor: colors.border },
  dataContent: { flex: 1 },
  dataLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 2 },
  dataValue: { fontSize: 12, color: colors.textPrimary, fontWeight: '500' },
  subscriptionCard: { backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: colors.teal },
  subscriptionPlan: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  subscriptionDate: { fontSize: 10, color: colors.textMuted, marginBottom: 12 },
  subscriptionButtons: { flexDirection: 'row', gap: 8 },
  managePlanButton: { backgroundColor: colors.tealDark, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 16, flex: 1 },
  managePlanText: { fontSize: 11, fontWeight: '600', color: 'white', textAlign: 'center' },
  cancelText: { fontSize: 11, color: colors.textMuted, paddingVertical: 8 },
  preferenceItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 0.5, borderColor: colors.border },
  preferenceLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  preferenceName: { fontSize: 12, color: colors.textPrimary, fontWeight: '500' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FBEAF0', borderRadius: 12, paddingVertical: 14, marginTop: 20, marginBottom: 20 },
  logoutText: { fontSize: 13, fontWeight: '600', color: '#993556' },
});