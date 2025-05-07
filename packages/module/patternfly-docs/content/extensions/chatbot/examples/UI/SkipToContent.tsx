import { useState, useRef, FunctionComponent } from 'react';

import { SkipToContent } from '@patternfly/react-core';
import ChatbotToggle from '@patternfly/chatbot/dist/dynamic/ChatbotToggle';
import Chatbot, { ChatbotDisplayMode } from '@patternfly/chatbot/dist/dynamic/Chatbot';

export const ChatbotDemo: FunctionComponent = () => {
  const [chatbotVisible, setChatbotVisible] = useState<boolean>(true);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const displayMode = ChatbotDisplayMode.default;

  const handleSkipToContent = (e) => {
    e.preventDefault();
    if (!chatbotVisible && toggleRef.current) {
      toggleRef.current.focus();
    }
    if (chatbotVisible && chatbotRef.current) {
      chatbotRef.current.focus();
    }
  };

  return (
    <>
      <SkipToContent onClick={handleSkipToContent} href="#">
        Skip to chatbot
      </SkipToContent>
      <ChatbotToggle
        tooltipLabel="Chatbot"
        isChatbotVisible={chatbotVisible}
        onToggleChatbot={() => setChatbotVisible(!chatbotVisible)}
        id="chatbot-toggle"
        ref={toggleRef}
      />
      <Chatbot isVisible={chatbotVisible} displayMode={displayMode} ref={chatbotRef}>
        &nbsp;
      </Chatbot>
    </>
  );
};
