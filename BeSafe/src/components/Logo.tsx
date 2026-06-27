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
    paddingHorizontal: 24,
    paddingVertical: 13,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom:35,
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.primary,
  },
});
