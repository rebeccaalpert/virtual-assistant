import React, { PropsWithChildren } from 'react';
import { Icon, Split, SplitItem, TextContent } from '@patternfly/react-core';
import OutlinedUserIcon from '@patternfly/react-icons/dist/js/icons/outlined-user-icon';

interface UserMessageEntryProps {
  icon?: React.ComponentType;
}

const UserMessageEntry = ({ children, icon: IconComponent = OutlinedUserIcon }: PropsWithChildren<UserMessageEntryProps>) => (
  <>
    <Split className="pf-v5-u-mb-md pf-v5-u-align-items-flex-start pf-v5-u-justify-content-flex-end">
      <SplitItem>
        <TextContent className="pf-v5-u-color-300 pf-v5-u-font-size-sm">
          {children}
        </TextContent>
      </SplitItem>
      <SplitItem>
        <Icon size="lg" className="pf-v5-u-ml-sm pf-v5-u-pt-xs">
          <IconComponent />
        </Icon>
      </SplitItem>
    </Split>
  </>
);

export default UserMessageEntry;
