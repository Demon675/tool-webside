import type { Express, RequestHandler } from "express";
import session from "express-session";
import { z } from "zod";
import { storage } from "./storage";

export function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  
  // Simple session setup
  app.use(session({
    secret: process.env.SESSION_SECRET || 'neovault-secret-key-12345',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const session = req.session as any;
  
  if (!session.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  next();
};

export const loginAdmin = async (username: string, password: string): Promise<boolean> => {
  const settings = await storage.getAdminSettings();
  return username === settings.username && password === settings.password;
};