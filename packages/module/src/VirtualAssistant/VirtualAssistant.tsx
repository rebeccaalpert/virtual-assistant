import React, { KeyboardEventHandler } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
  InputGroup,
  InputGroupText,
  Flex,
  TextArea
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import { PaperPlaneIcon } from '@patternfly/react-icons';
import ChatbotIcon from './icon-chatbot';

const useStyles = createUseStyles({
  card: {
    width: "350px",
    height: "550px",
    overflow: "hidden",
    borderRadius: "20px 20px 0 0",
    "@media screen and (max-width: 768px)": {
      height: "420px",
      width: "100%",
    },
  },
  cardHeader: {
    background: "linear-gradient(180deg, #C9190B 0%, #A30000 100%, #3D0000 100.01%)",
    boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.40) !important",
    height: "74px",
    marginBottom: "6px",
    "&:first-child": {
      paddingBlockStart: "10px",
      paddingInlineEnd: "10px",
    },
    "& .pf-v5-c-button.pf-m-plain": {
      color: "var(--pf-v5-global--Color--light-100)",
      paddingLeft: "0",
      paddingRight: "0",
      "& .pf-v5-svg": {
        width: ".8em",
        height: ".8em",
        verticalAlign: "1em",
      }
    }
  },
  cardTitle: {
    alignSelf: "center",
    color: "var(--pf-v5-global--Color--light-100)",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "27px",
    paddingLeft: "var(--pf-v5-global--spacer--sm)",
  },
  titleIcon: {
    marginLeft: "8px",
    marginTop: "10px",
    fontSize: "28px",
    color: "#C9190B",
  },
  titleIconWrapper: {
    display: "block",
    float: "left",
    width: "38px",
    height: "38px",
    background: "#fff",
    borderRadius: "20px",
    marginRight: "7px", /*space between*/
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
  /** Header title for the assistant */
  title?: string;
  /** Input's placeholder for the assistant */
  inputPlaceholder?: string;
  /** Input's content */
  message?: string;
  /** Header actions of the assistant */
  actions?: React.ReactNode;
  /** Input's content change */
  onChangeMessage?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  /** Fire when clicking the Send (Plane) icon */
  onSendMessage?: (message: string) => void;
  /** Disables the text input */
  isInputDisabled?: boolean;
  /** Disables the send button */
  isSendButtonDisabled?: boolean;
}

export const VirtualAssistant: React.FunctionComponent<VirtualAssistantProps> = ({
  children,
  title = 'Virtual Assistant',
  inputPlaceholder = 'Type a message...',
  message = '',
  actions,
  onChangeMessage,
  onSendMessage,
  isInputDisabled = false,
  isSendButtonDisabled = false,
}: VirtualAssistantProps) => {
  const classes = useStyles();

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (!event.shiftKey) {
        if (message.trim() === '' || isSendButtonDisabled) {
          event.preventDefault();
        } else {
          onSendMessage && onSendMessage(message);
        }
      }
    }
  };

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} actions={actions ? {
        actions
      } : undefined}>
        <Flex className="pf-v5-u-flex-direction-row pf-v5-u-justify-content-center">
          <div className={classes.titleIconWrapper} >
            <Icon className={classes.titleIcon}>
              <ChatbotIcon />
            </Icon>
          </div>
          <div className={classes.cardTitle} data-test-id="assistant-title">
            {title}
          </div>
        </Flex>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {children}
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <InputGroup className={classes.inputGroup}>
          <TextArea
            className={classes.textArea}
            placeholder={inputPlaceholder}
            value={message}
            onChange={onChangeMessage}
            onKeyPress={handleKeyPress}
            type="text"
            aria-label="Assistant input"
            isDisabled={isInputDisabled}
            data-test-id="assistant-text-input"
          />
          <InputGroupText>
            <Button isDisabled={isSendButtonDisabled} data-test-id="assistant-send-button" aria-label="Virtual assistant's message" variant="plain" className="pf-v5-u-px-sm" onClick={onSendMessage ? () => {
              onSendMessage(message);
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
