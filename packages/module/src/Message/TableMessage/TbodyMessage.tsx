// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import { Children, cloneElement } from 'react';
import { ExtraProps } from 'react-markdown';
import { Tbody, TbodyProps } from '@patternfly/react-table';

const TbodyProps = ({ children, ...props }: Omit<TbodyProps, 'ref'> & ExtraProps & { extraHeaders?: string[] }) => {
  // passthrough so we can place dataLabel on tds
  const modifyChildren = (children) => {
    if (children && props.extraHeaders) {
      return Children.map(children, (child) => cloneElement(child, { extraHeaders: props.extraHeaders }));
    }
    return children;
  };

  return <Tbody {...props}>{modifyChildren(children)}</Tbody>;
};
export default TbodyProps;
