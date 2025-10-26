/**
 * QR Service Tests
 */

import {qrService} from '@/services/qrService';
import {CodeType} from '@/types';

describe('QRService', () => {
  describe('validateCodeData', () => {
    it('should validate QR code data correctly', () => {
      const result = qrService.validateCodeData('https://example.com', 'QR');
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it('should reject QR code data that is too long', () => {
      const longData = 'a'.repeat(5000);
      const result = qrService.validateCodeData(longData, 'QR');
      expect(result.success).toBe(true);
      expect(result.data).toBe(false);
    });

    it('should validate EAN13 correctly', () => {
      const result = qrService.validateCodeData('1234567890123', 'EAN13');
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it('should reject invalid EAN13', () => {
      const result = qrService.validateCodeData('123', 'EAN13');
      expect(result.success).toBe(true);
      expect(result.data).toBe(false);
    });

    it('should validate UPC correctly', () => {
      const result = qrService.validateCodeData('123456789012', 'UPC');
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it('should validate CODE128 correctly', () => {
      const result = qrService.validateCodeData('ABC123', 'CODE128');
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });
  });

  describe('getMaxDataLength', () => {
    it('should return correct max length for QR', () => {
      expect(qrService.getMaxDataLength('QR')).toBe(4296);
    });

    it('should return correct max length for EAN13', () => {
      expect(qrService.getMaxDataLength('EAN13')).toBe(13);
    });
  });

  describe('suggestCodeType', () => {
    it('should suggest EAN13 for 13-digit numbers', () => {
      expect(qrService.suggestCodeType('1234567890123')).toBe('EAN13');
    });

    it('should suggest UPC for 12-digit numbers', () => {
      expect(qrService.suggestCodeType('123456789012')).toBe('UPC');
    });

    it('should suggest QR for URLs', () => {
      expect(qrService.suggestCodeType('https://example.com')).toBe('QR');
    });

    it('should suggest QR for mixed content', () => {
      expect(qrService.suggestCodeType('ABC123DEF456')).toBe('QR');
    });
  });

  describe('getCodeTypeName', () => {
    it('should return display name for QR', () => {
      expect(qrService.getCodeTypeName('QR')).toBe('QR Code');
    });

    it('should return display name for EAN13', () => {
      expect(qrService.getCodeTypeName('EAN13')).toBe('EAN-13');
    });
  });
});
