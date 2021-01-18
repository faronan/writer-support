import { ReactNode } from 'react';
import { useSession } from 'next-auth/client';
import { AppHead } from '@/components/atoms/AppHead';
import { LoadingText } from '@/components/atoms/LoadingText';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export const Layout = ({ isLoading, children }: Props) => {
  const [, sessionLoading] = useSession();

  return (
    <div className="page">
      <AppHead></AppHead>

      <header>{/* TODO: ヘッダー作る */}</header>
      <main>
        {isLoading || sessionLoading ? <LoadingText></LoadingText> : children}
      </main>
    </div>
  );
};
