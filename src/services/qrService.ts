/**
 * QR Service - QR & Barcode generation engine
 * Handles all code generation operations offline
 */

import {CodeType, QRCode, ServiceResponse} from '@/types';

export class QRService {
  /**
   * Generate QR code data URI
   */
  async generateQRCode(
    data: string,
    options: {
      size?: number;
      color?: string;
      backgroundColor?: string;
      errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
      logo?: string;
    } = {},
  ): Promise<ServiceResponse<string>> {
    try {
      const {
        size = 256,
        color = '#000000',
        backgroundColor = '#FFFFFF',
        errorCorrectionLevel = 'M',
        logo,
      } = options;

      // QR code generation will use react-native-qrcode-svg
      // This is a placeholder for the actual implementation
      return {
        success: true,
        data: `qr://${data}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Generate barcode data URI
   */
  async generateBarcode(
    data: string,
    type: Exclude<CodeType, 'QR'>,
    options: {
      width?: number;
      height?: number;
      color?: string;
      backgroundColor?: string;
    } = {},
  ): Promise<ServiceResponse<string>> {
    try {
      const {width = 2, height = 100, color = '#000000', backgroundColor = '#FFFFFF'} = options;

      // Barcode generation will use react-native-barcode-builder
      return {
        success: true,
        data: `barcode://${type}/${data}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Validate code data based on type
   */
  validateCodeData(data: string, type: CodeType): ServiceResponse<boolean> {
    try {
      switch (type) {
        case 'QR':
          // QR codes can contain any data up to ~4296 characters
          return {success: true, data: data.length <= 4296};

        case 'EAN13':
          // EAN-13 must be exactly 13 digits
          return {success: true, data: /^\d{13}$/.test(data)};

        case 'EAN8':
          // EAN-8 must be exactly 8 digits
          return {success: true, data: /^\d{8}$/.test(data)};

        case 'UPC':
          // UPC must be exactly 12 digits
          return {success: true, data: /^\d{12}$/.test(data)};

        case 'CODE128':
          // CODE128 can contain ASCII 0-127
          return {success: true, data: /^[\x00-\x7F]+$/.test(data)};

        case 'CODE39':
          // CODE39 supports A-Z, 0-9, and some special characters
          return {success: true, data: /^[A-Z0-9\-. $/+%]+$/.test(data)};

        case 'ITF14':
          // ITF-14 must be exactly 14 digits
          return {success: true, data: /^\d{14}$/.test(data)};

        case 'MSI':
          // MSI can contain only digits
          return {success: true, data: /^\d+$/.test(data)};

        case 'PHARMACODE':
          // Pharmacode must be a number between 3 and 131070
          const num = parseInt(data, 10);
          return {success: true, data: num >= 3 && num <= 131070};

        default:
          return {success: false, error: new Error('Unknown code type')};
      }
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Get maximum data length for code type
   */
  getMaxDataLength(type: CodeType): number {
    const limits: Record<CodeType, number> = {
      QR: 4296,
      EAN13: 13,
      EAN8: 8,
      UPC: 12,
      CODE128: 1000,
      CODE39: 100,
      ITF14: 14,
      MSI: 50,
      PHARMACODE: 6,
    };
    return limits[type] || 100;
  }

  /**
   * Get code type display name
   */
  getCodeTypeName(type: CodeType): string {
    const names: Record<CodeType, string> = {
      QR: 'QR Code',
      EAN13: 'EAN-13',
      EAN8: 'EAN-8',
      UPC: 'UPC',
      CODE128: 'Code 128',
      CODE39: 'Code 39',
      ITF14: 'ITF-14',
      MSI: 'MSI',
      PHARMACODE: 'Pharmacode',
    };
    return names[type] || type;
  }

  /**
   * Get suggested code type based on data
   */
  suggestCodeType(data: string): CodeType {
    // If data is numeric and matches specific lengths, suggest barcode
    if (/^\d+$/.test(data)) {
      if (data.length === 13) return 'EAN13';
      if (data.length === 8) return 'EAN8';
      if (data.length === 12) return 'UPC';
      if (data.length === 14) return 'ITF14';
    }

    // Default to QR code for flexibility
    return 'QR';
  }
}

export const qrService = new QRService();
