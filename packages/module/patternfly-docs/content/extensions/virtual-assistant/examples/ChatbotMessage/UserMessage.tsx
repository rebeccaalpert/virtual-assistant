import React from 'react';

import Message from '@patternfly/virtual-assistant/dist/dynamic/Message';
import userAvatar from './user_avatar.jpg';

export const AttachmentMenuExample: React.FunctionComponent = () => {
  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

Here is an inline code - \`() => void\``;

  return (
    <>
      <Message
        name="User"
        role="user"
        content="Example content with updated timestamp text"
        timestamp="1 hour ago"
        avatar={userAvatar}
      />
      <Message name="User" role="user" content={markdown} avatar={userAvatar} />
    </>
  );
};
