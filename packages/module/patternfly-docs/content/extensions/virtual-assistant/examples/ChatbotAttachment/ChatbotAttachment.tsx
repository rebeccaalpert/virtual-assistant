import React from 'react';
import ChatbotToggle from '@patternfly/virtual-assistant/dist/dynamic/ChatbotToggle';
import Chatbot from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import ChatbotContent from '@patternfly/virtual-assistant/dist/dynamic/ChatbotContent';
import ChatbotWelcomePrompt from '@patternfly/virtual-assistant/dist/dynamic/ChatbotWelcomePrompt';
import ChatbotFooter, { ChatbotFootnote } from '@patternfly/virtual-assistant/dist/dynamic/ChatbotFooter';
import MessageBar from '@patternfly/virtual-assistant/dist/dynamic/MessageBar';
import MessageBox from '@patternfly/virtual-assistant/dist/dynamic/MessageBox';
import Message, { MessageProps } from '@patternfly/virtual-assistant/dist/dynamic/Message';
import FileDropZone from '@patternfly/virtual-assistant/dist/dynamic/FileDropZone';
import { DropEvent } from '@patternfly/react-core';
import FileDetailsLabel from '@patternfly/virtual-assistant/dist/dynamic/FileDetailsLabel';

const footnoteProps = {
  label: 'Lightspeed uses AI. Check for mistakes.',
  popover: {
    title: 'Verify accuracy',
    description: `While Lightspeed strives for accuracy, there's always a possibility of errors. It's a good practice to verify critical information from reliable sources, especially if it's crucial for decision-making or actions.`,
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
  }
};

const welcomePrompts = [
  {
    title: 'Topic 1',
    message: 'Helpful prompt for Topic 1'
  },
  {
    title: 'Topic 2',
    message: 'Helpful prompt for Topic 2'
  }
];

export const BasicDemo: React.FunctionComponent = () => {
  const onAttachmentClose = (attachmentId: string) => {
    const index = messages.findIndex((message) => message.attachmentId === attachmentId);
    const updatedMessages: MessageProps[] = [];
    if (index >= 0) {
      messages.forEach((message) => updatedMessages.push(message));
      delete updatedMessages[index].attachmentName;
      delete updatedMessages[index].attachmentId;
      delete updatedMessages[index].onAttachmentClick;
      delete updatedMessages[index].onAttachmentClose;
      setMessages(updatedMessages);
    }
  };
  const initialMessages: MessageProps[] = [
    {
      role: 'user',
      content: "I'm referring to this attachment for added context in our conversation.",
      name: 'User',
      attachmentName: 'auth-operator.yml',
      attachmentId: '1',
      onAttachmentClose
    },
    {
      role: 'bot',
      content: 'Great, I can reference this attachment throughout our conversation.',
      name: 'Bot'
    }
  ];

  const [chatbotVisible, setChatbotVisible] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File>();
  const [isLoadingFile, setIsLoadingFile] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<MessageProps[]>(initialMessages);

  const handleSend = (message) => alert(message);

  const handleFileDrop = (event: DropEvent, data: File[]) => {
    setFile(data[0]);
    setIsLoadingFile(true);
    setTimeout(() => {
      setIsLoadingFile(false);
    }, 1000);
  };

  // Attachments
  // --------------------------------------------------------------------------
  const handleAttach = () => {
    // eslint-disable-next-line no-console
    console.log('Attach button clicked');
  };

  const onClose = () => {
    setFile(undefined);
  };

  return (
    <>
      <ChatbotToggle
        toolTipLabel="Chatbot"
        isChatbotVisible={chatbotVisible}
        onToggleChatbot={() => setChatbotVisible(!chatbotVisible)}
      />
      <Chatbot isVisible={chatbotVisible}>
        <FileDropZone onFileDrop={handleFileDrop}>
          <>
            <ChatbotContent>
              <MessageBox>
                <ChatbotWelcomePrompt
                  title="Hello, Chatbot User"
                  description="How may I help you today?"
                  prompts={welcomePrompts}
                />
                {messages.map((message) => (
                  <Message key={message.name} {...message} />
                ))}
              </MessageBox>
            </ChatbotContent>
            <ChatbotFooter>
              {file && (
                <div>
                  <FileDetailsLabel fileName={file.name} isLoading={isLoadingFile} onClose={onClose} />
                </div>
              )}
              <MessageBar onSendMessage={handleSend} hasMicrophoneButton hasAttachButton handleAttach={handleAttach} />
              <ChatbotFootnote {...footnoteProps} />
            </ChatbotFooter>
          </>
        </FileDropZone>
      </Chatbot>
    </>
  );
};