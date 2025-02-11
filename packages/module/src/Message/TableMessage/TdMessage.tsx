// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import React from 'react';
import { ExtraProps } from 'react-markdown';
import { Td, TdProps } from '@patternfly/react-table';

const TdMessage = ({ children, ...props }: TdProps & ExtraProps) => <Td {...props}>{children}</Td>;

export default TdMessage;
