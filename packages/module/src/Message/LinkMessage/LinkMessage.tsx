// ============================================================================
// Chatbot Main - Message - Content - Link
// ============================================================================

import React from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';
import { ExternalLinkSquareAltIcon } from '@patternfly/react-icons';

const LinkMessage = ({ children, target, href, ...props }: ButtonProps) => {
  if (target === '_blank') {
    return (
      <Button
        component="a"
        variant="link"
        href={href}
        icon={<ExternalLinkSquareAltIcon />}
        iconPosition="end"
        isInline
        target={target}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button isInline component="a" href={href} variant="link" {...props}>
      {children}
    </Button>
  );
};

export default LinkMessage;
