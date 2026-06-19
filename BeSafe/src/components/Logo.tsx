import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BE SAFE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.primary,
  },
});
