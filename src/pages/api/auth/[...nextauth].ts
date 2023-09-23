import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";

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
  }
};

export default NextAuth(authOptions);
