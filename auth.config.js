export const authConfig = {
  pages: {
    signIn: "/portal",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/portal/admin");
      
      if (isOnAdmin) {
        if (isLoggedIn && auth?.user?.role === "admin") return true;
        return Response.redirect(new URL("/portal", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.nodeId = user.nodeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.nodeId = token.nodeId;
      }
      return session;
    }
  },
  providers: [], // Configured in auth.js
};
