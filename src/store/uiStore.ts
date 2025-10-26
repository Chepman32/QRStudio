/**
 * UI Store - Manages UI state and interactions
 */

import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface UIState {
  isLoading: boolean;
  loadingMessage: string;
  toast: {
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration: number;
  };
  modal: {
    visible: boolean;
    type: 'delete' | 'export' | 'premium' | null;
    data: any;
  };
  bottomSheet: {
    visible: boolean;
    content: 'colorPicker' | 'typePicker' | 'sort' | 'filter' | null;
    data: any;
  };
}

interface UIActions {
  setLoading: (isLoading: boolean, message?: string) => void;
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning',
    duration?: number,
  ) => void;
  hideToast: () => void;
  showModal: (type: 'delete' | 'export' | 'premium', data?: any) => void;
  hideModal: () => void;
  showBottomSheet: (
    content: 'colorPicker' | 'typePicker' | 'sort' | 'filter',
    data?: any,
  ) => void;
  hideBottomSheet: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  immer((set, get) => ({
    // State
    isLoading: false,
    loadingMessage: '',
    toast: {
      visible: false,
      message: '',
      type: 'info',
      duration: 3000,
    },
    modal: {
      visible: false,
      type: null,
      data: null,
    },
    bottomSheet: {
      visible: false,
      content: null,
      data: null,
    },

    // Actions
    setLoading: (isLoading, message = '') => {
      set(state => {
        state.isLoading = isLoading;
        state.loadingMessage = message;
      });
    },

    showToast: (message, type = 'info', duration = 3000) => {
      set(state => {
        state.toast = {visible: true, message, type, duration};
      });
      setTimeout(() => {
        get().hideToast();
      }, duration);
    },

    hideToast: () => {
      set(state => {
        state.toast.visible = false;
      });
    },

    showModal: (type, data = null) => {
      set(state => {
        state.modal = {visible: true, type, data};
      });
    },

    hideModal: () => {
      set(state => {
        state.modal = {visible: false, type: null, data: null};
      });
    },

    showBottomSheet: (content, data = null) => {
      set(state => {
        state.bottomSheet = {visible: true, content, data};
      });
    },

    hideBottomSheet: () => {
      set(state => {
        state.bottomSheet = {visible: false, content: null, data: null};
      });
    },
  })),
);
