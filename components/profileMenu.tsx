import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import * as Location from "expo-location"
import { useAuthStore } from "@/store/authStore";
import LogOut from './Logout';


type IoniconsName =
  | 'mail-outline'
  | 'home-outline'
  | 'phone-portrait-outline'
  | 'location-outline';

interface MenuItem {
  id: number;
  title: string;
  subtitle: string|null;
  icon: IoniconsName;
  
}

interface activeProps {
  isVisible: boolean,
  setIsVisible:(value:boolean)=> void
}
const ProfileMenu = ({isVisible,setIsVisible}:activeProps) => {

    const { user } = useAuthStore() as any
      const [street, setStreet] = useState<string | null>(null);
      const [region, setRegion] = useState<string | null>(null);
      const [locationError, setLocationError] = useState<string | null>(null);
    
      useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setLocationError('Permission denied');
            return;
          }
    
          let loc = await Location.getCurrentPositionAsync({});
          let geo = await Location.reverseGeocodeAsync(loc.coords);
          if (geo.length > 0 && geo[0].isoCountryCode) {
            setStreet(geo[0].street);
            setRegion(geo[0].region)
            
          }
        })();
      }, []);
  

  const menuItems:MenuItem[] = [
    {
      id: 1,
      title: 'My Mail',
      subtitle: user?.email,
      icon: 'mail-outline',
      
    },
    {
      id: 2,
      title: 'Contact',
      subtitle: user?.phone,
      icon: 'phone-portrait-outline',
    },
    {
      id: 3,
      title: 'Home Address',
      subtitle: street,
      icon: 'home-outline',
    },
    {
      id: 4,
      title: 'State / Province',
      subtitle: region,
      icon: 'location-outline',
    },
  ];

 

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color="#6e7c99" />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          <View style={styles.rightContainer}>
            
          </View>
        </TouchableOpacity>
      ))}

      <LogOut isVisible={isVisible} setIsVisible={setIsVisible}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f2f8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#8e8e93',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProfileMenu;