import { useState, useRef, useCallback, useEffect, FunctionComponent, ReactNode } from 'react';
import {
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  DropdownItem,
  DropdownList,
  Flex,
  FlexItem,
  Label,
  MenuToggle,
  Select,
  SelectList,
  SelectOption,
  Title
} from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import Chatbot, { ChatbotDisplayMode } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import ChatbotContent from '@patternfly/chatbot/dist/dynamic/ChatbotContent';
import ChatbotFooter from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';
import MessageBar from '@patternfly/chatbot/dist/dynamic/MessageBar';
import MessageBox from '@patternfly/chatbot/dist/dynamic/MessageBox';
import Message, { MessageProps } from '@patternfly/chatbot/dist/dynamic/Message';
import ChatbotHeader, { ChatbotHeaderMain, ChatbotHeaderTitle } from '@patternfly/chatbot/dist/dynamic/ChatbotHeader';
import { RhUiAiEditIcon, RhUiImageFillIcon } from '@patternfly/react-icons';
import RhUiAddIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-add-icon';
import RhUiClipboardIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-clipboard-icon';
import RhUiCodeIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-code-icon';
import RhUiUploadIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-upload-icon';
import { useDropzone } from 'react-dropzone';
import userAvatar from '../Messages/user_avatar.svg';
import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/chatbot/dist/css/main.css';

const sampleCode = `apiVersion: v1
kind: ConfigMap
metadata:
  name: canvas-demo
data:
  greeting: Hello, how can I help you today?
`;

const date = new Date();

const initialMessages: MessageProps[] = [
  {
    id: '1',
    role: 'bot',
    content: 'How can I help?',
    name: 'Bot',
    timestamp: date.toLocaleString()
  },
  {
    id: '2',
    role: 'user',
    content: 'I want to live edit YAML code using canvas mode',
    name: 'You',
    avatar: userAvatar,
    avatarProps: { isBordered: true },
    timestamp: date.toLocaleString()
  },
  {
    id: '3',
    role: 'bot',
    content: 'The canvas mode text editor is ready. Edit, share or ask me to change something for you.',
    name: 'Bot',
    timestamp: date.toLocaleString(),
    attachments: [{ name: 'canvas mode.yaml', id: 'canvas-mode' }]
  }
];

const modelOptions = ['GPT-4', 'GPT-3.5', 'Claude', 'Llama 2'];

export const Canvas: FunctionComponent = () => {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  const [announcement, setAnnouncement] = useState<string>();
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const [isModelSelectOpen, setIsModelSelectOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('GPT-4');
  const [showCanvasLabel, setShowCanvasLabel] = useState(true);
  const [isCanvasOpen, setIsCanvasOpen] = useState(true);
  const [code, setCode] = useState(sampleCode);
  const scrollToBottomRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLSpanElement>(null);
  const displayMode = ChatbotDisplayMode.fullscreen;

  const { open, getInputProps } = useDropzone({
    multiple: true,
    // eslint-disable-next-line no-console
    onDropAccepted: () => console.log('fileUploaded')
  });

  const generateId = () => {
    const id = Date.now() + Math.random();
    return id.toString();
  };

  const handleSend = useCallback(
    (input: string) => {
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
        id: generateId(),
        name: 'Bot',
        role: 'bot',
        timestamp: `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`,
        isLoading: true
      });
      setMessages(newMessages);
      setAnnouncement(`Message from You: ${input}. Message from Bot is loading.`);
      setIsSendButtonDisabled(true);

      setTimeout(() => {
        const loadedMessages: MessageProps[] = [];
        newMessages.forEach((message) => loadedMessages.push(message));
        loadedMessages.pop();
        loadedMessages.push({
          id: generateId(),
          role: 'bot',
          content: 'API response from Bot goes here',
          name: 'Bot',
          isLoading: false,
          actions: {
            // eslint-disable-next-line no-console
            positive: { onClick: () => console.log('Good response') },
            // eslint-disable-next-line no-console
            negative: { onClick: () => console.log('Bad response') },
            // eslint-disable-next-line no-console
            copy: { onClick: () => console.log('Copy') },
            // eslint-disable-next-line no-console
            download: { onClick: () => console.log('Download') },
            // eslint-disable-next-line no-console
            listen: { onClick: () => console.log('Listen') }
          },
          timestamp: date.toLocaleString()
        });
        setMessages(loadedMessages);
        setAnnouncement('Message from Bot: API response goes here');
        setIsSendButtonDisabled(false);
      }, 5000);
    },
    [messages]
  );

  useEffect(() => {
    if (messages.length > 3) {
      scrollToBottomRef.current?.scrollIntoView();
    }
  }, [messages]);

  const onModelSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined
  ) => {
    setSelectedModel(value as string);
    setIsModelSelectOpen(false);
  };

  const openCanvas = () => {
    setShowCanvasLabel(true);
    setIsCanvasOpen(true);
  };

  const closeCanvasMode = () => {
    setShowCanvasLabel(false);
    setIsCanvasOpen(false);
  };

  const attachMenuItems: ReactNode = (
    <>
      <DropdownList>
        <DropdownItem value="canvas" id="canvas">
          {showCanvasLabel ? 'Disable' : 'Enable'} Canvas
        </DropdownItem>
        <Divider key="divider-1" />
        <DropdownItem value="Logs" id="logs" icon={<RhUiClipboardIcon />}>
          Logs
        </DropdownItem>
        <DropdownItem value="YAML - Status" id="yaml-status" icon={<RhUiCodeIcon />}>
          YAML - Status
        </DropdownItem>
        <DropdownItem value="YAML - All contents" id="yaml-all" icon={<RhUiCodeIcon />}>
          YAML - All contents
        </DropdownItem>
      </DropdownList>
      <Divider key="divider-2" />
      <DropdownList>
        <DropdownItem value="Upload from computer" id="upload" icon={<RhUiUploadIcon />} onClick={open}>
          Upload from computer
        </DropdownItem>
      </DropdownList>
    </>
  );

  const panelContent = (
    <DrawerPanelContent
      isResizable
      isGlass
      defaultSize="50%"
      minSize="20%"
      id="chatbot-canvas-panel"
      aria-label="Canvas"
      resizeAriaLabel="Resize canvas"
      className="pf-chatbot__canvas-panel"
    >
      <div className="pf-chatbot__canvas-panel-body">
        <DrawerHead>
          <Flex
            className="pf-chatbot__canvas-head"
            spaceItems={{ default: 'spaceItemsMd' }}
            alignItems={{ default: 'alignItemsCenter' }}
          >
            <FlexItem>
              <span tabIndex={isCanvasOpen ? 0 : -1} ref={drawerRef}>
                <Title headingLevel="h2" size="lg">
                  Edit code
                </Title>
              </span>
            </FlexItem>
            <FlexItem>
              <Label variant="outline" icon={<RhUiAiEditIcon />}>
                Generated with AI
              </Label>
            </FlexItem>
          </Flex>
          <DrawerActions>
            <DrawerCloseButton aria-label="Close canvas" onClose={() => setIsCanvasOpen(false)} />
          </DrawerActions>
        </DrawerHead>
        <div className="pf-chatbot__canvas-editor">
          <CodeEditor
            isFullHeight
            isLineNumbersVisible
            isLanguageLabelVisible
            isCopyEnabled
            code={code}
            language={Language.yaml}
            onCodeChange={setCode}
            loading={<div className="pf-chatbot__canvas-editor-loading" />}
          />
        </div>
      </div>
    </DrawerPanelContent>
  );

  return (
    <>
      {/* This is required for react-dropzone to work in Safari and Firefox */}
      <input {...getInputProps()} hidden />
      <Chatbot displayMode={displayMode}>
        <div className="pf-chatbot__canvas">
          <Drawer
            className="pf-chatbot__canvas-drawer"
            isExpanded={isCanvasOpen}
            isInline
            position="end"
            onExpand={() => drawerRef.current?.focus()}
          >
            <DrawerContent panelContent={panelContent}>
              <DrawerContentBody className="pf-chatbot__canvas-body">
                <div className="pf-chatbot__canvas-column">
                  <ChatbotHeader>
                    <ChatbotHeaderMain>
                      <ChatbotHeaderTitle>ChatBot</ChatbotHeaderTitle>
                    </ChatbotHeaderMain>
                  </ChatbotHeader>
                  <ChatbotContent>
                    <MessageBox ariaLabel="Scrollable message log for ChatBot" announcement={announcement}>
                      {messages.map((message) => (
                        <Message
                          key={message.id}
                          {...message}
                          attachments={message.attachments?.map((attachment) => ({
                            ...attachment,
                            onClick: openCanvas
                          }))}
                        />
                      ))}
                      <div ref={scrollToBottomRef}></div>
                    </MessageBox>
                  </ChatbotContent>
                  <ChatbotFooter>
                    <MessageBar
                      onSendMessage={handleSend}
                      attachButtonPosition="start"
                      alwayShowSendButton
                      isSendButtonDisabled={isSendButtonDisabled}
                      attachMenuProps={{
                        isAttachMenuOpen,
                        setIsAttachMenuOpen,
                        attachMenuItems,
                        onAttachMenuOnOpenChangeKeys: ['Escape', 'Tab'],
                        onAttachMenuSelect: (_ev, value) => {
                          // eslint-disable-next-line no-console
                          console.log('selected', value);
                          if (value === 'canvas') {
                            if (showCanvasLabel) {
                              closeCanvasMode();
                            } else {
                              setShowCanvasLabel(true);
                              setIsCanvasOpen(true);
                            }
                          }
                          setIsAttachMenuOpen(false);
                        },
                        onAttachMenuToggleClick: () => setIsAttachMenuOpen(!isAttachMenuOpen)
                      }}
                      buttonProps={{
                        attach: {
                          icon: <RhUiAddIcon />,
                          tooltipContent: 'Message actions',
                          'aria-label': 'Message actions'
                        }
                      }}
                      additionalActions={
                        <>
                          {showCanvasLabel && (
                            <Label
                              isClickable
                              closeBtnAriaLabel="Remove Canvas mode"
                              onClose={closeCanvasMode}
                              onClick={openCanvas}
                              aria-expanded={isCanvasOpen}
                              icon={<RhUiImageFillIcon />}
                            >
                              Canvas
                            </Label>
                          )}
                          <Select
                            isOpen={isModelSelectOpen}
                            selected={selectedModel}
                            shouldFocusToggleOnSelect
                            onSelect={onModelSelect}
                            onOpenChange={(isOpen) => setIsModelSelectOpen(isOpen)}
                            toggle={(toggleRef) => (
                              <MenuToggle
                                ref={toggleRef}
                                variant="plainText"
                                className="pf-chatbot__canvas-model-toggle"
                                onClick={() => setIsModelSelectOpen(!isModelSelectOpen)}
                                isExpanded={isModelSelectOpen}
                                aria-label={`${selectedModel}, Select a model`}
                              >
                                {selectedModel}
                              </MenuToggle>
                            )}
                          >
                            <SelectList>
                              {modelOptions.map((option) => (
                                <SelectOption key={option} value={option}>
                                  {option}
                                </SelectOption>
                              ))}
                            </SelectList>
                          </Select>
                        </>
                      }
                    />
                  </ChatbotFooter>
                </div>
              </DrawerContentBody>
            </DrawerContent>
          </Drawer>
        </div>
      </Chatbot>
    </>
  );
};
