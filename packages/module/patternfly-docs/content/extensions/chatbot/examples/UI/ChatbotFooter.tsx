import React from 'react';
import { ChatbotFooter, ChatbotFootnote } from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';
import { MessageBar } from '@patternfly/chatbot/dist/dynamic/MessageBar';

export const ChatbotFooterExample: React.FunctionComponent = () => {
  const handleSend = (message) => alert(message);

  return (
    <ChatbotFooter>
      <MessageBar onSendMessage={handleSend} hasMicrophoneButton hasAttachButton />
      <ChatbotFootnote label="Lightspeed uses AI. Check for mistakes." />
    </ChatbotFooter>
  );
};