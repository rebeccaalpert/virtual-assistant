import React, { PropsWithChildren } from 'react';
import { Icon, Flex, Stack, StackItem } from '@patternfly/react-core';
import { CodeIcon } from '@patternfly/react-icons';

interface FileDetailsProps {
  fileName: string;
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
      <StackItem>{fileName}</StackItem>
      <StackItem className="pf-chatbot__code-language">{language}</StackItem>
    </Stack>
  </Flex>
);

export default FileDetails;
