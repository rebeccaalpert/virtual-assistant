// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import React from 'react';
import { ExtraProps } from 'react-markdown';
import { Th, ThProps } from '@patternfly/react-table';

const ThMessage = ({ children, ...props }: ThProps & ExtraProps) => <Th {...props}>{children}</Th>;

export default ThMessage;
