/**
 * Root Navigator - Main navigation stack
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types';
import {colors} from '@/theme';

// Screens
import {HomeScreen} from '@/screens/HomeScreen';
import {EditorScreen} from '@/screens/EditorScreen';
import {LibraryScreen} from '@/screens/LibraryScreen';
import {ExportScreen} from '@/screens/ExportScreen';
import {SettingsScreen} from '@/screens/SettingsScreen';
import {ScannerScreen} from '@/screens/ScannerScreen';
import {PremiumScreen} from '@/screens/PremiumScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.light.background.default,
          },
          headerTintColor: colors.light.text.primary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerBackTitleVisible: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'QR Studio',
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="Editor"
          component={EditorScreen}
          options={{
            title: 'Editor',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            title: 'Library',
          }}
        />
        <Stack.Screen
          name="Export"
          component={ExportScreen}
          options={{
            title: 'Export',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            title: 'Scanner',
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="Premium"
          component={PremiumScreen}
          options={{
            title: 'Premium',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
