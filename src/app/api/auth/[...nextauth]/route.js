import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { getUser, signInUser } from "@/Helpers/callers";

export const authOptions = {
  //
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  //
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const result = await signInUser({ ...user });

        if (result.status !== 200 && result.status !== 409) {
          return false;
        }

        return profile.email_verified ? true : false;
      } catch (error) {
        console.log("callback sign in error", error);
        return false;
      }
    },

    async session({ session, user, token, account }) {
      //
      const { message, status } = await getUser(`/${session.user.email}`);

      if (!message || status === 500) {
        return {};
      }

      // resplace "session.user" with "our db user"
      session.user = {
        ...message,
        role:
          message.email === process.env.ADMIN_EMAIL
            ? process.env.ROLE_ADMIN
            : process.env.ROLE_USER,
      };
      return session;
    },
  },

  // Add the session configuration here
  session: {
    jwt: true,
    encryption: true,
    // You can specify the algorithm (e.g., 'HS256')
    encryptionKey: process.env.NEXTAUTH_SECRET,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
