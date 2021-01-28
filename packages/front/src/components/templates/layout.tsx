import { ReactNode } from 'react';
import { useSession } from 'next-auth/client';
import { AppHead } from '@/components/atoms/AppHead';
import { AppHeader } from '@/components/organisms/AppHeader';
import { LoadingText } from '@/components/atoms/LoadingText';

type Props = {
  isLoading?: boolean;
  children: ReactNode;
};

export const Layout = ({ isLoading = false, children }: Props) => {
  const [session, sessionLoading] = useSession();
  const TITLE = 'Write Support';
  return (
    <div className="page">
      <AppHead title={TITLE}></AppHead>

      <header>
        <AppHeader title={TITLE} isLogin={session != null}></AppHeader>
      </header>
      <main>
        {isLoading || sessionLoading ? <LoadingText></LoadingText> : children}
      </main>
    </div>
  );
};
