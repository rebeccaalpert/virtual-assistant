// ============================================================================
// Chatbot Main - Messages - Feedback Card
// ============================================================================
import React from 'react';

// Import PatternFly components
import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Form,
  Label,
  LabelGroupProps,
  OUIAProps,
  TextArea,
  useOUIAProps
} from '@patternfly/react-core';
import QuickResponse from '../QuickResponse/QuickResponse';
import CloseButton from './CloseButton';

export interface UserFeedbackProps extends Omit<CardProps, 'onSubmit'>, OUIAProps {
  /** Additional classes for the pagination navigation container. */
  className?: string;
  /** Quick responses a user can select */
  quickResponses?: QuickResponse[];
  /** Props for quick responses container */
  quickResponseContainerProps?: Omit<LabelGroupProps, 'ref'>;
  /** Whether form includes text area */
  hasTextArea?: boolean;
  /** Placeholder of text area */
  textAreaPlaceholder?: string;
  /** Aria label for text area */
  textAreaAriaLabel?: string;
  /** Callback function for when text area changes */
  onTextAreaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  /** Callback function for when form is submitted */
  onSubmit: (selectedResponse?: string, additionalFeedback?: string) => void;
  /** Callback function for when close button is clicked */
  onClose?: () => void;
  /** Aria label for close button */
  closeButtonAriaLabel?: string;
  /** Label for the English word "Submit". */
  submitWord?: string;
  /** Label for English word "optional" */
  optionalWord?: string;
  /** Function to be executed on timeout. Relevant when the timeout prop is set. */
  onTimeout?: () => void;
  /** If set to true, the timeout is 8000 milliseconds. If a number is provided, card will
   * be dismissed after that amount of time in milliseconds.
   */
  timeout?: number | boolean;
  /** If the user hovers over the card and `timeout` expires, this is how long to wait
   * before finally dismissing the alert.
   */
  timeoutAnimation?: number;
  /** Callback for when mouse hovers over card */
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Callback for when mouse stops hovering over card */
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Value to overwrite the randomly generated data-ouia-component-id.*/
  ouiaId?: number | string;
  /** Set the value of data-ouia-safe. Only set to true when the component is in a static state, i.e. no animations are occurring. At all other times, this value must be false. */
  ouiaSafe?: boolean;
  /** Flag to indicate if the card is in a live region. */
  isLiveRegion?: boolean;
  /** Uniquely identifies the card. */
  id?: string;
  /** The heading level to use, default is h1 */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Whether to focus card on load */
  focusOnLoad?: boolean;
}

const UserFeedback: React.FunctionComponent<UserFeedbackProps> = ({
  className,
  title = 'Why did you choose this rating?',
  hasTextArea,
  textAreaAriaLabel = 'Provide additional feedback',
  textAreaPlaceholder = 'Provide additional feedback',
  onTextAreaChange,
  submitWord = 'Submit',
  quickResponses,
  quickResponseContainerProps,
  onSubmit,
  onClose,
  closeButtonAriaLabel = 'Close',
  optionalWord = 'optional',
  timeout = false,
  timeoutAnimation = 3000,
  onTimeout,
  onMouseEnter,
  onMouseLeave,
  ouiaId,
  ouiaSafe,
  isLiveRegion = false,
  id,
  headingLevel: HeadingLevel = 'h1',
  focusOnLoad = true,
  ...props
}: UserFeedbackProps) => {
  const [selectedResponse, setSelectedResponse] = React.useState<string>();
  const [value, setValue] = React.useState('');
  const [timedOut, setTimedOut] = React.useState(false);
  const [timedOutAnimation, setTimedOutAnimation] = React.useState(true);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean | undefined>();
  const [containsFocus, setContainsFocus] = React.useState<boolean | undefined>();
  const dismissed = timedOut && timedOutAnimation && !isMouseOver && !containsFocus;
  const divRef = React.useRef<HTMLDivElement>(null);
  const ouiaProps = useOUIAProps('User Feedback', ouiaId, ouiaSafe);

  React.useEffect(() => {
    if (focusOnLoad) {
      divRef.current?.focus();
    }
  }, []);

  React.useEffect(() => {
    const calculatedTimeout = timeout === true ? 8000 : Number(timeout);
    if (calculatedTimeout > 0) {
      const timer = setTimeout(() => setTimedOut(true), calculatedTimeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);

  React.useEffect(() => {
    const onDocumentFocus = () => {
      if (divRef.current) {
        if (divRef.current.contains(document.activeElement)) {
          setContainsFocus(true);
          setTimedOutAnimation(false);
        } else if (containsFocus) {
          setContainsFocus(false);
        }
      }
    };
    document.addEventListener('focus', onDocumentFocus, true);
    return () => document.removeEventListener('focus', onDocumentFocus, true);
  }, [containsFocus]);

  React.useEffect(() => {
    if (containsFocus === false || isMouseOver === false) {
      const timer = setTimeout(() => setTimedOutAnimation(true), timeoutAnimation);
      return () => clearTimeout(timer);
    }
  }, [containsFocus, isMouseOver, timeoutAnimation]);

  React.useEffect(() => {
    dismissed && onTimeout && onTimeout();
  }, [dismissed, onTimeout]);

  if (dismissed) {
    return null;
  }

  const myOnMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseOver(true);
    setTimedOutAnimation(false);
    onMouseEnter && onMouseEnter(ev);
  };

  const myOnMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseOver(false);
    onMouseLeave && onMouseLeave(ev);
  };

  return (
    /* card does not have ref forwarding; hence wrapper div */
    <div
      ref={divRef}
      onMouseEnter={myOnMouseEnter}
      onMouseLeave={myOnMouseLeave}
      {...(isLiveRegion && {
        'aria-live': 'polite',
        'aria-atomic': 'false'
      })}
      id={id}
      tabIndex={0}
      aria-label={title}
      {...ouiaProps}
    >
      <Card className={`pf-chatbot__feedback-card ${className ? className : ''}`} {...props}>
        <CardHeader
          actions={
            onClose ? { actions: <CloseButton onClose={onClose} ariaLabel={closeButtonAriaLabel} /> } : undefined
          }
        >
          <HeadingLevel className="pf-chatbot__feedback-card-title">
            {title} <Label className="pf-chatbot__feedback-card-optional">{optionalWord}</Label>
          </HeadingLevel>
        </CardHeader>
        <CardBody>
          <Form className="pf-chatbot__feedback-card-form">
            {quickResponses && (
              <QuickResponse
                quickResponses={quickResponses}
                quickResponseContainerProps={quickResponseContainerProps}
                onSelect={(id) => setSelectedResponse(id)}
              />
            )}
            {hasTextArea && (
              <TextArea
                value={value}
                onChange={(_event, value) => {
                  setValue(value);
                  onTextAreaChange && onTextAreaChange(_event, value);
                }}
                placeholder={textAreaPlaceholder}
                aria-label={textAreaAriaLabel}
                resizeOrientation="vertical"
              />
            )}
            <ActionGroup>
              <Button onClick={() => onSubmit(selectedResponse, value)}>{submitWord}</Button>
            </ActionGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserFeedback;
