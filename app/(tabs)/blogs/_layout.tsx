import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../constants/constants';
import Evil from './evil';
import History from './history';
import Science from './science';
import Textual from './textual';


const TopTabs = createMaterialTopTabNavigator();

export default function VideosLayout() {
  const insets = useSafeAreaInsets();
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          paddingTop: insets.top,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
          elevation: 2, 
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          
        },
        tabBarItemStyle: {
            minWidth: 100,
            paddingHorizontal: 8,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
            fontFamily:'mySecondFont',
            textTransform: 'capitalize',
          },
   
        tabBarContentContainerStyle: {
          paddingHorizontal: 10,
        },
        tabBarIndicatorStyle: { 
          backgroundColor: COLORS.primary,
         },
      }}>
      <TopTabs.Screen name="evil" component={Evil} options={{ title: 'philosophical' }} />
      <TopTabs.Screen name="history" component={History} options={{ title: 'historical evidences' }} />
      <TopTabs.Screen name="science" component={Science} options={{ title: 'science and faith' }} />
      <TopTabs.Screen name="textual" component={Textual} options={{ title: 'textual criticism' }} />
    </TopTabs.Navigator>
  );
}

