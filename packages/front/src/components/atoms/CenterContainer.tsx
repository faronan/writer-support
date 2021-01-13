import { Container } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const CenterContainer = ({ children }: Props) => {
  return (
    <Container maxW="xl" centerContent>
      {children}
    </Container>
  );
};
