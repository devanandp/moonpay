import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Alert,
  View,
  Text,
  ScrollView,
  FlatList
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import WatchlistSection from '../components/WatchlistSection';
import CryptoItem from '../components/CryptoItem';
import { CryptoData } from '../types';

// All available cryptocurrencies
const allCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67259.32,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3241.67,
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 138.72,
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    price: 0.52,
  },
];

// Initial watchlist data
const initialWatchlistData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67259.32,
    isInWatchlist: true,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3241.67,
    isInWatchlist: true,
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    isInWatchlist: true,
  },
];

// Define the navigation props type for the component
type WatchlistScreenNavigationProp = BottomTabNavigationProp<any, 'Watchlist'>;

// Define component props
interface WatchlistScreenProps {
  navigation: WatchlistScreenNavigationProp;
}

const WatchlistScreen: React.FC<WatchlistScreenProps> = ({ navigation }) => {
  // State to manage watchlist data
  const [watchlist, setWatchlist] = useState<CryptoData[]>(initialWatchlistData);
  // State to manage available cryptocurrencies (not in watchlist)
  const [availableCryptos, setAvailableCryptos] = useState<CryptoData[]>([]);

  // Update available cryptos whenever watchlist changes
  useEffect(() => {
    // Filter all crypto data to exclude ones already in watchlist
    const watchlistIds = watchlist.map(item => item.id);
    const available = allCryptoData.filter(crypto => !watchlistIds.includes(crypto.id));
    setAvailableCryptos(available);
  }, [watchlist]);

  // Function to remove a cryptocurrency from the watchlist
  const handleRemoveFromWatchlist = (id: string) => {
    // Show confirmation alert
    Alert.alert(
      'Remove from Watchlist',
      'Are you sure you want to remove this cryptocurrency from your watchlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            // Filter out the cryptocurrency with the specified id
            setWatchlist(prevWatchlist => prevWatchlist.filter(crypto => crypto.id !== id));
          },
          style: 'destructive',
        },
      ],
    );
  };

  // Function to add a cryptocurrency to the watchlist
  const handleAddToWatchlist = (id: string) => {
    // Find the crypto to add from available cryptos
    const cryptoToAdd = allCryptoData.find(crypto => crypto.id === id);
    
    if (cryptoToAdd) {
      // Add to watchlist with isInWatchlist flag
      setWatchlist(prevWatchlist => [
        ...prevWatchlist,
        { ...cryptoToAdd, isInWatchlist: true }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <ScrollView>
        {/* Watchlist Section */}
        <WatchlistSection 
          watchlist={watchlist} 
          onRemove={handleRemoveFromWatchlist} 
        />
        
        {/* Available Cryptocurrencies Section */}
        <View style={styles.availableSection}>
          <Text style={styles.sectionTitle}>Available Cryptocurrencies</Text>
          {availableCryptos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>All cryptocurrencies added to watchlist</Text>
            </View>
          ) : (
            <FlatList
              data={availableCryptos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CryptoItem
                  id={item.id}
                  name={item.name}
                  symbol={item.symbol}
                  price={item.price}
                  onAction={() => handleAddToWatchlist(item.id)}
                  actionLabel="Add"
                  actionColor="#00B07B"
                />
              )}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  availableSection: {
    marginBottom: 24,
  },
  sectionTitle: {
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

export default WatchlistScreen;

