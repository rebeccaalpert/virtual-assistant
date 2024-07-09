import React from 'react';
import { Alert, TextContent } from '@patternfly/react-core';


export interface ConversationAlertProps {
    /** Content for conversation alert */
  title: React.ReactNode;
  /** Variant type for conversation alert */
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'custom';
  children?: React.ReactNode;
}

export const ConversationAlert:React.FunctionComponent<ConversationAlertProps> = ({
  variant= 'info',
  title,
  children = ''
}: ConversationAlertProps) => (
  <TextContent>
    <Alert variant={variant} isInline title={title} component="h6">
      {children}
    </Alert>
  </TextContent>
);

export default ConversationAlert;
