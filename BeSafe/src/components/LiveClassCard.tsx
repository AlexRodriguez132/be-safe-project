import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';

interface LiveClassCardProps {
  title: string;
  instructor: string;
  attendees: number;
  onPress?: () => void;
}

export default function LiveClassCard({
  title,
  instructor,
  attendees,
  onPress,
}: LiveClassCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.liveBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>EN VIVO</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <Text style={styles.info}>{instructor} · {attendees} asistiendo</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Unirme ahora</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 14,
    backgroundColor: colors.teal,
  },

  liveBadge: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  gap: 6, 
  backgroundColor: 'rgba(255,255,255,0.25)', 
  paddingHorizontal: 10, 
  paddingVertical: 4, 
  borderRadius: 12, 
  alignSelf: 'flex-start',
  marginBottom: 10,
},


  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'white' },
  liveText: { fontSize: 10, fontWeight: '600', color: 'white', letterSpacing: 0.5 },
  title: { fontSize: 16, fontWeight: '700', color: 'white', marginBottom: 6 },
  info: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 12 },
  button: { backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center' },
  buttonText: { fontSize: 13, fontWeight: '600', color: colors.teal },
});