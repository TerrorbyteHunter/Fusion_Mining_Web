// Admin thread endpoints
import { Express } from 'express';
import { storage } from '../storage';
import { isAuthenticated, isAdmin } from '../localAuth';

export function registerAdminMessageRoutes(app: Express) {
  // Mark multiple messages as read
  app.post('/api/messages/mark-read', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { messageIds } = req.body;
      
      if (!Array.isArray(messageIds)) {
        return res.status(400).json({ message: "messageIds must be an array" });
      }

      // Only mark messages as read if the user is the receiver
      for (const messageId of messageIds) {
        const message = await storage.getMessageById(messageId);
        if (message && message.receiverId === userId) {
          await storage.markMessageAsRead(messageId);
        }
      }

      // After marking messages as read, get updated unread count
      const unreadCount = await storage.getUnreadMessagesCount(userId);
      
      res.json({ success: true, unreadCount });
    } catch (error) {
      console.error("Error marking messages as read:", error);
      res.status(500).json({ message: "Failed to mark messages as read" });
    }
  });

  // Get unread message count
  app.get('/api/messages/unread-count', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const count = await storage.getUnreadMessagesCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Error getting unread count:", error);
      res.status(500).json({ message: "Failed to get unread count" });
    }
  });
}