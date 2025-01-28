// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import React from 'react';
import { ExtraProps } from 'react-markdown';
import { Thead, TheadProps } from '@patternfly/react-table';

const TheadMessage = ({ children, ...props }: TheadProps & ExtraProps) => <Thead {...props}>{children}</Thead>;

export default TheadMessage;
