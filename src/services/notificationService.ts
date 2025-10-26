/**
 * Notification Service - Local notification scheduling
 */

import PushNotification, {PushNotificationObject} from 'react-native-push-notification';
import {ServiceResponse} from '@/types';
import {Platform} from 'react-native';

export class NotificationService {
  /**
   * Initialize notification service
   */
  initialize(): ServiceResponse<void> {
    try {
      PushNotification.configure({
        onNotification: notification => {
          console.log('Notification:', notification);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
      });

      this.createChannels();
      return {success: true};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Create notification channels (Android)
   */
  private createChannels(): void {
    PushNotification.createChannel(
      {
        channelId: 'qrstudio-default',
        channelName: 'QR Studio Notifications',
        channelDescription: 'General notifications from QR Studio',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );
  }

  /**
   * Schedule local notification
   */
  scheduleNotification(
    title: string,
    message: string,
    date: Date,
    data?: any,
  ): ServiceResponse<string> {
    try {
      const notificationId = Math.random().toString(36).substring(7);

      PushNotification.localNotificationSchedule({
        channelId: 'qrstudio-default',
        id: notificationId,
        title,
        message,
        date,
        userInfo: data,
        playSound: true,
        soundName: 'default',
      });

      return {success: true, data: notificationId};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Show immediate notification
   */
  showNotification(title: string, message: string, data?: any): ServiceResponse<void> {
    try {
      PushNotification.localNotification({
        channelId: 'qrstudio-default',
        title,
        message,
        userInfo: data,
        playSound: true,
        soundName: 'default',
      });

      return {success: true};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Cancel notification
   */
  cancelNotification(notificationId: string): ServiceResponse<void> {
    try {
      PushNotification.cancelLocalNotification(notificationId);
      return {success: true};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Cancel all notifications
   */
  cancelAllNotifications(): ServiceResponse<void> {
    try {
      PushNotification.cancelAllLocalNotifications();
      return {success: true};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Request permissions (iOS)
   */
  async requestPermissions(): Promise<ServiceResponse<boolean>> {
    try {
      if (Platform.OS === 'ios') {
        const permissions = await PushNotification.requestPermissions();
        return {success: true, data: !!permissions};
      }
      return {success: true, data: true};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }
}

export const notificationService = new NotificationService();
