import React from 'react';

import {
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadLogo,
  PageSidebarBody,
  PageSidebar,
  MastheadToggle,
  PageToggleButton,
  ToggleGroup,
  ToggleGroupItem
} from '@patternfly/react-core';
import Chatbot, { ChatbotDisplayMode } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import ChatbotContent from '@patternfly/chatbot/dist/dynamic/ChatbotContent';
import ChatbotWelcomePrompt from '@patternfly/chatbot/dist/dynamic/ChatbotWelcomePrompt';
import ChatbotFooter from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';
import MessageBar from '@patternfly/chatbot/dist/dynamic/MessageBar';
import MessageBox from '@patternfly/chatbot/dist/dynamic/MessageBox';
import Message, { MessageProps } from '@patternfly/chatbot/dist/dynamic/Message';
import ChatbotHeader, { ChatbotHeaderMain } from '@patternfly/chatbot/dist/dynamic/ChatbotHeader';
import { BarsIcon } from '@patternfly/react-icons';
import userAvatar from '../Messages/user_avatar.svg';
import patternflyAvatar from '../Messages/patternfly_avatar.jpg';

export const CompareChild = ({ name, input, hasNewInput, setIsSendButtonDisabled }) => {
  const [messages, setMessages] = React.useState<MessageProps[]>([]);
  const [announcement, setAnnouncement] = React.useState<string>();
  const scrollToBottomRef = React.useRef<HTMLDivElement>(null);
  const displayMode = ChatbotDisplayMode.embedded;

  // you will likely want to come up with your own unique id function; this is for demo purposes only
  const generateId = () => {
    const id = Date.now() + Math.random();
    return id.toString();
  };

  const handleSend = (input: string) => {
    const date = new Date();
    const newMessages: MessageProps[] = [];
    messages.forEach((message) => newMessages.push(message));
    newMessages.push({
      avatar: userAvatar,
      avatarProps: { isBordered: true },
      id: generateId(),
      name: 'You',
      role: 'user',
      content: input,
      timestamp: `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`
    });
    newMessages.push({
      avatar: patternflyAvatar,
      id: generateId(),
      name,
      role: 'bot',
      timestamp: `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`,
      isLoading: true
    });
    setMessages(newMessages);
    // make announcement to assistive devices that new messages have been added
    setAnnouncement(`Message from You: ${input}. Message from ${name} is loading.`);

    // this is for demo purposes only; in a real situation, there would be an API response we would wait for
    setTimeout(() => {
      const loadedMessages: MessageProps[] = [];
      // we can't use structuredClone since messages contains functions, but we can't mutate
      // items that are going into state or the UI won't update correctly
      newMessages.forEach((message) => loadedMessages.push(message));
      loadedMessages.pop();
      loadedMessages.push({
        id: generateId(),
        role: 'bot',
        content: `API response from ${name} goes here`,
        name,
        avatar: patternflyAvatar,
        isLoading: false,
        actions: {
          // eslint-disable-next-line no-console
          positive: { onClick: () => console.log('Good response') },
          // eslint-disable-next-line no-console
          negative: { onClick: () => console.log('Bad response') },
          // eslint-disable-next-line no-console
          copy: { onClick: () => console.log('Copy') },
          // eslint-disable-next-line no-console
          share: { onClick: () => console.log('Share') },
          // eslint-disable-next-line no-console
          listen: { onClick: () => console.log('Listen') }
        },
        timestamp: date.toLocaleString()
      });
      setMessages(loadedMessages);
      // make announcement to assistive devices that new message has loaded
      setAnnouncement(`Message from ${name}: API response goes here`);
      setIsSendButtonDisabled(false);
    }, 5000);
  };

  React.useEffect(() => {
    if (input) {
      handleSend(input);
    }
  }, [hasNewInput]);

  // Auto-scrolls to the latest message
  React.useEffect(() => {
    // don't scroll the first load, but scroll if there's a current stream or a new source has popped up
    if (messages.length > 0) {
      scrollToBottomRef.current?.scrollIntoView();
    }
  }, [messages]);

  return (
    <Chatbot displayMode={displayMode}>
      <ChatbotHeader className="compare-header">
        <ChatbotHeaderMain>{name}</ChatbotHeaderMain>
      </ChatbotHeader>
      <ChatbotContent>
        <MessageBox ariaLabel={`Scrollable message log for ${name}`} announcement={announcement}>
          <ChatbotWelcomePrompt title="Hello, Chatbot User" description="How may I help you today?" />
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
          <div ref={scrollToBottomRef}></div>
        </MessageBox>
      </ChatbotContent>
    </Chatbot>
  );
};

export const EmbeddedComparisonChatbotDemo: React.FunctionComponent = () => {
  const [input, setInput] = React.useState<string>();
  const [hasNewInput, setHasNewInput] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState('toggle-group-chatbot-1');
  const [showFirstChatbot, setShowFirstChatbot] = React.useState(true);
  const [showSecondChatbot, setShowSecondChatbot] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    // we want to show the first if we switch to the mobile toggle view
    // and reset/switch back to normal otherwise
    const updateChatbotVisibility = () => {
      if (window.innerWidth >= 901) {
        setShowFirstChatbot(true);
        setShowSecondChatbot(true);
      } else {
        setShowFirstChatbot(true);
        setShowSecondChatbot(false);
        setIsSelected('toggle-group-chatbot-1');
      }
    };
    window.addEventListener('resize', updateChatbotVisibility);

    return () => {
      window.removeEventListener('resize', updateChatbotVisibility);
    };
  }, []);

  // this only happens on mobile
  const handleChildToggleClick = (event) => {
    const id = event.currentTarget.id;
    setIsSelected(id);
    setShowSecondChatbot(!showSecondChatbot);
    setShowFirstChatbot(!showFirstChatbot);
  };

  const handleSend = (value: string) => {
    setInput(value);
    setHasNewInput(!hasNewInput);
    setIsSendButtonDisabled(true);
  };

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            id="fill-nav-toggle"
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo href="https://patternfly.org" target="_blank">
            Logo
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar isSidebarOpen={isSidebarOpen} id="fill-sidebar">
      <PageSidebarBody>Navigation</PageSidebarBody>
    </PageSidebar>
  );

  return (
    <Page masthead={masthead} sidebar={sidebar} isContentFilled>
      <div className="pf-chatbot__compare-container">
        <div className="pf-chatbot__compare-mobile-controls">
          <ToggleGroup aria-label="Select which chatbot to display">
            <ToggleGroupItem
              className="pf-chatbot__compare-toggle"
              text="ChatBot 1"
              buttonId="toggle-group-chatbot-1"
              isSelected={isSelected === 'toggle-group-chatbot-1'}
              onChange={handleChildToggleClick}
            />
            <ToggleGroupItem
              className="pf-chatbot__compare-toggle"
              text="ChatBot 2"
              buttonId="toggle-group-chatbot-2"
              isSelected={isSelected === 'toggle-group-chatbot-2'}
              onChange={handleChildToggleClick}
            />
          </ToggleGroup>
        </div>
        <div className="pf-chatbot__compare">
          <div
            className={`pf-chatbot__compare-item ${!showFirstChatbot ? 'pf-chatbot__compare-item-hidden' : undefined}`}
          >
            <CompareChild
              input={input}
              hasNewInput={hasNewInput}
              name="ChatBot 1"
              setIsSendButtonDisabled={setIsSendButtonDisabled}
            />
          </div>
          <div
            className={`pf-chatbot__compare-item ${!showSecondChatbot ? 'pf-chatbot__compare-item-hidden' : undefined}`}
          >
            <CompareChild
              input={input}
              hasNewInput={hasNewInput}
              name="ChatBot 2"
              setIsSendButtonDisabled={setIsSendButtonDisabled}
            />
          </div>
        </div>
        <ChatbotFooter>
          <MessageBar
            onSendMessage={handleSend}
            hasAttachButton={false}
            alwayShowSendButton
            isSendButtonDisabled={isSendButtonDisabled}
          />
        </ChatbotFooter>
      </div>
    </Page>
  );
};
