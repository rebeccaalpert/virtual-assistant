import React from 'react';
import Message from '@patternfly/chatbot/dist/dynamic/Message';
import patternflyAvatar from './patternfly_avatar.jpg';
import { Button } from '@patternfly/react-core';

export const MessageWithFeedbackTimeoutExample: React.FunctionComponent = () => {
  const [hasFeedback, setHasFeedback] = React.useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setHasFeedback(true)}>
        Show feedback cards
      </Button>
      <Button variant="secondary" onClick={() => setHasFeedback(false)}>
        Remove all feedback cards
      </Button>
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with feedback form that times out"
        userFeedbackForm={
          /* eslint-disable indent */
          hasFeedback
            ? {
                quickResponses: [
                  { id: '1', content: 'Correct' },
                  { id: '2', content: 'Easy to understand' },
                  { id: '3', content: 'Complete' }
                ],
                onSubmit: (quickResponse, additionalFeedback) =>
                  alert(`Selected ${quickResponse} and received the additional feedback: ${additionalFeedback}`),
                hasTextArea: true,
                timeout: true
              }
            : undefined
          /* eslint-enable indent */
        }
        isLiveRegion
      />
      ,
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
