import { ReactNode } from 'react';
import { HStack, Collapse, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';

type Props = {
  text: string;
  children: ReactNode;
};

export const CollapseText = ({ text, children }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <HStack width="full">
        <Icon
          as={isOpen ? ChevronDownIcon : ChevronRightIcon}
          onClick={onToggle}
        />
        <Text as="ins" color="cornflowerblue" onClick={onToggle}>
          {text}
        </Text>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </>
  );
};
