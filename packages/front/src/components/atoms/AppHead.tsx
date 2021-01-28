import Head from 'next/head';

type Props = {
  title: string;
};

export const AppHead = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
