// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import { ExtraProps } from 'react-markdown';
import { Th, ThProps } from '@patternfly/react-table';

const ThMessage = ({ children, ...props }: Omit<ThProps, 'ref'> & ExtraProps) => <Th {...props}>{children}</Th>;

export default ThMessage;
