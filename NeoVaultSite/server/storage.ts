import {
  categories,
  files,
  adminSettings,
  type Category,
  type InsertCategory,
  type File,
  type InsertFile,
  type AdminSettings,
  type InsertAdminSettings,
  type CategoryWithFiles,
  type FileWithDetails,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Category operations
  getCategories(): Promise<CategoryWithFiles[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  
  // File operations
  getFiles(): Promise<FileWithDetails[]>;
  getFilesByCategory(categoryId: string): Promise<FileWithDetails[]>;
  getFile(id: string): Promise<FileWithDetails | undefined>;
  createFile(file: InsertFile): Promise<File>;
  deleteFile(id: string): Promise<void>;
  updateFile(id: string, updates: Partial<InsertFile>): Promise<File>;
  
  // Admin settings
  getAdminSettings(): Promise<AdminSettings>;
  updateAdminSettings(settings: InsertAdminSettings): Promise<AdminSettings>;
}

export class DatabaseStorage implements IStorage {
  // Category operations
  async getCategories(): Promise<CategoryWithFiles[]> {
    const categoriesWithFiles = await db.query.categories.findMany({
      with: {
        files: {
          where: eq(files.isActive, true),
          orderBy: [desc(files.createdAt)],
        },
      },
      orderBy: [categories.name],
    });
    return categoriesWithFiles;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(categoryData: InsertCategory & { slug: string }): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(categoryData)
      .returning();
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }

  // File operations
  async getFiles(): Promise<FileWithDetails[]> {
    const filesWithDetails = await db.query.files.findMany({
      where: eq(files.isActive, true),
      with: {
        category: true,
      },
      orderBy: [desc(files.createdAt)],
    });
    return filesWithDetails;
  }

  async getFilesByCategory(categoryId: string): Promise<FileWithDetails[]> {
    const filesWithDetails = await db.query.files.findMany({
      where: and(eq(files.categoryId, categoryId), eq(files.isActive, true)),
      with: {
        category: true,
      },
      orderBy: [desc(files.createdAt)],
    });
    return filesWithDetails;
  }

  async getFile(id: string): Promise<FileWithDetails | undefined> {
    const file = await db.query.files.findFirst({
      where: and(eq(files.id, id), eq(files.isActive, true)),
      with: {
        category: true,
      },
    });
    return file;
  }

  async createFile(fileData: InsertFile): Promise<File> {
    const [file] = await db
      .insert(files)
      .values(fileData)
      .returning();
    return file;
  }

  async deleteFile(id: string): Promise<void> {
    await db
      .update(files)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(files.id, id));
  }

  async updateFile(id: string, updates: Partial<InsertFile>): Promise<File> {
    const [file] = await db
      .update(files)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(files.id, id))
      .returning();
    return file;
  }

  // Admin settings operations
  async getAdminSettings(): Promise<AdminSettings> {
    const [settings] = await db.select().from(adminSettings).limit(1);
    
    if (!settings) {
      // Create default settings if none exist
      const [defaultSettings] = await db
        .insert(adminSettings)
        .values({
          username: 'admin',
          password: 'admin123'
        })
        .returning();
      return defaultSettings;
    }
    
    return settings;
  }

  async updateAdminSettings(settingsData: InsertAdminSettings): Promise<AdminSettings> {
    const [existing] = await db.select().from(adminSettings).limit(1);
    
    if (existing) {
      const [updated] = await db
        .update(adminSettings)
        .set({ ...settingsData, updatedAt: new Date() })
        .where(eq(adminSettings.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(adminSettings)
        .values(settingsData)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
