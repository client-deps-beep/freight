import { 
  users, 
  type User, 
  type InsertUser, 
  type QuoteRequest, 
  type InsertQuoteRequest,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuoteRequest(quoteRequest: InsertQuoteRequest): Promise<QuoteRequest>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  getQuoteRequest(id: number): Promise<QuoteRequest | undefined>;
  createContactMessage(contactMessage: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quoteRequests: Map<number, QuoteRequest>;
  private contactMessages: Map<number, ContactMessage>;
  currentUserId: number;
  currentQuoteRequestId: number;
  currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.quoteRequests = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentQuoteRequestId = 1;
    this.currentContactMessageId = 1;
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

  async createQuoteRequest(insertQuoteRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteRequestId++;
    const createdAt = new Date();
    const quoteRequest: QuoteRequest = { ...insertQuoteRequest, id, createdAt };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }

  async getQuoteRequest(id: number): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }

  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { ...insertContactMessage, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
}

export const storage = new MemStorage();
