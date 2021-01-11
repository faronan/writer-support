import { MouseEvent } from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import {
  Container,
  Button,
  Textarea,
  Checkbox,
  Stack,
  Divider,
  Alert,
  AlertIcon,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Code,
} from '@chakra-ui/react';
import {
  AddProofreadingDataInput,
  CreateProofreadingDocument,
  CreateProofreadingMutation,
} from '@graphql/graphql-operations';

export const ProofreadingComponent = () => {
  const [text, setText] = useState('');
  const [session] = useSession();
  const [createProofreading] = useMutation(CreateProofreadingDocument);

  const [checkedItems, setCheckedItems] = useState(
    new Array<boolean>(2).fill(false),
  );

  type createProofreadingResult = FetchResult<
    CreateProofreadingMutation,
    Record<string, any>,
    Record<string, any>
  >;

  const [response, setResponse] = useState<createProofreadingResult>({
    data: null,
  });

  const RULE_NAMES = ['no-dropping-the-ra', 'no-doubled-joshi'];
  const RULE_NAMES_FOR_VIEW = [
    'ら抜き言葉を使用しない',
    '同じ助詞を連続して使用しない',
  ];

  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectRuleNames = checkedItems.reduce(
      (arr: string[], val, i) => (val && arr.push(RULE_NAMES[i]), arr),
      [],
    );
    const proofreading: AddProofreadingDataInput = {
      text: text,
      ruleNames: selectRuleNames,
      userEmail: session.user.email,
      userName: session.user.name,
    };
    const response = await createProofreading({
      variables: { proofreading: proofreading },
    });
    setResponse(response);
  };

  const splitResponseText = response.data
    ? response.data.createProofreading.text.split(/\r\n|\n|↵/)
    : [];

  return (
    <Container maxW="xl" centerContent>
      <Textarea
        value={text}
        onChange={(e) => {
          let inputValue = e.target.value;
          setText(inputValue);
        }}
        placeholder="ここに文章を入力してください"
        minH="xs"
      />
      <Button mt={5} colorScheme="blue" onClick={onClick}>
        送信
      </Button>

      <Stack mt={10} spacing={1}>
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) =>
            setCheckedItems(
              checkedItems.map((item, index) =>
                index === 0 ? e.target.checked : item,
              ),
            )
          }
        >
          {RULE_NAMES_FOR_VIEW[0]}
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) =>
            setCheckedItems(
              checkedItems.map((item, index) =>
                index === 1 ? e.target.checked : item,
              ),
            )
          }
        >
          {RULE_NAMES_FOR_VIEW[1]}
        </Checkbox>
      </Stack>

      {response.data && (
        <div>
          <Divider mt={10} />
          <Alert status="success">
            <AlertIcon />
            校正結果です
          </Alert>
          <Box border="1px" borderColor="gray.200" w="100%" p="5">
            {splitResponseText.map((row, rowIndex) => {
              const proofreadResults = response.data.createProofreading.result.filter(
                (v) => v.line == rowIndex + 1,
              );
              return (
                <div key={rowIndex}>
                  {proofreadResults.length > 0 ? (
                    proofreadResults.map((result, resultIndex, array) => {
                      return (
                        <span key={resultIndex}>
                          {array.length == 1 ? (
                            <>
                              <Code>{row.slice(0, result.column - 1)}</Code>
                              <Code colorScheme="red">
                                {row[result.column - 1]}
                              </Code>
                              <Code>{row.slice(result.column)}</Code>
                            </>
                          ) : resultIndex == 0 ? (
                            <>
                              <Code>{row.slice(0, result.column - 1)}</Code>
                              <Code colorScheme="red">
                                {row[result.column - 1]}
                              </Code>
                              <Code>
                                {row.slice(
                                  result.column,
                                  array[resultIndex + 1].column - 1,
                                )}
                              </Code>
                            </>
                          ) : resultIndex == array.length - 1 ? (
                            <>
                              <Code colorScheme="red">
                                {row[result.column - 1]}
                              </Code>
                              <Code>{row.slice(result.column)}</Code>
                            </>
                          ) : (
                            <>
                              <Code colorScheme="red">
                                {row[result.column - 1]}
                              </Code>
                              <Code>
                                {row.slice(
                                  result.column,
                                  array[resultIndex + 1].column - 1,
                                )}
                              </Code>
                            </>
                          )}
                        </span>
                      );
                    })
                  ) : (
                    <Code>{row}</Code>
                  )}
                </div>
              );
            })}
          </Box>
          <Box border="1px" borderColor="gray.200" w="100%" p="5">
            <Table variant="simple">
              <Tbody>
                {response.data.createProofreading.result.map((v, index) => (
                  <Tr key={index}>
                    <Td width="20%">{`${v.line}行目`}</Td>
                    <Td width="10%">
                      <Code colorScheme="red">
                        {splitResponseText[v.line - 1][v.column - 1]}
                      </Code>
                    </Td>
                    <Td width="70%">{v.message}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </div>
      )}
    </Container>
  );
};
