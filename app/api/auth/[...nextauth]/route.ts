import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  // Configuration des fournisseurs
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password", placeholder: "admin" },
      },
      async authorize(credentials) {
        //console.log("Credentials:", credentials);
        const { username, password } = credentials || {};
        if (username === "admin" && password === "admin") {
            return { id: "1", name: "Admin User",imdbKey: process.env.TMDB_KEY };
        }
        console.error("Invalid credentials");
        return null;
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Personnalisation de la page de connexion
  },
  callbacks:{
    session({ session, token }: { session: Session; token: JWT;}) {
      (session as Session & { imdbKey: string }).imdbKey = token.imdbKey as string;
      return session;
    },
    jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.imdbKey =  process.env.TMDB_KEY;
      }
      return token;
    }
    },
});

export { handler as GET, handler as POST };
