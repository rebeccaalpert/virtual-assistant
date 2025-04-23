// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import { Children, cloneElement } from 'react';
import { ExtraProps } from 'react-markdown';
import { Tr, TrProps } from '@patternfly/react-table';

const TrMessage = ({ children, ...props }: Omit<TrProps, 'ref'> & ExtraProps & { extraHeaders?: string[] }) => {
  let tdIndex = 0;

  // passthrough so we can place dataLabel on tds
  // places column name on correct child
  const modifyChildren = (children) =>
    Children.map(children, (child) => {
      if (child.type.name === 'td' && props.extraHeaders) {
        const clonedChild = cloneElement(child, { dataLabel: props.extraHeaders[tdIndex] });
        tdIndex = tdIndex + 1;
        return clonedChild;
      }
      return child;
    });

  return <Tr {...props}>{modifyChildren(children)}</Tr>;
};

export default TrMessage;
