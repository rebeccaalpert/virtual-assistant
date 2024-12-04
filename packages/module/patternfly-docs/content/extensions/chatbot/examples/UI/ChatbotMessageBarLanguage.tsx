import React from 'react';
import { MessageBar } from '@patternfly/chatbot/dist/dynamic/MessageBar';

export const ChatbotMessageBarExample: React.FunctionComponent = () => {
  const handleSend = (message) => alert(message);

  return (
    <MessageBar
      hasAttachButton={false}
      onSendMessage={handleSend}
      hasMicrophoneButton
      buttonProps={{
        microphone: { language: 'ja-JP' }
      }}
    />
  );
};
