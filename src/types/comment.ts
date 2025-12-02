import { User } from "./user";

export interface Comment {
  id: number;
  desc: string;
  user: User;
}