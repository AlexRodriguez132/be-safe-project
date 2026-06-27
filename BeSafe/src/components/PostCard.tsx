import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconHeart, IconMessageCircle } from 'tabler-icons-react-native';
import colors from '../theme/colors';

interface PostCardProps {
  authorInitials: string;
  authorName: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  backgroundColor: string;
  initialsColor: string;
}

export default function PostCard({
  authorInitials,
  authorName,
  timeAgo,
  content,
  likes,
  comments,
  backgroundColor,
  initialsColor,
}: PostCardProps) {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: initialsColor }]}>
          <Text style={styles.initials}>{authorInitials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{authorName}</Text>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      </View>
      
      <Text style={styles.content}>{content}</Text>
      
      <View style={styles.footer}>
        <View style={styles.stat}>
          <IconHeart size={14} color={colors.textMuted} strokeWidth={2} />
          <Text style={styles.statText}>{likes}</Text>
        </View>
        <View style={styles.stat}>
          <IconMessageCircle size={14} color={colors.textMuted} strokeWidth={2} />
          <Text style={styles.statText}>{comments}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 14, marginBottom: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 12, fontWeight: '600', color: 'white' },
  info: { flex: 1 },
  name: { fontSize: 12, fontWeight: '600', color: colors.textPrimary },
  time: { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  content: { fontSize: 12, color: colors.textPrimary, lineHeight: 18, marginBottom: 10 },
  footer: { flexDirection: 'row', gap: 12 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 11, color: colors.textMuted },
});