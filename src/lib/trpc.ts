import { createTRPCReact } from "@trpc/react-query";
import type { AnyTRPCRouter } from "@trpc/server";

// Replace AnyTRPCRouter with your actual AppRouter type when you wire up a backend
export const trpc = createTRPCReact<AnyTRPCRouter>();
