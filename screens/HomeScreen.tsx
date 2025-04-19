import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CryptoItem from '../components/CryptoItem';
import {CryptoData} from '../types';

// Sample cryptocurrency data
const sampleCryptoData: CryptoData[] = [
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

type FilterType = 'all' | 'top' | 'gainers' | 'losers';

const HomeScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeAction, setActiveAction] = useState<'buy' | 'sell'>('buy');

  // Filter cryptos based on selected filter (just a simulation)
  const getFilteredCryptos = () => {
    switch (activeFilter) {
      case 'top':
        return sampleCryptoData.slice(0, 3); // Top 3 cryptos
      case 'gainers':
        return sampleCryptoData.filter((_, index) => index % 2 === 0); // Even indices as gainers
      case 'losers':
        return sampleCryptoData.filter((_, index) => index % 2 === 1); // Odd indices as losers
      default:
        return sampleCryptoData;
    }
  };

  const handleCryptoAction = (id: string) => {
    console.log(`${activeAction === 'buy' ? 'Buying' : 'Selling'} ${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Buy/Sell Toggle */}
      <View style={styles.actionToggle}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            activeAction === 'buy' && styles.activeActionButton,
          ]}
          onPress={() => setActiveAction('buy')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.actionButtonText,
                activeAction === 'buy' && styles.activeActionButtonText,
              ]}>
              Buy
            </Text>
            <Icon
              name="arrow-up"
              size={20}
              color={activeAction === 'buy' ? '#FFFFFF' : '#B0B0B0'}
              style={{marginLeft: 10}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            activeAction === 'sell' && styles.activeActionButton,
          ]}
          onPress={() => setActiveAction('sell')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.actionButtonText,
                activeAction === 'sell' && styles.activeActionButtonText,
              ]}>
              Sell
            </Text>
            <Icon
              name="arrow-down"
              size={20}
              color={activeAction === 'buy' ? '#FFFFFF' : '#B0B0B0'}
              style={{marginLeft: 10}}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'all' && styles.activeFilterButton,
          ]}
          onPress={() => setActiveFilter('all')}>
          <Text
            style={[
              styles.filterText,
              activeFilter === 'all' && styles.activeFilterText,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'top' && styles.activeFilterButton,
          ]}
          onPress={() => setActiveFilter('top')}>
          <Text
            style={[
              styles.filterText,
              activeFilter === 'top' && styles.activeFilterText,
            ]}>
            Top
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'gainers' && styles.activeFilterButton,
          ]}
          onPress={() => setActiveFilter('gainers')}>
          <Text
            style={[
              styles.filterText,
              activeFilter === 'gainers' && styles.activeFilterText,
            ]}>
            Gainers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'losers' && styles.activeFilterButton,
          ]}
          onPress={() => setActiveFilter('losers')}>
          <Text
            style={[
              styles.filterText,
              activeFilter === 'losers' && styles.activeFilterText,
            ]}>
            Losers
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Crypto List */}
      <FlatList
        data={getFilteredCryptos()}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CryptoItem
            id={item.id}
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            onAction={() => handleCryptoAction(item.id)}
            actionLabel={activeAction === 'buy' ? 'Buy' : 'Sell'}
            actionColor={activeAction === 'buy' ? '#00B07B' : '#FF453A'}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  actionToggle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#1E1E1E',
    marginHorizontal: 4, // Adds space between the buttons
  },
  activeActionButton: {
    backgroundColor: '#333333',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B0B0B0',
  },
  activeActionButtonText: {
    color: '#FFFFFF',
  },
  filtersContainer: {
    marginTop: 16,
  },
  filtersContent: {
    paddingHorizontal: 12,
  },
  filterButton: {
    height: 40, // Sets a fixed height
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  activeFilterButton: {
    backgroundColor: '#333333',
  },
  filterText: {
    color: '#B0B0B0',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingVertical: 16,
  },
});

export default HomeScreen;
