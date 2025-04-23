// ============================================================================
// Chatbot Main - Message - Content - Text
// ============================================================================

import { ExtraProps } from 'react-markdown';
import { Content, ContentProps } from '@patternfly/react-core';

const TextMessage = ({ component, children, ...props }: Omit<ContentProps, 'ref'> & ExtraProps) => (
  <span className="pf-chatbot__message-text">
    <Content component={component} {...props}>
      {children}
    </Content>
  </span>
);

export default TextMessage;
