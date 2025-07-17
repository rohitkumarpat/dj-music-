import { prismaclient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // Create the user if not exists
      try {
        const existingUser = await prismaclient.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prismaclient.user.create({
            data: {
              email: user.email,
              provider: "Google",
            },
          });
        }
      } catch (e) {
        console.error("User creation error:", e);
      }

      return true;
    },

    async jwt({ token }) {
      // Add user ID from database to the JWT token
      if (token.email) {
        const dbUser = await prismaclient.user.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Add user ID to the session
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
