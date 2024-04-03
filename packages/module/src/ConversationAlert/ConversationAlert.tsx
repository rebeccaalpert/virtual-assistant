import React from 'react';
import { Alert, TextContent } from '@patternfly/react-core';

import { createUseStyles } from 'react-jss';

export interface ConversationAlertProps {
  title: string;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'custom';
}

const useStyles = createUseStyles({
  banner: {
    paddingTop: "0",
    paddingBottom: "var(--pf-v5-global--spacer--md)",
  },
  bannerAlert: {
    "& .pf-v5-c-alert__title": {
      marginTop: "0",
      fontSize: "var(--pf-v5-global--FontSize--sm)",
    }
  }
})

export const ConversationAlert:React.FunctionComponent<ConversationAlertProps> = (props) => {
  const classes = useStyles();
  return (
    <TextContent className={classes.banner}>
      <Alert className={classes.bannerAlert} variant={props.variant} isInline title={props.title} component="h6" />
    </TextContent>
  );
};

export default ConversationAlert;
