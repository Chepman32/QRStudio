/**
 * useTheme Hook - Access current theme
 */

import {useSettingsStore} from '@/store';
import {lightTheme, darkTheme, Theme} from '@/theme';

export const useTheme = (): Theme => {
  const {getEffectiveTheme} = useSettingsStore();
  const themeMode = getEffectiveTheme();
  return themeMode === 'dark' ? darkTheme : lightTheme;
};
