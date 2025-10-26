/**
 * App Root Component
 * Production-ready QRStudio application
 */

import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootNavigator} from './navigation/RootNavigator';
import {ErrorBoundary} from './utils/errorBoundary';
import {iapService, notificationService} from './services';

// Suppress known warnings in development
if (__DEV__) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
}

const App: React.FC = () => {
  useEffect(() => {
    // Initialize services
    const initializeApp = async () => {
      try {
        // Initialize IAP
        await iapService.initialize();

        // Initialize notifications
        notificationService.initialize();
        await notificationService.requestPermissions();
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    initializeApp();

    // Cleanup on unmount
    return () => {
      iapService.cleanup();
    };
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <RootNavigator />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default App;
