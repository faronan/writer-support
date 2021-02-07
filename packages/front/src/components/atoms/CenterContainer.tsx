import { Container } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const CenterContainer = ({ children }: Props) => {
  return (
    <Container centerContent maxW="100%">
      {children}
    </Container>
  );
};
