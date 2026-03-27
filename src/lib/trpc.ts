import { createTRPCReact } from "@trpc/react-query";
import type { AnyTRPCRouter } from "@trpc/server";

// Replace AnyTRPCRouter with your actual AppRouter type when you wire up a backend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc = createTRPCReact<AnyTRPCRouter>() as any;
