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
        await signOut({ callbackUrl: process.env.BASE_URL });
      }}
      text={'ログアウト'}
    ></TransparentBolderButton>
  ) : (
    <>
      <TransparentBolderButton
        onClick={async (e) => {
          e.preventDefault();
          await signIn('google', {
            callbackUrl: `${process.env.BASE_URL}/check`,
          });
        }}
        text={'ログイン'}
      ></TransparentBolderButton>
      <TransparentBolderButton
        onClick={async (e) => {
          e.preventDefault();
          await signIn('credentials', {
            callbackUrl: `${process.env.BASE_URL}/check`,
          });
        }}
        text={'ゲストログイン'}
      ></TransparentBolderButton>
    </>
  );
};
