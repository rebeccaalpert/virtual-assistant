import { FunctionComponent } from 'react';
import { MessageBar } from '@patternfly/chatbot/dist/dynamic/MessageBar';

export const ChatbotMessageBarStop: FunctionComponent = () => {
  const handleSend = (message) => alert(message);

  const handleStopButton = () => alert('Stop button clicked');

  return <MessageBar handleStopButton={handleStopButton} hasStopButton onSendMessage={handleSend} />;
};
