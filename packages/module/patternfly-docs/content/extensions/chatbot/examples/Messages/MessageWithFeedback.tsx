import React from 'react';
import Message from '@patternfly/chatbot/dist/dynamic/Message';
import patternflyAvatar from './patternfly_avatar.jpg';

export const MessageWithFeedbackExample: React.FunctionComponent = () => {
  const [showUserFeedbackForm, setShowUserFeedbackForm] = React.useState(false);
  const [showCompletionForm, setShowCompletionForm] = React.useState(false);
  const [launchButton, setLaunchButton] = React.useState<string>();
  const positiveRef = React.useRef<HTMLButtonElement>(null);
  const negativeRef = React.useRef<HTMLButtonElement>(null);
  const feedbackId = 'user-feedback-form';
  const completeId = 'user-feedback-received';

  const getCurrentCard = () => {
    if (showUserFeedbackForm) {
      return feedbackId;
    }
    if (showCompletionForm) {
      return completeId;
    }
  };

  const isExpanded = showUserFeedbackForm || showCompletionForm;

  const focusLaunchButton = () => {
    if (launchButton === 'positive') {
      positiveRef.current?.focus();
    }
    if (launchButton === 'negative') {
      negativeRef.current?.focus();
    }
  };

  return (
    <>
      <Message
        isLiveRegion
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with user feedback flow; click on a message action to launch the feedback flow. Click submit to see the thank you message."
        actions={{
          positive: {
            onClick: () => {
              setShowUserFeedbackForm(true);
              setShowCompletionForm(false);
              setLaunchButton('positive');
            },
            /* These are important for accessibility */
            'aria-expanded': isExpanded,
            'aria-controls': getCurrentCard(),
            isClicked: launchButton === 'positive',
            ref: positiveRef
          },
          negative: {
            onClick: () => {
              setShowUserFeedbackForm(true);
              setShowCompletionForm(false);
              setLaunchButton('negative');
            },
            /* These are important for accessibility */
            'aria-expanded': isExpanded,
            'aria-controls': getCurrentCard(),
            isClicked: launchButton === 'negative',
            ref: negativeRef
          }
        }}
        userFeedbackForm={
          showUserFeedbackForm
            ? /* eslint-disable indent */
              {
                quickResponses: [
                  { id: '1', content: 'Correct' },
                  { id: '2', content: 'Easy to understand' },
                  { id: '3', content: 'Complete' }
                ],
                onSubmit: (quickResponse, additionalFeedback) => {
                  alert(`Selected ${quickResponse} and received the additional feedback: ${additionalFeedback}`);
                  setShowUserFeedbackForm(false);
                  setShowCompletionForm(true);
                  focusLaunchButton();
                },
                hasTextArea: true,
                onClose: () => {
                  setShowUserFeedbackForm(false);
                  focusLaunchButton();
                },
                id: feedbackId
              }
            : undefined
          /* eslint-enable indent */
        }
        userFeedbackComplete={
          showCompletionForm
            ? /* eslint-disable indent */
              {
                onClose: () => {
                  setShowCompletionForm(false);
                  focusLaunchButton();
                },
                id: completeId
              }
            : undefined
          /* eslint-enable indent */
        }
      />
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with feedback form only"
        userFeedbackForm={{
          quickResponses: [
            { id: '1', content: 'Correct' },
            { id: '2', content: 'Easy to understand' },
            { id: '3', content: 'Complete' }
          ],
          onSubmit: (quickResponse, additionalFeedback) =>
            alert(`Selected ${quickResponse} and received the additional feedback: ${additionalFeedback}`),
          hasTextArea: true,
          // eslint-disable-next-line no-console
          onClose: () => console.log('closed feedback form'),
          focusOnLoad: false
        }}
      />
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with feedback form that doesn't include text area"
        userFeedbackForm={{
          quickResponses: [
            { id: '1', content: 'Correct' },
            { id: '2', content: 'Easy to understand' },
            { id: '3', content: 'Complete' }
          ],
          onSubmit: (quickResponse) => alert(`Selected ${quickResponse}`),
          // eslint-disable-next-line no-console
          onClose: () => console.log('closed feedback form'),
          focusOnLoad: false
        }}
      />
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with feedback form without close button"
        userFeedbackForm={{
          quickResponses: [
            { id: '1', content: 'Correct' },
            { id: '2', content: 'Easy to understand' },
            { id: '3', content: 'Complete' }
          ],
          onSubmit: (quickResponse, additionalFeedback) =>
            alert(`Selected ${quickResponse} and received the additional feedback: ${additionalFeedback}`),
          focusOnLoad: false
        }}
      />
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with completion message"
        // eslint-disable-next-line no-console
        userFeedbackComplete={{ onClose: () => console.log('closed completion message'), focusOnLoad: false }}
      />
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content="Bot message with completion message without close button"
        userFeedbackComplete={{ focusOnLoad: false }}
      />
    </>
  );
};
