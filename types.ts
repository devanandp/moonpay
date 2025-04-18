// Define the data structure for cryptocurrency items
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  isInWatchlist?: boolean;
}

