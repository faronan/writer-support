import { SimpleGrid } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const HalfGrid = ({ children }: Props) => {
  return (
    <SimpleGrid columns={2} spacing={10} paddingInline="3" marginLeft="0">
      {children}
    </SimpleGrid>
  );
};
