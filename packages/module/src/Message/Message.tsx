// ============================================================================
// Chatbot Main - Message
// ============================================================================

import React, { ReactNode } from 'react';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar, AvatarProps, Label, LabelGroupProps, Timestamp, Truncate } from '@patternfly/react-core';
import MessageLoading from './MessageLoading';
import CodeBlockMessage from './CodeBlockMessage/CodeBlockMessage';
import TextMessage from './TextMessage/TextMessage';
import FileDetailsLabel from '../FileDetailsLabel/FileDetailsLabel';
import ResponseActions, { ActionProps } from '../ResponseActions/ResponseActions';
import SourcesCard, { SourcesCardProps } from '../SourcesCard';
import ListItemMessage from './ListMessage/ListItemMessage';
import UnorderedListMessage from './ListMessage/UnorderedListMessage';
import OrderedListMessage from './ListMessage/OrderedListMessage';
import QuickStartTile from './QuickStarts/QuickStartTile';
import { QuickStart, QuickstartAction } from './QuickStarts/types';
import QuickResponse from './QuickResponse/QuickResponse';

export interface MessageAttachment {
  /** Name of file attached to the message */
  name: string;
  /** Unique identifier of file attached to the message */
  id?: string | number;
  /** Callback for when attachment label is clicked */
  onClick?: (event: React.MouseEvent, name: string, id?: string | number) => void;
  /** Callback for when attachment label is closed */
  onClose?: (event: React.MouseEvent, name: string, id?: string | number) => void;
  /** Whether file is loading */
  isLoading?: boolean;
  /** Aria label for attachment close button */
  closeButtonAriaLabel?: string;
  /** Custom test id for the language in the attachment component */
  languageTestId?: string;
  /** Custom test id for the loading spinner in the attachment component */
  spinnerTestId?: string;
}

export interface MessageExtraContent {
  /** Content to display before the main content */
  beforeMainContent?: React.ReactNode;
  /** Content to display after the main content */
  afterMainContent?: React.ReactNode;
  /** Content to display at the end */
  endContent?: React.ReactNode;
}

export interface MessageProps extends Omit<React.HTMLProps<HTMLDivElement>, 'role'> {
  /** Unique id for message */
  id?: string;
  /** Role of the user sending the message */
  role: 'user' | 'bot';
  /** Message content */
  content?: string;
  /** @beta To enable fast turnarounds on demos, this prop allows for injection of custom React components into the Message component. The goal of the ChatBot PatternFly extension is to reduce duplication of front-end code. We seek to provide a range of customizable components for use in ChatBot messages. If you are past the demo stage, please add a feature request. As a beta feature, this may be discontinued at any time. */
  extraContent?: MessageExtraContent;
  /** Name of the user */
  name?: string;
  /** Avatar src for the user */
  avatar: string;
  /** Timestamp for the message */
  timestamp?: string;
  /** Set this to true if message is being loaded */
  isLoading?: boolean;
  /** Array of attachments attached to a message */
  attachments?: MessageAttachment[];
  /** Props for message actions, such as feedback (positive or negative), copy button, share, and listen */
  actions?: {
    [key: string]: ActionProps;
  };
  /** Sources for message */
  sources?: SourcesCardProps;
  /** Label for the English word "AI," used to tag messages with role "bot" */
  botWord?: string;
  /** Label for the English "Loading message," displayed to screenreaders when loading a message */
  loadingWord?: string;
  codeBlockProps?: {
    'aria-label'?: string;
    className?: string;
  };
  /** Props for quick responses */
  quickResponses?: QuickResponse[];
  /** Props for quick responses container */
  quickResponseContainerProps?: Omit<LabelGroupProps, 'ref'>;
  /** Whether avatar is round */
  hasRoundAvatar?: boolean;
  /** Any additional props applied to the avatar, for additional customization  */
  avatarProps?: Omit<AvatarProps, 'alt'>;
  /** Props for QuickStart card */
  quickStarts?: {
    quickStart: QuickStart;
    onSelectQuickStart: (id?: string) => void;
    minuteWord?: string;
    minuteWordPlural?: string;
    prerequisiteWord?: string;
    prerequisiteWordPlural?: string;
    quickStartButtonAriaLabel?: string;
    className?: string;
    onClick?: () => void;
    action?: QuickstartAction;
  };
}

export const Message: React.FunctionComponent<MessageProps> = ({
  role,
  content,
  extraContent,
  name,
  avatar,
  timestamp,
  isLoading,
  actions,
  sources,
  botWord = 'AI',
  loadingWord = 'Loading message',
  codeBlockProps,
  quickResponses,
  quickResponseContainerProps = { numLabels: 5 },
  attachments,
  hasRoundAvatar = true,
  avatarProps,
  quickStarts,
  ...props
}: MessageProps) => {
  const { beforeMainContent, afterMainContent, endContent } = extraContent || {};
  let avatarClassName;
  if (avatarProps && 'className' in avatarProps) {
    const { className, ...rest } = avatarProps;
    avatarClassName = className;
    avatarProps = { ...rest };
  }
  // Keep timestamps consistent between Timestamp component and aria-label
  const date = new Date();
  const dateString = timestamp ?? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <section
      aria-label={`Message from ${role} - ${dateString}`}
      className={`pf-chatbot__message pf-chatbot__message--${role}`}
      {...props}
    >
      {/* We are using an empty alt tag intentionally in order to reduce noise on screen readers */}
      <Avatar
        className={`pf-chatbot__message-avatar ${hasRoundAvatar ? 'pf-chatbot__message-avatar--round' : ''} ${avatarClassName ? avatarClassName : ''}`}
        src={avatar}
        alt=""
        {...avatarProps}
      />
      <div className="pf-chatbot__message-contents">
        <div className="pf-chatbot__message-meta">
          {name && (
            <span className="pf-chatbot__message-name">
              <Truncate content={name} />
            </span>
          )}
          {role === 'bot' && (
            <Label variant="outline" isCompact>
              {botWord}
            </Label>
          )}
          <Timestamp date={date}>{timestamp}</Timestamp>
        </div>
        <div className="pf-chatbot__message-response">
          <div className="pf-chatbot__message-and-actions">
            {isLoading ? (
              <MessageLoading loadingWord={loadingWord} />
            ) : (
              <>
                {beforeMainContent && <>{beforeMainContent}</>}
                <Markdown
                  components={{
                    p: TextMessage,
                    code: ({ children }) => <CodeBlockMessage {...codeBlockProps}>{children}</CodeBlockMessage>,
                    ul: UnorderedListMessage,
                    ol: (props) => <OrderedListMessage {...props} />,
                    li: ListItemMessage
                  }}
                  remarkPlugins={[remarkGfm]}
                >
                  {content}
                </Markdown>
                {afterMainContent && <>{afterMainContent}</>}
              </>
            )}
            {!isLoading && sources && <SourcesCard {...sources} />}
            {quickStarts && quickStarts.quickStart && (
              <QuickStartTile
                quickStart={quickStarts.quickStart}
                onSelectQuickStart={quickStarts.onSelectQuickStart}
                minuteWord={quickStarts.minuteWord}
                minuteWordPlural={quickStarts.minuteWordPlural}
                prerequisiteWord={quickStarts.prerequisiteWord}
                prerequisiteWordPlural={quickStarts.prerequisiteWordPlural}
                quickStartButtonAriaLabel={quickStarts.quickStartButtonAriaLabel}
              />
            )}
            {!isLoading && actions && <ResponseActions actions={actions} />}
            {!isLoading && quickResponses && (
              <QuickResponse
                quickResponses={quickResponses}
                quickResponseContainerProps={quickResponseContainerProps}
              />
            )}
          </div>
          {attachments && (
            <div className="pf-chatbot__message-attachments-container">
              {attachments.map((attachment) => (
                <div key={attachment.id ?? attachment.name} className="pf-chatbot__message-attachment">
                  <FileDetailsLabel
                    fileName={attachment.name}
                    fileId={attachment.id}
                    onClose={attachment.onClose}
                    onClick={attachment.onClick}
                    isLoading={attachment.isLoading}
                    closeButtonAriaLabel={attachment.closeButtonAriaLabel}
                    languageTestId={attachment.languageTestId}
                    spinnerTestId={attachment.spinnerTestId}
                  />
                </div>
              ))}
            </div>
          )}
          {!isLoading && endContent && <>{endContent}</>}
        </div>
      </div>
    </section>
  );
};

export default Message;
