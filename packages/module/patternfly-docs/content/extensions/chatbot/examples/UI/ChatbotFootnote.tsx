import React from 'react';
import { ChatbotFootnote } from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';

export const FootnoteDemo: React.FunctionComponent = () => (
  <ChatbotFootnote
    label="ChatBot uses AI. Check for mistakes."
    popover={{
      title: 'Verify accuracy',
      description: `While ChatBot strives for accuracy, there's always a possibility of errors. It's a good practice to verify critical information from reliable sources, especially if it's crucial for decision-making or actions.`,
      bannerImage: {
        src: 'https://cdn.dribbble.com/userupload/10651749/file/original-8a07b8e39d9e8bf002358c66fce1223e.gif',
        alt: 'Example image for footnote popover'
      },
      cta: {
        label: 'Got it',
        onClick: () => {
          alert('Do something!');
        }
      },
      link: {
        label: 'Learn more',
        url: 'https://www.redhat.com/'
      }
    }}
  />
);
