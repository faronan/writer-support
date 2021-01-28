import { signIn, signOut } from 'next-auth/client';
import { TransparentBolderButton } from '@/components/atoms/TransparentBolderButton';

type Props = {
  isLogin: boolean;
};

export const AuthComponent = ({ isLogin }: Props) => {
  return isLogin ? (
    <TransparentBolderButton
      onClick={async (e) => {
        e.preventDefault();
        await signOut();
      }}
      text={'ログアウト'}
    ></TransparentBolderButton>
  ) : (
    <>
      <TransparentBolderButton
        onClick={async (e) => {
          e.preventDefault();
          await signIn('google');
        }}
        text={'ログイン'}
      ></TransparentBolderButton>
      <TransparentBolderButton
        onClick={async (e) => {
          e.preventDefault();
          await signIn('credentials');
        }}
        text={'ゲストログイン'}
      ></TransparentBolderButton>
    </>
  );
};
