import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { IconHome, IconBook, IconMessageCircle, IconBroadcast, IconCalendar, IconUser } from 'tabler-icons-react-native';
import colors from '../theme/colors';

interface BottomTabBarProps {
  activeTab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile';
  onTabPress: (tab: 'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile') => void;
}

export default function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  const tabs: Array<'home' | 'courses' | 'social' | 'live' | 'calendar' | 'profile'> = ['home', 'courses', 'social', 'live', 'calendar', 'profile'];

  const getIcon = (tab: string) => {
    const iconProps = { size: 27, color: activeTab === tab ? colors.tealDark : colors.textMuted, strokeWidth: 1.5 };
    switch (tab) {
      case 'home':
        return <IconHome {...iconProps} />;
      case 'courses':
        return <IconBook {...iconProps} />;
      case 'social':
        return <IconMessageCircle {...iconProps} />;
      case 'live':
        return <IconBroadcast {...iconProps} />;
      case 'calendar':
        return <IconCalendar {...iconProps} />;
      case 'profile':
        return <IconUser {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={styles.tab}
          onPress={() => onTabPress(tab)}
          activeOpacity={0.7}
        >
          {getIcon(tab)}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 115,
    backgroundColor: colors.white,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});