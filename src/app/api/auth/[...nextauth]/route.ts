// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUser } from "../../loginapi/index.api";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
        role: { label: "role", type: "text" }, // Use number or string based on your logic
      },
      async authorize(credentials: any) {
        try {
          const userData = await authUser(credentials);
          console.log("====login called===>", userData);
          if (userData?.result) {
            return userData.result; // ✅ This is the actual user object
          } else {
            return null; // No user found
          }
        } catch (err) {
          console.error("Auth Error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Optional: your login page
    error: "/login", // Optional: redirect on error
  },
  secret: "a507ffe371fccdc29745e5f8507ccd5dd0d1e7fc98bab48d917adc18dc420e1e",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
