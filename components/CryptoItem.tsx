import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CryptoItemProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  onAction: () => void;
  actionLabel: string;
  actionColor?: string;
}

const CryptoItem: React.FC<CryptoItemProps> = ({
  name,
  symbol,
  price,
  onAction,
  actionLabel,
  actionColor = actionLabel === 'Add to Watchlist' ? '#00B07B' : '#FF453A',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.price}>${price.toLocaleString()}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: actionColor }]} 
        onPress={onAction}
      >
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  symbol: {
    fontSize: 16,
    color: '#B0B0B0',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E0E0',
    marginTop: 6,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CryptoItem;

