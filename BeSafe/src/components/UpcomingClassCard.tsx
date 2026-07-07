import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';

interface UpcomingClassCardProps {
  day: number;
  month: string;
  title: string;
  time: string;
  instructor: string;
  onPress?: () => void;
}

export default function UpcomingClassCard({
  day,
  month,
  title,
  time,
  instructor,
  onPress,
}: UpcomingClassCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.dateSection}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{time} · {instructor}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  dateSection: { 
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 12,
    minWidth: 50,
  },
  month: { fontSize: 10, color: colors.textMuted, fontWeight: '500' },
  day: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, lineHeight: 20 },
  divider: { width: 0.5, height: 40, backgroundColor: colors.border, marginHorizontal: 12 },
  content: { flex: 1 },
  title: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  info: { fontSize: 11, color: colors.textMuted },
});