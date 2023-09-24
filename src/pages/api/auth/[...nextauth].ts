import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { signInEventHandler, signOutHandler } from "./sessionEventHandler";
import { signOut } from "next-auth/react";

let clientId = process.env.GOOGLE_ID || "";
let clientSecret = process.env.GOOGLE_SECRET || "";
export const authOptions: AuthOptions ={
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  session:{
    strategy: 'jwt'
  },
  secret: process.env.SECRET ||'Uc71nK41BIagPbiJF7tOdmphnYxaByj5a+4+fx9CYv0=',
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("=======================================");
      console.log("signin details");
      console.log("----------------------------------------");
      console.log('account',account);
      console.log("----------------------------------------");
      console.log('profile',profile);
      console.log("----------------------------------------");
      console.log('profile', email);
      console.log("----------------------------------------");
      console.log('credentials',credentials);
      console.log("=======================================");
      signInEventHandler(user);
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }},
    events:{
      async signOut({token}){
        console.log("=======================================");
        console.log("signout token");
        console.log(token);
        console.log("=======================================");
        // signOutHandler({email:token.email, name:token.name});
      }
    }
};

export default NextAuth(authOptions);
