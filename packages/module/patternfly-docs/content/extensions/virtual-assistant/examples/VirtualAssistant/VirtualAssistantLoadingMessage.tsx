import React from 'react';
import VirtualAssistant from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistant';
import LoadingMessage from '@patternfly/virtual-assistant/dist/esm/LoadingMessage'
import GrinIcon from '@patternfly/react-icons/dist/js/icons/bacon-icon';

export const BasicExample: React.FunctionComponent = () => (
  <VirtualAssistant >
    <LoadingMessage />
    <LoadingMessage icon={GrinIcon} />
  </VirtualAssistant>
);
