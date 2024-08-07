import React, { PropsWithChildren } from 'react';
import { Icon, Split, SplitItem, Content } from '@patternfly/react-core';
import OutlinedUserIcon from '@patternfly/react-icons/dist/js/icons/outlined-user-icon';

interface UserMessageEntryProps {
  icon?: React.ComponentType;
}

const UserMessageEntry = ({
  children,
  icon: IconComponent = OutlinedUserIcon
}: PropsWithChildren<UserMessageEntryProps>) => (
  <>
    <Split className="pf-v6-u-mb-md pf-v6-u-align-items-flex-start pf-v6-u-justify-content-flex-end">
      <SplitItem>
        <Content className="pf-v6-u-color-300 pf-v6-u-font-size-sm">{children}</Content>
      </SplitItem>
      <SplitItem>
        <Icon size="lg" className="pf-v6-u-ml-sm pf-v6-u-pt-xs">
          <IconComponent />
        </Icon>
      </SplitItem>
    </Split>
  </>
);

export default UserMessageEntry;
