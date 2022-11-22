import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
const config = useRuntimeConfig()

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: config.NUXT_SECRET,
  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "Username or email account" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {

        console.log(credentials)
        const response = await $fetch(
          `${config.STRAPI_BASE_URL}/api/auth/local/`,
          {
            method: "POST",
            body: JSON.stringify({
              identifier: credentials.username,
              password: credentials.password,
            }),
          }
        );

        if (response.user) {
          const u = {
            id: response.id,
            name: response.user.username,
            email: response.jwt,
            // Passing OG JWT through the email field.
            profile: response.jwt
          };
          return u;
        } else {
          throw new Error('User not found');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin'
  },
});
