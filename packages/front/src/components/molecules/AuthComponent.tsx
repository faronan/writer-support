import { useSession } from 'next-auth/client';
import { AuthSignIn } from '@/components/atoms/AuthSignIn';
import { AuthSignOut } from '@/components/atoms/AuthSignOut';

export const AuthComponent = () => {
  const [session] = useSession();
  return session ? <AuthSignOut></AuthSignOut> : <AuthSignIn></AuthSignIn>;
};
