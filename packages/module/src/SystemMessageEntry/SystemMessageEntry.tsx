import React from 'react';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

export interface SystemMessageEntryProps {
  text: string;
  href: string;
}

const useStyles = createUseStyles({
  systemMessageText: {
    paddingBottom: "var(--pf-v5-global--spacer--md)",
    textAlign: "center",
  }
})

export const SystemMessageEntry: React.FunctionComponent<SystemMessageEntryProps> = (props) => {
  const classes = useStyles();
  return (
    <TextContent>
      <Text component={TextVariants.small} className={classes.systemMessageText}>
        {props.text} {props.href}
      </Text>
    </TextContent>
  );
};

export default SystemMessageEntry;