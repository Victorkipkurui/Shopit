import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { Prisma} from "@/app/generated/prisma/client";

export const auth = betterAuth({
    database: prismaAdapter(Prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
});