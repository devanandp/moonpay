import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Define the navigation props type for the component
type ProfileScreenNavigationProp = BottomTabNavigationProp<any, 'Profile'>;

// Define component props
interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

// Mock user data
const userData = {
  name: 'Devanand Padmanaban',
  email: 'deva051195@gmail.com',
  walletBalance: 25463.89,
  profileImage: null, // In a real app, this would be a path to an image
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <ScrollView>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {userData.profileImage ? (
              <Image 
                source={{ uri: userData.profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profileInitials}>
                <Text style={styles.initialsText}>
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <Text style={styles.balanceAmount}>${userData.walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>
        
        {/* Actions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="account-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Personal Information</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="wallet-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Payment Methods</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="history" size={24} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Transaction History</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        
        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Notifications</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="shield-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Security</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        
        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInitials: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 16,
  },
  balanceContainer: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    width: '80%',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B07B',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  signOutButton: {
    marginVertical: 24,
    marginHorizontal: 16,
    backgroundColor: '#FF453A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

