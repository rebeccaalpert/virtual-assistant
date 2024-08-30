import React, { PropsWithChildren } from 'react';
import { Icon, Flex, Stack, StackItem } from '@patternfly/react-core';
import { CodeIcon } from '@patternfly/react-icons';

interface FileDetailsProps {
  /** Name of file, without extension */
  fileName: string;
  /** Programming language or format file is in */
  language: string;
}

export const FileDetails = ({ fileName, language }: PropsWithChildren<FileDetailsProps>) => (
  <Flex>
    <Flex
      className="pf-chatbot__code-icon"
      justifyContent={{ default: 'justifyContentCenter' }}
      alignItems={{ default: 'alignItemsCenter' }}
      alignSelf={{ default: 'alignSelfCenter' }}
    >
      <Icon>
        <CodeIcon color="white" />
      </Icon>
    </Flex>
    <Stack>
      <StackItem>
        <span className="pf-chatbot__code-fileName">{fileName}</span>
      </StackItem>
      <StackItem className="pf-chatbot__code-language">{language}</StackItem>
    </Stack>
  </Flex>
);

export default FileDetails;
