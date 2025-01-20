import React from 'react';
import Message from '@patternfly/chatbot/dist/dynamic/Message';
import patternflyAvatar from './patternfly_avatar.jpg';
import { Button } from '@patternfly/react-core';

export const MessageWithFeedbackTimeoutExample: React.FunctionComponent = () => {
  const [hasFeedback, setHasFeedback] = React.useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setHasFeedback(true)}>
        Show card
      </Button>
      <Button variant="secondary" onClick={() => setHasFeedback(false)}>
        Remove card
      </Button>
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with completion message that times out"
        userFeedbackComplete={hasFeedback ? { timeout: true } : undefined}
        isLiveRegion
      />
    </>
  );
};
