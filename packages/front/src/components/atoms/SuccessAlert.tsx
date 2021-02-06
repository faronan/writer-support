import { Alert, AlertIcon } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const SuccessAlert = ({ text }: Props) => {
  return (
    <Alert mt={5} status="success">
      <AlertIcon />
      {text}
    </Alert>
  );
};
