import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials:", credentials);
        const { username, password } = credentials || {};
        if (username === "admin" && password === "admin") {
          console.log("test")
            return { id: "1", name: "Admin User",imdbKey: process.env.TMDB_KEY };
        }
        console.error("Invalid credentials");
        return null;
      },
    })
  ],
    secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", 
  },
  callbacks:{
    async session({ session, token }: { session: Session; token: JWT;}) {
      (session as Session & { imdbKey: string }).imdbKey = token.imdbKey as string;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.imdbKey =  process.env.TMDB_KEY;
      }
      return token;
    }
    },
    

});

export { handler as GET, handler as POST };
