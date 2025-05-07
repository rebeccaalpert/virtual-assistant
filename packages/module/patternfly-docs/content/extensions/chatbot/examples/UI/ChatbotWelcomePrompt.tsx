import { FunctionComponent, useState } from 'react';

import ChatbotWelcomePrompt from '@patternfly/chatbot/dist/dynamic/ChatbotWelcomePrompt';
import { Checkbox } from '@patternfly/react-core';

export const ChatbotWelcomePromptExample: FunctionComponent = () => {
  const [showWelcomePrompts, setShowWelcomePrompts] = useState(true);

  const welcomePrompts = [
    {
      title: 'Set up account',
      message: 'Choose the necessary settings and preferences for your account.'
    },
    {
      title: 'Troubleshoot issue',
      message: 'Find documentation and instructions to resolve your issue.'
    }
  ];

  return (
    <>
      <Checkbox
        isChecked={showWelcomePrompts}
        onChange={() => {
          setShowWelcomePrompts(!showWelcomePrompts);
        }}
        name="showWelcomePrompts"
        label="Show welcome prompts"
        id="showWelcomePrompts"
      />
      <ChatbotWelcomePrompt
        title="Hi, ChatBot User!"
        description="How can I help you today?"
        {...(showWelcomePrompts && { prompts: welcomePrompts })}
      />
    </>
  );
};
