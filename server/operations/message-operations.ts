import { db } from "../db";
import { Message, messages } from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { storage } from "../storage";

// Extension to DatabaseStorage class
export class MessageOperations {
  static async getMessageById(id: string) {
    const [message] = await db
      .select()
      .from(messages)
      .where(eq(messages.id, id))
      .limit(1);
    return message;
  }

  static async markMessageAsRead(id: string) {
    await db
      .update(messages)
      .set({ read: true, unread: false })
      .where(eq(messages.id, id));
  }

  static async getUnreadMessagesCount(userId: string) {
    const [result] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(messages)
      .where(
        and(
          eq(messages.receiverId, userId),
          eq(messages.unread, true)
        )
      );
    return result?.count || 0;
  }
}

// Extend the DatabaseStorage class
Object.assign(storage.constructor.prototype, {
  getMessageById: MessageOperations.getMessageById,
  markMessageAsRead: MessageOperations.markMessageAsRead,
  getUnreadMessagesCount: MessageOperations.getUnreadMessagesCount
});