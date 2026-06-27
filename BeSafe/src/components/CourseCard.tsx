import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconPolaroid } from 'tabler-icons-react-native';
import colors from '../theme/colors';

interface CourseCardProps {
  title: string;
  description: string;
  instructor: string;
  progress: number;
  total: number;
  progressPercent: number;
  backgroundColor: string;
  iconColor: string;
  onPress?: () => void;
}

export default function CourseCard({
  title,
  description,
  instructor,
  progress,
  total,
  progressPercent,
  backgroundColor,
  iconColor,
  onPress,
}: CourseCardProps) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.imageContainer, { backgroundColor: iconColor }]}>
        <IconPolaroid size={40} color="white" strokeWidth={1.5} />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>{description}</Text>
      
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>{progress} / {total}</Text>
        <Text style={styles.percentText}>{progressPercent}%</Text>
      </View>
      
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: colors.tealDark }]} />
      </View>
      
      <View style={styles.instructorSection}>
        <View style={[styles.avatar, { backgroundColor: iconColor }]}>
          <Text style={styles.avatarText}>JR</Text>
        </View>
        <Text style={styles.instructorName}>{instructor}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 14, marginBottom: 12 },
  imageContainer: { width: '100%', height: 100, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  title: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  description: { fontSize: 11, color: colors.textMuted, lineHeight: 16, marginBottom: 10 },
  progressSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { fontSize: 11, color: colors.textMuted },
  percentText: { fontSize: 11, color: colors.tealDark, fontWeight: '600' },
  progressBar: { height: 4, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 2, marginBottom: 10, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  instructorSection: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 10, fontWeight: '600', color: 'white' },
  instructorName: { fontSize: 11, fontWeight: '500', color: colors.textPrimary },
});