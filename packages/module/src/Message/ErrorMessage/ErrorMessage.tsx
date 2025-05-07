// ============================================================================
// Chatbot Main - Message - Content - Error
// ============================================================================

import { Alert, AlertProps } from '@patternfly/react-core';

const ErrorMessage = ({ title, actionLinks, children, ...props }: AlertProps) => (
  <Alert isInline variant="danger" title={title} actionLinks={actionLinks} {...props}>
    {children}
  </Alert>
);

export default ErrorMessage;
