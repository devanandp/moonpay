import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CryptoItem from './CryptoItem';
import { CryptoData } from '../types';

interface CryptoListProps {
  availableCryptos: CryptoData[];
  watchlistIds: string[];
  onAddToWatchlist: (id: string) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ 
  availableCryptos, 
  watchlistIds,
  onAddToWatchlist 
}) => {
  // Filter out cryptos that are already in the watchlist
  const filteredCryptos = availableCryptos.filter(
    crypto => !watchlistIds.includes(crypto.id)
  );

  if (filteredCryptos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Available Cryptocurrencies</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>All cryptocurrencies are in your watchlist</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Cryptocurrencies</Text>
      <FlatList
        data={filteredCryptos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CryptoItem
            id={item.id}
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            onAction={() => onAddToWatchlist(item.id)}
            actionLabel="Add to Watchlist"
            actionColor="#00B07B"
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    backgroundColor: '#2C2C2C',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  emptyText: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
  },
});

export default CryptoList;

