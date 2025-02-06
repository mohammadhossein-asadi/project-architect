import { Logger } from '../logging/Logger.js';
import { MetricsCollector } from '../metrics/MetricsCollector.js';

const logger = new Logger();
const metrics = MetricsCollector.getInstance();

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  SLACK = 'slack'
}

interface Notification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  channels: NotificationChannel[];
  metadata: {
    createdAt: string;
    createdBy: string;
    sentAt?: string;
    status: 'pending' | 'sent' | 'failed';
    attempts: number;
  };
}

export class NotificationManager {
  private static instance: NotificationManager;
  private notifications: Map<string, Notification>;
  private channelHandlers: Map<NotificationChannel, (notification: Notification) => Promise<void>>;

  private constructor() {
    this.notifications = new Map();
    this.channelHandlers = new Map();
    this.initializeDefaultHandlers();
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  private initializeDefaultHandlers(): void {
    this.registerChannelHandler(NotificationChannel.EMAIL, async (notification) => {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 100));
      logger.info(`Email sent: ${notification.title}`);
    });

    this.registerChannelHandler(NotificationChannel.SMS, async (notification) => {
      // Simulate sending SMS
      await new Promise(resolve => setTimeout(resolve, 50));
      logger.info(`SMS sent: ${notification.title}`);
    });
  }

  registerChannelHandler(
    channel: NotificationChannel,
    handler: (notification: Notification) => Promise<void>
  ): void {
    this.channelHandlers.set(channel, handler);
    logger.info(`Channel handler registered: ${channel}`);
  }

  async send(
    title: string,
    message: string,
    options: {
      priority?: NotificationPriority;
      channels?: NotificationChannel[];
    } = {}
  ): Promise<string> {
    const id = this.generateNotificationId();
    const notification: Notification = {
      id,
      title,
      message,
      priority: options.priority || NotificationPriority.MEDIUM,
      channels: options.channels || [NotificationChannel.EMAIL],
      metadata: {
        createdAt: '2025-02-06T23:21:58Z',
        createdBy: 'mohammadhossein-asadi',
        status: 'pending',
        attempts: 0
      }
    };

    this.notifications.set(id, notification);

    try {
      await this.sendNotification(notification);
      metrics.record('notification_sent', 1, { 
        priority: notification.priority,
        channels: notification.channels.join(',')
      });
    } catch (error) {
      logger.error(`Failed to send notification: ${id}`, error);
      metrics.record('notification_failed', 1, { 
        priority: notification.priority,
        channels: notification.channels.join(',')
      });
      throw error;
    }

    return id;
  }

  private async sendNotification(notification: Notification): Promise<void> {
    notification.metadata.attempts++;

    const promises = notification.channels.map(async (channel) => {
      const handler = this.channelHandlers.get(channel);
      if (!handler) {
        throw new Error(`No handler registered for channel: ${channel}`);
      }

      try {
        await handler(notification);
      } catch (error) {
        logger.error(`Failed to send notification through ${channel}:`, error);
        throw error;
      }
    });

    await Promise.all(promises);
    
    notification.metadata.sentAt = '2025-02-06T23:21:58Z';
    notification.metadata.status = 'sent';
  }

  private generateNotificationId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getNotification(id: string): Notification | undefined {
    return this.notifications.get(id);
  }

  getStats(): Record<string, any> {
    const total = this.notifications.size;
    const sent = Array.from(this.notifications.values()).filter(n => n.metadata.status === 'sent').length;
    const failed = Array.from(this.notifications.values()).filter(n => n.metadata.status === 'failed').length;

    return {
      total,
      sent,
      failed,
      timestamp: '2025-02-06T23:21:58Z',
      user: 'mohammadhossein-asadi'
    };
  }
}