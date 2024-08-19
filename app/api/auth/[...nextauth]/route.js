import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB(); // Ensure the database is connected for session
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      } else {
        console.log('User not found in session callback');
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        console.log('Database connected');

        // Check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        if (userExists) {
          console.log('User already exists:', userExists);
        } else {
          // Format the username
          let userName = profile.name.replace(/\s+/g, '').toLowerCase();
          // Ensure it meets the length requirements (8-20 characters)
          if (userName.length < 8) {
            userName = userName.padEnd(8, '0'); // Pad with zeros if too short
          } else if (userName.length > 20) {
            userName = userName.slice(0, 20); // Trim to 20 characters if too long
          }

          // Create a new user
          const newUser = await User.create({
            email: profile.email,
            userName: userName,
            image: profile.picture,
          });

          console.log('New user created:', newUser);
        }

        return true;
      } catch (error) {
        console.log('Error during sign-in:', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };