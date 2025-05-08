import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../constants/constants';
import NewVideos from './new';
import OldVideos from './old';
import AllVideos from './all';

const TopTabs = createMaterialTopTabNavigator();

export default function VideosLayout() {
  const insets = useSafeAreaInsets();
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          paddingTop: insets.top,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
          
        },
   
        tabBarContentContainerStyle: {
          paddingHorizontal: 3,
        },
        tabBarIndicatorStyle: { 
          backgroundColor: COLORS.primary,
         },
      }}>
      <TopTabs.Screen name="new" component={NewVideos} options={{ title: 'New' }} />
      <TopTabs.Screen name="old" component={OldVideos} options={{ title: 'Old' }} />
      <TopTabs.Screen name="all" component={AllVideos} options={{ title: 'All' }} />
    </TopTabs.Navigator>
  );
}