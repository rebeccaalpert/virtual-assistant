import React from 'react';
import ChatbotToggle from '@patternfly/virtual-assistant/dist/dynamic/ChatbotToggle';

export const SquareChatbotToggle: React.FunctionComponent = () => {
  const [chatbotVisible, setChatbotVisible] = React.useState<boolean>(false);
  return (
    <ChatbotToggle
      toolTipLabel="Chatbot"
      isChatbotVisible={chatbotVisible}
      onToggleChatbot={() => setChatbotVisible(!chatbotVisible)}
      isRound={false}
    />
  );
};
