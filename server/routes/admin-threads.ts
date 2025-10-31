// Admin thread endpoints (registered by calling registerAdminThreadRoutes)
import { Express } from 'express';
import { storage } from '../storage';
import { isAuthenticated, isAdmin } from '../localAuth';

export function registerAdminThreadRoutes(app: Express) {
  app.get('/api/threads/all', isAuthenticated, isAdmin, async (req: any, res: any) => {
    try {
      const threads = await storage.getAllMessageThreads();
      res.json(threads);
    } catch (error) {
      console.error("Error fetching all threads:", error);
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });
}