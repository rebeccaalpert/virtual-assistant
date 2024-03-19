import React from 'react';
import VirtualAssistant from '@patternfly/virtual-assistant/dist/cjs/VirtualAssistant';

export const VirtualAssistantCustomText: React.FunctionComponent = () => (
  <VirtualAssistant
    title="Patternfly assistant"
    inputPlaceholder="You can ask anything about patternfly in here."
  />
);
