// ============================================================================
// Chatbot Main - Message - Content - Table
// ============================================================================

import React from 'react';
import { ExtraProps } from 'react-markdown';
import { Table, TableProps } from '@patternfly/react-table';

interface Properties {
  line: number;
  column: number;
  offset: number;
}
export interface TableNode {
  children?: TableNode[];
  value?: string;
  position: { start: Properties; end: Properties };
  tagName: string;
  type: string;
}

const TableMessage = ({ children, ...props }: TableProps & ExtraProps) => {
  const { className, ...rest } = props;

  // This allows us to parse the nested data we get back from the 3rd party Markdown parser
  // Open to feedback here if there is a better way to do this
  // This looks for ths and spits them all out so we can filter them later, looking for text values
  const findHeaders = (array?: TableNode[]) => {
    const headers: TableNode[] = [];
    if (!array) {
      return headers;
    }
    const traverse = (items: TableNode[]) => {
      for (const item of items) {
        if (item.tagName === 'th') {
          headers.push(item);
        }
        if (item.children) {
          traverse(item.children);
        }
      }
    };

    traverse(array);
    return headers;
  };

  const headers = findHeaders(rest.node?.children as TableNode[] | undefined);
  const headerTextValues = headers.map((header) => header?.children?.filter((c) => c?.type === 'text')[0]?.value);

  // We are sending these header text values down to child tds by passing them through children, since mobile view for tables expects a dataLabel prop
  // The data structure does not otherwise know this information at that level
  // This is somewhat opinionated and may break if 3rd party library changes
  // See Tr and Tbody for other usage
  const modifyChildren = (children) =>
    React.Children.map(children, (child) => {
      if (child && headerTextValues?.length > 0) {
        return React.cloneElement(child, { extraHeaders: headerTextValues });
      }
      return child;
    });

  const generateAriaLabel = (arr: (string | undefined)[]) => {
    const labels = arr.filter((item) => typeof item !== 'undefined');
    if (labels.length === 0) {
      return 'Table describing some data';
    }
    if (labels.length === 1) {
      return `Table describing ${labels[0]}`;
    }
    const firstValues = labels.slice(0, labels.length - 1);
    const lastValue = labels[labels.length - 1];
    return `Table describing ${firstValues.join(', ') + ' and ' + lastValue}`;
  };

  return (
    // gridBreakPoint is so we show mobile-styled-PF table
    <Table
      aria-label={props['aria-label'] ?? generateAriaLabel(headerTextValues)}
      gridBreakPoint="grid"
      className={`pf-chatbot__message-table ${className ? className : ''}`}
      {...rest}
    >
      {modifyChildren(children)}
    </Table>
  );
};

export default TableMessage;
