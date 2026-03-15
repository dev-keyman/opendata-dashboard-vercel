import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      if (!user.email) return false;
      const { isUserAllowed, autoRegisterUser } = await import('./lib/auth-utils');
      if (await isUserAllowed(user.email)) return true;
      // 신규 사용자: 자동 등록 후 환영 페이지로 이동
      await autoRegisterUser(user.email, user.name ?? '');
      return '/welcome';
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
