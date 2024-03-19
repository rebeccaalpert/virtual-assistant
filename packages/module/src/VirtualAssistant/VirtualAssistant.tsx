import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupText,
  TextArea
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import classnames from "clsx";
import { PaperPlaneIcon } from '@patternfly/react-icons';

const useStyles = createUseStyles({
  card: {
    width: "350px",
    height: "550px",
    overflow: "hidden",
    "@media screen and (max-width: 768px)": {
      height: "420px",
      width: "100%",
    },
  },
  cardHeader: {
    background: "var(--pf-v5-global--BackgroundColor--dark-400)",
  },
  cardTitle: {
    color: "var(--pf-v5-global--Color--light-100)",
  },
  cardBody: {
    backgroundColor: "var(--pf-v5-global--BackgroundColor--100)",
    paddingLeft: "var(--pf-v5-global--spacer--md)",
    paddingRight: "var(--pf-v5-global--spacer--md)",
    paddingTop: "var(--pf-v5-global--spacer--lg)",
    overflowY: "scroll",
    "&::-webkit-scrollbar": "display: none",
  },
  cardFooter: {
    padding: "0",
  },
  inputGroup: {
    height: "60px",
  },
  textArea: {
    resize: "none",
  }
})

export interface VirtualAssistantProps {
  /** Messages rendered within the assistant */
  children?: React.ReactNode;
  /** Header title for this assistant */
  title?: string;
  /** Input's placeholder for this assistant */
  inputPlaceholder?: string;
  /** Fire when clicking the Send (Plane) icon */
  onMessage?: (message: string) => void;
  /** Header actions of the assistant */
  actions?: React.ReactNode;
}

export const VirtualAssistant: React.FunctionComponent<VirtualAssistantProps> = ({
  children,
  title = 'Virtual Assistant',
  inputPlaceholder = 'Type a message...',
  actions,
  onMessage
}: VirtualAssistantProps) => {
  const classes = useStyles();
  const inputTextAreaRef = React.createRef<HTMLTextAreaElement>();

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} actions={actions ? {
        actions
      } : undefined}>
        <CardTitle className={classnames(classes.cardTitle,"pf-v5-u-font-size-xl")}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {children}
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <InputGroup className={classes.inputGroup}>
          <TextArea
            className={classes.textArea}
            placeholder={inputPlaceholder}
            type="text"
            aria-label="Assistant input"
            ref={inputTextAreaRef}
          />
          <InputGroupText>
            <Button variant="plain" className="pf-v5-u-px-sm" onClick={onMessage ? () => {
              if (inputTextAreaRef.current) {
                onMessage(inputTextAreaRef.current.value)
              }
            } : undefined}>
              <PaperPlaneIcon />
            </Button>
          </InputGroupText>
        </InputGroup>
      </CardFooter>
    </Card>
  );
};

export default VirtualAssistant;
