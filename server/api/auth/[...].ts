import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: process.env.NUXT_SECRET,
  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Test user" },
        password: { label: "Password", type: "password" },
      },
      signinUrl: "http://localhost:3000/auth/signin/credentials",
      callbackUrl: "http://localhost:3000/api/auth/callback/credentials",
      async authorize(credentials: any) {
        
        const user = await $fetch(
          `${process.env.STRAPI_BASE_URL}/api/auth/local/`,
          {
            method: "POST",
            body: JSON.stringify({
              identifier: credentials.username,
              password: credentials.password,
            }),
          }
        );

        if (user) {

          const u = {
            id: user.id,
            name: user.user.username,
            // Passing OG JWT through the email field.
            email: user.jwt
          };
          // expires: '' toevoegen

          return u;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    jwt: true,
  }
});
