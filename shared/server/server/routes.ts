```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/portfolio", async (req, res) => {
    try {
      const items = await storage.getPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getPortfolioItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully! I'll get back to you within 24 hours.",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
```

### File: `server/storage.ts`
```typescript
import { portfolioItems, contactMessages, users, type PortfolioItem, type ContactMessage, type User, type InsertPortfolioItem, type InsertContactMessage, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioItems: Map<number, PortfolioItem>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentPortfolioId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.portfolioItems = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentPortfolioId = 1;
    this.currentContactId = 1;
    
    this.initializePortfolioItems();
  }

  private initializePortfolioItems() {
    const items: Omit<PortfolioItem, 'id'>[] = [
      {
        title: "Creative Photography",
        description: "Professional photography showcasing creative composition and lighting techniques",
        imageUrl: "https://bhimshahi.com.np/portfolio1.jpeg",
        category: "photography",
        tags: ["Photography", "Creative"],
        createdAt: new Date(),
      },
      {
        title: "Artistic Vision",
        description: "Demonstrating artistic vision through carefully composed photographic work",
        imageUrl: "https://bhimshahi.com.np/portfolio2.jpeg",
        category: "photography",
        tags: ["Photography", "Artistic"],
        createdAt: new Date(),
      },
      {
        title: "Video Production",
        description: "Professional video editing and post-production work for various clients",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "video",
        tags: ["Video", "Editing"],
        createdAt: new Date(),
      },
      {
        title: "Graphic Design",
        description: "Creative graphic design solutions for branding and visual communication",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "design",
        tags: ["Design", "Branding"],
        createdAt: new Date(),
      },
    ];

    items.forEach(item => {
      const id = this.currentPortfolioId++;
      this.portfolioItems.set(id, { ...item, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(
      item => item.category === category
    );
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const item: PortfolioItem = { 
      ...insertItem, 
      id,
      tags: insertItem.tags || [],
      createdAt: new Date(),
    };
    this.portfolioItems.set(id, item);
    return item;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
```

### File: `server/vite.ts`
```typescript
import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
```
