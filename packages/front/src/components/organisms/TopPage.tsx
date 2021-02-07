import Image from 'next/image';
import { Box } from '@chakra-ui/react';

export const TopPage = () => {
  return (
    <>
      <Box bg="gray.200">
        <Image src="/top.jpg" width={960} height={640} />
        <figure>
          <svg
            width="100%"
            viewBox="0 0 960 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50L80 37.4884C160 25.1643 320 -0.139996 480 0.000583377C640 -0.139996 800 25.1643 960 35.0049C1120 44.8454 1280 40.1594 1360 37.4884L1440 35.0049V50H1360C1280 50 1120 50 960 50C800 50 640 50 480 50C320 50 160 50 80 50H0Z"
              fill="#FFFFFF"
            ></path>
          </svg>
        </figure>
      </Box>
    </>
  );
};
