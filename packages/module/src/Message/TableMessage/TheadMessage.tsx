// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import { ExtraProps } from 'react-markdown';
import { Thead, TheadProps } from '@patternfly/react-table';

const TheadMessage = ({ children, ...props }: Omit<TheadProps, 'ref'> & ExtraProps) => (
  <Thead {...props}>{children}</Thead>
);

export default TheadMessage;
