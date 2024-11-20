import React from 'react';
import Message from '@patternfly/chatbot/dist/dynamic/Message';
import patternflyAvatar from './patternfly_avatar.jpg';
import { Button } from '@patternfly/react-core';

const timestamp = new Date().toLocaleString();

export const StreamingMessageExample: React.FunctionComponent = () => {
  const [streamingContent, setStreamingContent] = React.useState<string[]>([]);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const STREAMING_TEXT = `You may be wondering whether you can display more complex lists with formatting. In response to your question, I will explain how to spread butter on toast.
  
1. **Using a \`toaster\`:**

   - Place \`bread\` in a \`toaster\`
   - Once \`bread\` is lightly browned, remove from \`toaster\`

2. **Using a \`knife\`:**

     Acquire 1 tablespoon of room temperature \`butter\`. Use \`knife\` to spread butter on \`toast\`. Bon appétit!
 `;

  const toggleStream = async () => {
    setIsStreaming(true);
    setStreamingContent([]);

    /* eslint-disable @typescript-eslint/prefer-for-of */
    for (let i = 0; i < STREAMING_TEXT.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setStreamingContent((prevData) => [...prevData, STREAMING_TEXT[i]]);
    }
    /* eslint-enable */

    setIsStreaming(false);
  };

  return (
    <>
      <Button onClick={toggleStream} isDisabled={isStreaming}>
        Click to simulate streaming a message with a cursor
      </Button>
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content={streamingContent.join('')}
        hasCursor={isStreaming}
        timestamp={timestamp}
      />
    </>
  );
};
