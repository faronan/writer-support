import { useEffect } from 'react';
import Router from 'next/router';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);
  const closeAndRedirect = () => {
    onClose();
    Router.push('/');
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={closeAndRedirect}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ログインしてください！</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH="20">
          本サイトの機能を使うには、ログインが必要です🙇‍♂️
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
