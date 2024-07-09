import React, { PropsWithChildren } from 'react';
import { Icon, Label, Split, SplitItem, TextContent, LabelProps } from '@patternfly/react-core';

import RobotIcon from '@patternfly/react-icons/dist/js/icons/robot-icon';

interface AssistantMessageEntryProps {
  options?: {
    title: React.ReactNode;
    props?: LabelProps
  }[],
  icon?: React.ComponentType;
}

export const AssistantMessageEntry = ({ children, options, icon: IconComponent = RobotIcon }: PropsWithChildren<AssistantMessageEntryProps>) => (
  <div className="pf-v5-u-mb-md">
    <Split>
      <SplitItem>
        <Icon size="lg" className="pf-v5-u-mr-sm pf-v5-u-pt-md">
          <IconComponent />
        </Icon>
      </SplitItem>
      <SplitItem className="pf-v5-u-background-color-200">
        <TextContent className="pf-v5-u-font-size-sm">
          {children}
        </TextContent>
      </SplitItem>
    </Split>
    {options ? (
      <Split>
        <SplitItem className="pf-v5-u-ml-xl pf-v5-u-mt-md">
          {options.map((option, index) => (
            <Label key={index} className="pf-v5-u-m-xs" {...option.props}>
              {option.title}
            </Label>
          ))}
        </SplitItem>
      </Split>
    ) : null
    }
  </div>
);

export default AssistantMessageEntry;
