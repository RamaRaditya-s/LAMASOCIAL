import { User } from "./user";

export interface Story {
  id: number;
  img: string;
  createdAt: Date;
  expiresAt: Date;
  userId: string;
  user: User;
}