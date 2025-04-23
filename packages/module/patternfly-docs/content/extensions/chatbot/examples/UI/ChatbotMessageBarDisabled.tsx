import { useState, FunctionComponent } from 'react';
import { MessageBar } from '@patternfly/chatbot/dist/dynamic/MessageBar';
import { Checkbox } from '@patternfly/react-core';

export const ChatbotMessageBarDisabledExample: FunctionComponent = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSend = (message) => alert(message);

  return (
    <>
      <Checkbox
        label="Disable send button"
        isChecked={isDisabled}
        onChange={() => setIsDisabled(!isDisabled)}
        id="disabled"
        name="disabled"
      />
      <MessageBar
        onSendMessage={handleSend}
        isSendButtonDisabled={isDisabled}
        alwayShowSendButton
        hasAttachButton={false}
      />
    </>
  );
};
