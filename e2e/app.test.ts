/**
 * E2E Tests - Critical User Journeys
 */

import {device, element, by, expect as detoxExpect} from 'detox';

describe('QRStudio E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {camera: 'YES', notifications: 'YES'},
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show home screen', async () => {
    await detoxExpect(element(by.text('QR Studio'))).toBeVisible();
  });

  it('should navigate to editor and create a QR code', async () => {
    await element(by.text('New QR Code')).tap();
    await detoxExpect(element(by.text('Data *'))).toBeVisible();

    await element(by.label('Code data input')).typeText('https://example.com');
    await element(by.label('Code title input')).typeText('Test QR Code');

    await element(by.text('Create')).tap();

    // Should return to home screen
    await detoxExpect(element(by.text('QR Studio'))).toBeVisible();
  });

  it('should navigate to library and view codes', async () => {
    await element(by.text('Library')).tap();
    await detoxExpect(element(by.label('Search codes'))).toBeVisible();
  });

  it('should navigate to settings', async () => {
    await element(by.label('Settings')).tap();
    await detoxExpect(element(by.text('Appearance'))).toBeVisible();
    await detoxExpect(element(by.text('Preferences'))).toBeVisible();
  });

  it('should search for codes in library', async () => {
    await element(by.text('Library')).tap();
    await element(by.label('Search codes')).typeText('example');
    // Results should be filtered
  });

  it('should export a code', async () => {
    await element(by.text('Library')).tap();
    // Long press to select
    await element(by.label('Code item')).longPress();
    await element(by.text('Export')).tap();
    await detoxExpect(element(by.text('Export & Share'))).toBeVisible();
  });
});
