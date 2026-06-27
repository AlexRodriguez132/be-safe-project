import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function ShieldIcon() {
  return (
    <View style={styles.shieldContainer}>
      <Text style={styles.heartText}>♥</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shieldContainer: {
    width: 150,
    height: 150,
    borderRadius: 72,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  heartText: {
    fontSize: 70,
    color: 'white',
  },
});