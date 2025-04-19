import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NoInternetScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MaterialCommunityIcons
        name="wifi-off"
        size={100}
        color={colors.text}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: colors.text }]}>
        Moons come in dark, but so do stars. You are currently offline. Please check your internet connection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});


export default NoInternetScreen;

