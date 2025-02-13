import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // Change `any` to a proper user type if available
  }
}