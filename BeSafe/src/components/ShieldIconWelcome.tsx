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
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
    marginBottom: 9,
  },
  heartText: {
    fontSize: 50,
    color: 'white',
  },
});
