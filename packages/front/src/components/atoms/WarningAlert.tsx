import { Alert, AlertIcon } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const WarningAlert = ({ text }: Props) => {
  return (
    <Alert mt={5} status="warning">
      <AlertIcon />
      {text}
    </Alert>
  );
};
