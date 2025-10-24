import passport from "passport";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";

export function setupAuth(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const testUsers: { [key: string]: any } = {
      'test-admin-123': { id: 'test-admin-123', username: 'admin', role: 'admin', email: 'admin@fusionmining.com', firstName: 'Admin', lastName: 'User' },
      'test-buyer-789': { id: 'test-buyer-789', username: 'user', role: 'buyer', email: 'buyer@fusionmining.com', firstName: 'Bob', lastName: 'Buyer' },
    };
    
    if (testUsers[id]) {
      return done(null, testUsers[id]);
    }
    
    try {
      const user = await storage.getUser(id);
      return done(null, user);
    } catch (error) {
      return done(null, false);
    }
  });
}

export const isAuthenticated: RequestHandler = (req: any, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const isAdmin: RequestHandler = (req: any, res, next) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export const isSeller: RequestHandler = (req: any, res, next) => {
  if (!req.isAuthenticated() || req.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};