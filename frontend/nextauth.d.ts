import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      password: string;
      rol: string;
      is_active: boolean;
      token: string;
    } & DefaultSession['user']
  }
}