import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      authorize: async (credentials) => {
        try {
          const user = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_VERSION}/auth/signin`,
            {
              password: credentials.password,
              email: credentials.email
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
              }
            })

          if (user) {
            return user.data
          }
        } catch (e) {
          var errorMessage;
          if(e.response.status === 502) {
            errorMessage = "Bad gateway";
          }else{
            errorMessage = e.response.data.meta.message;
          }
          // Redirecting to the login page with error messsage in the URL
          throw new Error(errorMessage + '&email=' + credentials.email)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        // console.log("jwt user: ", user)
        token.accessToken = user.data.access_token
      }
      return token;
    },
    async session({ session, token, user }) {
      return token;
    },
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return user
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     if (user) {
  //       token.accessToken = user.data.access_token
  //     }

  //     return token
  //   },
  //   async session({ session, user, token }) {
  //     console.log("user: ", user)
  //     console.log("session: ", session)
  //     session.accessToken = token.accessToken
  //     return session
  //   },
  // },
  pages: {
    // signIn: "/auth/login",
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    error: '/auth/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

export default (req, res) => NextAuth(req, res, options);