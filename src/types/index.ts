/**
 * Core Type Definitions for QRStudio
 * Comprehensive TypeScript types for offline-first QR & Barcode generator
 */

export type CodeType =
  | 'QR'
  | 'EAN13'
  | 'EAN8'
  | 'UPC'
  | 'CODE128'
  | 'CODE39'
  | 'ITF14'
  | 'MSI'
  | 'PHARMACODE';

export type CodeFormat = 'png' | 'svg' | 'pdf';

export interface QRCode {
  id: string;
  type: CodeType;
  data: string;
  title?: string;
  color: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  logo?: string;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
  folder?: string;
  isFavorite: boolean;
  usageCount: number;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: number;
  itemCount: number;
}

export interface ExportOptions {
  format: CodeFormat;
  size?: number;
  quality?: number;
  includeMetadata?: boolean;
  backgroundColor?: string;
}

export interface BatchExportOptions extends ExportOptions {
  codes: string[];
  layout: 'grid' | 'list' | 'sheet';
  columns?: number;
  spacing?: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  defaultCodeType: CodeType;
  defaultSize: number;
  defaultColor: string;
  autoSave: boolean;
  hapticFeedback: boolean;
  soundEffects: boolean;
  analyticsEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface IAPProduct {
  productId: string;
  title: string;
  description: string;
  price: string;
  localizedPrice: string;
  currency: string;
  type: 'consumable' | 'non-consumable' | 'subscription';
}

export interface Purchase {
  productId: string;
  transactionId: string;
  transactionDate: number;
  isActive: boolean;
}

// Component Props Types
export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: number;
}

// Animation Types
export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}

export interface TimingConfig {
  duration: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Editor: {codeId?: string; type?: CodeType};
  Library: {folder?: string};
  Export: {codeIds: string[]};
  Settings: undefined;
  Scanner: undefined;
  Premium: undefined;
};

// Database Types
export interface DatabaseSchema {
  codes: QRCode;
  folders: Folder;
  settings: AppSettings;
  purchases: Purchase;
}

// Service Response Types
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

// Accessibility Types
export type AccessibilityRole =
  | 'button'
  | 'header'
  | 'link'
  | 'image'
  | 'text'
  | 'search'
  | 'switch'
  | 'checkbox';

export interface AccessibilityProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
}

// Gesture Types
export type GestureType =
  | 'tap'
  | 'doubleTap'
  | 'longPress'
  | 'pan'
  | 'pinch'
  | 'fling'
  | 'drag'
  | 'scroll'
  | 'hover'
  | 'pressAndHold'
  | 'edgeSwipe';

export interface GestureConfig {
  type: GestureType;
  enabled?: boolean;
  minPointers?: number;
  maxPointers?: number;
}
