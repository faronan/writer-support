import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    //ゲストログイン機能のために、無条件で認証を通す
    Providers.Credentials({
      name: 'Credential',
      async authorize() {
        const user = { name: 'ゲストユーザー', email: 'guest@example.com' };
        return user;
      },
      credentials: {},
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
