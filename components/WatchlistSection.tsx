import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CryptoItem from './CryptoItem';
import {CryptoData} from '../types';

interface WatchlistSectionProps {
  watchlist: CryptoData[];
  onRemove: (id: string) => void;
}

const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  watchlist,
  onRemove,
}) => {
  if (watchlist.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Watchlist</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No cryptocurrencies added to watchlist
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <FlatList
        data={watchlist}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CryptoItem
            id={item.id}
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            onAction={() => onRemove(item.id)}
            actionLabel="Remove"
            actionColor="#FF453A"
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 8,
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

export default WatchlistSection;
