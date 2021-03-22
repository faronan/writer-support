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
    </>
  );
};
