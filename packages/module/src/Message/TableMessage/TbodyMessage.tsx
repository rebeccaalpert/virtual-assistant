// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import React from 'react';
import { ExtraProps } from 'react-markdown';
import { Tbody, TbodyProps } from '@patternfly/react-table';

const TbodyProps = ({ children, ...props }: TbodyProps & ExtraProps & { extraHeaders?: string[] }) => {
  // passthrough so we can place dataLabel on tds
  const modifyChildren = (children) => {
    if (children && props.extraHeaders) {
      return React.Children.map(children, (child) => React.cloneElement(child, { extraHeaders: props.extraHeaders }));
    }
    return children;
  };

  return <Tbody {...props}>{modifyChildren(children)}</Tbody>;
};
export default TbodyProps;
