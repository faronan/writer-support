import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListIcon,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import { CopyIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { GraySmallText } from '@/components/atoms/GraySmallText';
import { Word } from '@graphql/graphql-operations';

type wordType = 'template' | 'ng';

type Props = {
  words: {
    __typename?: 'Word';
  } & Pick<Word, 'wordText'>[];
  createWord: (word) => void;
  wordType: wordType;
  description: string;
};

export const UserWords = ({
  words,
  createWord,
  wordType,
  description,
}: Props) => {
  const [text, setText] = useState('');
  const [copyWordText, setCopyWordText] = useState('');
  const { onCopy } = useClipboard(copyWordText);

  const onClickCreateButton = () => {
    createWord(text);
    setText('');
  };
  const toast = useToast();
  const onCopyWordClick = (wordText: string) => {
    setCopyWordText(wordText);
    toast({
      title: 'クリップボードにコピーしました',
      status: 'success',
      position: 'top',
      isClosable: true,
      duration: 1000,
    });
  };

  useEffect(() => {
    if (!copyWordText) {
      return;
    }
    onCopy();
  }, [copyWordText]);

  return (
    <List spacing={3}>
      <GraySmallText text={description}></GraySmallText>
      <ListItem>
        <InputGroup mt={3}>
          <Input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <InputRightElement width="auto">
            <Button
              disabled={text == ''}
              colorScheme="blue"
              variant="outline"
              onClick={onClickCreateButton}
            >
              新規作成
            </Button>
          </InputRightElement>
        </InputGroup>
      </ListItem>
      {words.map((word, index) => (
        <ListItem key={index} display={'-webkit-box'}>
          {wordType == 'template' ? (
            <>
              <ListIcon
                as={CopyIcon}
                color="green.500"
                onClick={() => onCopyWordClick(word.wordText)}
              />
              <Text onClick={() => onCopyWordClick(word.wordText)}>
                {word.wordText}
              </Text>
            </>
          ) : (
            <>
              <ListIcon as={WarningTwoIcon} color="yellow.500" />
              <Text>{word.wordText}</Text>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};
