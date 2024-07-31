import React from 'react';
import { Content, ContentVariants } from '@patternfly/react-core';

export interface SystemMessageEntryProps {
  /** Message rendered within the system message entry */
  children: React.ReactNode;
}

export const SystemMessageEntry: React.FunctionComponent<SystemMessageEntryProps> = (props) => (
  <>
    <Content data-test-id="assistant-system-message-entry" component={ContentVariants.small}>
      {props.children}
    </Content>
  </>
);

export default SystemMessageEntry;
