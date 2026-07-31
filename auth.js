import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config.js";
import { db } from "./db/index.js";
import { creators, otpCodes } from "./db/schema.js";
import { eq, and, gt } from "drizzle-orm";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Verification Code", type: "text" }
      },
      async authorize(credentials) {
        const { email, code } = credentials;
        if (!email || !code) return null;

        // Query creator from database
        const creatorList = await db.select().from(creators).where(eq(creators.email, email)).limit(1);
        if (creatorList.length === 0) {
          return null; // Not registered or not approved yet
        }

        const creator = creatorList[0];

        // Developer bypass code (matching current client mock functionality)
        if (code === "1337" || code === "1234") {
          return {
            id: creator.id,
            name: creator.name,
            email: creator.email,
            role: creator.role,
            nodeId: creator.nodeId
          };
        }

        // Verify OTP code
        const now = new Date().toISOString();
        const activeCodes = await db.select()
          .from(otpCodes)
          .where(
            and(
              eq(otpCodes.email, email),
              eq(otpCodes.code, code),
              gt(otpCodes.expiresAt, now)
            )
          )
          .limit(1);

        if (activeCodes.length > 0) {
          // Delete used code to prevent replay attacks
          await db.delete(otpCodes).where(eq(otpCodes.id, activeCodes[0].id));
          return {
            id: creator.id,
            name: creator.name,
            email: creator.email,
            role: creator.role,
            nodeId: creator.nodeId
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
});
