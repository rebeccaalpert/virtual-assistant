import React from 'react';
import VirtualAssistant from '@patternfly/virtual-assistant/dist/cjs/VirtualAssistant';

export const VirtualAssistantMessages: React.FunctionComponent = () => {

  const [ lastMessage, setLastMessage ] = React.useState<string>();

  return (
    <>
      <p><b>Last received message: </b> {lastMessage}</p>
      <VirtualAssistant
        onMessage={(message: string) => {
          setLastMessage(message);
        }}
      />
    </>
  )
};
