import { ReactNode } from 'react';
import { useSession } from 'next-auth/client';
import { AppHead } from '@/components/atoms/AppHead';
import { AppHeader } from '@/components/organisms/AppHeader';
import { AppFooter } from '@/components/organisms/AppFooter';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { LoginModal } from '@/components/molecules/LoginModal';

type Props = {
  isLoading?: boolean;
  requiresAuth?: boolean;
  children: ReactNode;
};

export const Layout = ({
  isLoading = false,
  requiresAuth = false,
  children,
}: Props) => {
  const [session, sessionLoading] = useSession();
  const TITLE = 'Writer Support';
  return (
    <div className="page">
      <AppHead title={TITLE}></AppHead>

      <header>
        <AppHeader title={TITLE} isLogin={session != null}></AppHeader>
      </header>
      <main>
        {isLoading || sessionLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : requiresAuth && session == null ? (
          // 認証が必要なページにログインなしでアクセスした時は、モーダルを出してリダイレクトする
          <LoginModal></LoginModal>
        ) : (
          <>
            {children}
            <AppFooter />
          </>
        )}
      </main>
    </div>
  );
};
