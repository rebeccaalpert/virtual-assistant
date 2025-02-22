import React from 'react';
import ChatbotToggle from '@patternfly/chatbot/dist/dynamic/ChatbotToggle';

export const BasicDemo: React.FunctionComponent = () => {
  const [chatbotVisible, setChatbotVisible] = React.useState<boolean>(false);
  return (
    <ChatbotToggle
      tooltipLabel="Chatbot"
      isChatbotVisible={chatbotVisible}
      onToggleChatbot={() => setChatbotVisible(!chatbotVisible)}
    />
  );
};
