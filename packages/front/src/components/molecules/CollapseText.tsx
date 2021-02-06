import { ReactNode } from 'react';
import { Collapse, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { NoBorderBox } from '@/components/atoms/NoBorderBox';
import { ShortIntervalHStack } from '@/components/atoms/ShortIntervalHStack';
import { ClickableText } from '@/components/atoms/ClickableText';

type Props = {
  text: string;
  children: ReactNode;
};

export const CollapseText = ({ text, children }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <NoBorderBox>
      <ShortIntervalHStack>
        <Icon
          as={isOpen ? ChevronDownIcon : ChevronRightIcon}
          onClick={onToggle}
        />
        <ClickableText onClick={onToggle} text={text}></ClickableText>
      </ShortIntervalHStack>
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </NoBorderBox>
  );
};
