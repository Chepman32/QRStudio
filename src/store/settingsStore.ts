/**
 * Settings Store - App configuration and preferences
 */

import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {AppSettings, CodeType} from '@/types';
import {Appearance} from 'react-native';

interface SettingsState {
  settings: AppSettings;
  isPro: boolean;
}

interface SettingsActions {
  updateSettings: (updates: Partial<AppSettings>) => void;
  toggleTheme: () => void;
  setDefaultCodeType: (type: CodeType) => void;
  setPro: (isPro: boolean) => void;
  resetSettings: () => void;
  getEffectiveTheme: () => 'light' | 'dark';
}

type SettingsStore = SettingsState & SettingsActions;

const defaultSettings: AppSettings = {
  theme: 'auto',
  defaultCodeType: 'QR',
  defaultSize: 256,
  defaultColor: '#000000',
  autoSave: true,
  hapticFeedback: true,
  soundEffects: false,
  analyticsEnabled: false,
  notificationsEnabled: false,
};

export const useSettingsStore = create<SettingsStore>()(
  immer((set, get) => ({
    // State
    settings: defaultSettings,
    isPro: false,

    // Actions
    updateSettings: updates => {
      set(state => {
        state.settings = {...state.settings, ...updates};
      });
    },

    toggleTheme: () => {
      set(state => {
        const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(state.settings.theme);
        state.settings.theme = themes[(currentIndex + 1) % themes.length];
      });
    },

    setDefaultCodeType: type => {
      set(state => {
        state.settings.defaultCodeType = type;
      });
    },

    setPro: isPro => {
      set(state => {
        state.isPro = isPro;
      });
    },

    resetSettings: () => {
      set(state => {
        state.settings = defaultSettings;
      });
    },

    getEffectiveTheme: () => {
      const {settings} = get();
      if (settings.theme === 'auto') {
        return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
      }
      return settings.theme;
    },
  })),
);
