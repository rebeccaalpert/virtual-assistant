import { FunctionComponent } from 'react';
import ChatbotAlert from '@patternfly/chatbot/dist/dynamic/ChatbotAlert';

export const AttachmentErrorExample: FunctionComponent = () => (
  <ChatbotAlert
    variant="danger"
    // eslint-disable-next-line no-console
    onClose={() => console.log('Clicked the close button')}
    title="Could not upload file"
  >
    Your file size must be less than 25 MB.
  </ChatbotAlert>
);
