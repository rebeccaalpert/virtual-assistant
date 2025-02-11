// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import React from 'react';
import { ExtraProps } from 'react-markdown';
import { Tr, TrProps } from '@patternfly/react-table';

const TrMessage = ({ children, ...props }: TrProps & ExtraProps & { extraHeaders?: string[] }) => {
  let tdIndex = 0;

  // passthrough so we can place dataLabel on tds
  // places column name on correct child
  const modifyChildren = (children) =>
    React.Children.map(children, (child) => {
      if (child.type.name === 'td' && props.extraHeaders) {
        const clonedChild = React.cloneElement(child, { dataLabel: props.extraHeaders[tdIndex] });
        tdIndex = tdIndex + 1;
        return clonedChild;
      }
      return child;
    });

  return <Tr {...props}>{modifyChildren(children)}</Tr>;
};

export default TrMessage;
