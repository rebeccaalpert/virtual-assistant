// ============================================================================
// Chatbot Main - Message - Content - List
// ============================================================================

import { ExtraProps } from 'react-markdown';
import { ListItem } from '@patternfly/react-core';

const ListItemMessage = ({ children }: JSX.IntrinsicElements['li'] & ExtraProps) => <ListItem>{children}</ListItem>;

export default ListItemMessage;
