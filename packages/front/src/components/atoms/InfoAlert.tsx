import { Alert, AlertIcon } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const InfoAlert = ({ text }: Props) => {
  return (
    <Alert mt={5} status="info">
      <AlertIcon />
      {text}
    </Alert>
  );
};
