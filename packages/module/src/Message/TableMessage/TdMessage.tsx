// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import { ExtraProps } from 'react-markdown';
import { Td, TdProps } from '@patternfly/react-table';

const TdMessage = ({ children, ...props }: Omit<TdProps, 'ref'> & ExtraProps) => <Td {...props}>{children}</Td>;

export default TdMessage;
