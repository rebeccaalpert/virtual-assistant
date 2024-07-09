import React from 'react';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';

export interface SystemMessageEntryProps {
  /** Message rendered within the system message entry */
  children: React.ReactNode;
}

export const SystemMessageEntry: React.FunctionComponent<SystemMessageEntryProps> = (props) => (
  <TextContent>
    <Text data-test-id="assistant-system-message-entry" component={TextVariants.small}>
      {props.children}
    </Text>
  </TextContent>
);

export default SystemMessageEntry;
