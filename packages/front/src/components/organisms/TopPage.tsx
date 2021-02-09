import Image from 'next/image';
import { signIn } from 'next-auth/client';
import { Box } from '@chakra-ui/react';
import { ItalicHeadingText } from '@/components/atoms/ItalicHeadingText';
import { CenterContainer } from '@/components/atoms/CenterContainer';
import { GraySmallText } from '@/components/atoms/GraySmallText';
import { ShortIntervalStack } from '@/components/atoms/ShortIntervalStack';
import { ShortIntervalHStack } from '@/components/atoms/ShortIntervalHStack';
import { BlackButton } from '@/components/atoms/BlackButton';

export const TopPage = () => {
  return (
    <>
      <Box bg="gray.200">
        <CenterContainer>
          <Image src="/top.jpg" width={1200} height={480} />
          <ItalicHeadingText text={'Writer Support'}></ItalicHeadingText>
          <GraySmallText text={'より良い文章を書くために'}></GraySmallText>
        </CenterContainer>
        <figure>
          <svg
            width="100%"
            viewBox="0 0 1440 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50L80 37.4884C160 25.1643 320 -0.139996 480 0.000583377C640 -0.139996 800 25.1643 960 35.0049C1120 44.8454 1280 40.1594 1360 37.4884L1440 35.0049V50H1360C1280 50 1120 50 960 50C800 50 640 50 480 50C320 50 160 50 80 50H0Z"
              fill="#63B3ED"
            />
          </svg>
        </figure>
      </Box>
      <Box bg="blue.300" color="white">
        <ShortIntervalStack>
          <ShortIntervalHStack>
            <Box width="50%" margin="3">
              <ItalicHeadingText
                text={'ルールを選んで文章チェック'}
              ></ItalicHeadingText>
            </Box>
            <Box width="50%" margin="3">
              <Image src="/description_1.png" width={720} height={400} />
            </Box>
          </ShortIntervalHStack>
          <ShortIntervalHStack>
            <Box width="50%" margin="3">
              <Image src="/description_2.png" width={720} height={400} />
            </Box>
            <Box width="50%" margin="3">
              <ItalicHeadingText text={'文法ミスを発見'}></ItalicHeadingText>
            </Box>
          </ShortIntervalHStack>
          <ShortIntervalHStack>
            <Box width="50%" margin="3">
              <ItalicHeadingText
                text={'癖を分析して文章力向上'}
              ></ItalicHeadingText>
            </Box>
            <Box width="50%" margin="3">
              <Image src="/description_3.png" width={720} height={400} />
            </Box>
          </ShortIntervalHStack>
          <ShortIntervalHStack>
            <Box width="50%" margin="3">
              <Image src="/description_4.png" width={720} height={400} />
            </Box>
            <Box width="50%" margin="3">
              <ItalicHeadingText
                text={'文章作成の補助機能も用意'}
              ></ItalicHeadingText>
            </Box>
          </ShortIntervalHStack>
          <CenterContainer>
            <Box
              borderRadius="full"
              bg="yellow.100"
              color="black"
              width="60%"
              mb="3"
              p="3"
            >
              <ItalicHeadingText
                text={'まずは使ってみませんか？'}
              ></ItalicHeadingText>
              <BlackButton
                onClick={async (e) => {
                  e.preventDefault();
                  await signIn('credentials');
                }}
                text={'使ってみる'}
              ></BlackButton>
            </Box>
          </CenterContainer>
        </ShortIntervalStack>
      </Box>
    </>
  );
};
