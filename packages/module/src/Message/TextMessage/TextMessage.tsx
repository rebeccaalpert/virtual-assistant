// ============================================================================
// Chatbot Main - Message - Content - Text
// ============================================================================

import React from 'react';
import { ExtraProps } from 'react-markdown';
import { Content, ContentVariants } from '@patternfly/react-core';

const TextMessage = ({ children, ...props }: JSX.IntrinsicElements['p'] & ExtraProps) => (
  <div className="pf-chatbot__message-text">
    <Content component={ContentVariants.p} {...props}>
      {children}
    </Content>
  </div>
);

export default TextMessage;
