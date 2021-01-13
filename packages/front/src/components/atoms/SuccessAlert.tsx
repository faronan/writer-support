import { Alert, AlertIcon } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const SuccessAlert = ({ text }: Props) => {
  return (
    <Alert mt={10} status="success">
      <AlertIcon />
      {text}
    </Alert>
  );
};
