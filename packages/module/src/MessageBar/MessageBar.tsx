import React from 'react';
import MessageBarBase, { MessageBarBaseProps } from './MessageBarBase';
import MessageBarWithAttachMenu, { MessageBarWithAttachMenuProps } from './MessageBarWithAttachMenu';

export interface MessageBarProps extends MessageBarBaseProps {
  /** Flag to enable a menu that opens when the Attach button is clicked, instead of the attachment window */
  hasAttachMenu?: boolean;
}

export const MessageBar: React.FC<MessageBarProps & MessageBarWithAttachMenuProps> = ({ hasAttachMenu, ...rest }) => {
  if (hasAttachMenu) {
    return <MessageBarWithAttachMenu {...(rest as MessageBarWithAttachMenuProps)} />;
  }

  return <MessageBarBase {...rest} />;
};

export default MessageBar;
