import { AuthSignIn } from '@/components/atoms/AuthSignIn';
import { AuthSignOut } from '@/components/atoms/AuthSignOut';

type Props = {
  isLogin: boolean;
};

export const AuthComponent = ({ isLogin }: Props) => {
  return isLogin ? <AuthSignOut></AuthSignOut> : <AuthSignIn></AuthSignIn>;
};
