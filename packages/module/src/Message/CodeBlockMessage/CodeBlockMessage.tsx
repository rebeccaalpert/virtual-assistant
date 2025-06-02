// ============================================================================
// Chatbot Main - Message - Content - Code Block
// ============================================================================
import { useState, useRef, useId, useCallback, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// Import PatternFly components
import {
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  Button,
  Tooltip,
  ExpandableSection,
  ExpandableSectionToggle,
  ExpandableSectionProps,
  ExpandableSectionToggleProps,
  ExpandableSectionVariant
} from '@patternfly/react-core';

import { CheckIcon } from '@patternfly/react-icons/dist/esm/icons/check-icon';
import { CopyIcon } from '@patternfly/react-icons/dist/esm/icons/copy-icon';
import { ExpandableSectionForSyntaxHighlighter } from './ExpandableSectionForSyntaxHighlighter';

export interface CodeBlockMessageProps {
  /** Content rendered in code block */
  children?: React.ReactNode;
  /** Aria label applied to code block */
  'aria-label'?: string;
  /** Class name applied to code block */
  className?: string;
  /** Whether code block is expandable */
  isExpandable?: boolean;
  /** Additional props passed to expandable section if isExpandable is applied */
  expandableSectionProps?: Omit<ExpandableSectionProps, 'ref'>;
  /** Additional props passed to expandable toggle if isExpandable is applied */
  expandableSectionToggleProps?: ExpandableSectionToggleProps;
  /** Link text applied to expandable toggle when expanded */
  expandedText?: string;
  /** Link text applied to expandable toggle when collapsed */
  collapsedText?: string;
}

const CodeBlockMessage = ({
  children,
  className,
  'aria-label': ariaLabel,
  isExpandable = false,
  expandableSectionProps,
  expandableSectionToggleProps,
  expandedText = 'Show less',
  collapsedText = 'Show more',
  ...props
}: CodeBlockMessageProps) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonRef = useRef();
  const tooltipID = useId();
  const toggleId = useId();
  const contentId = useId();
  const codeBlockRef = useRef<HTMLDivElement>(null);

  const language = /language-(\w+)/.exec(className || '')?.[1];

  const onToggle = (isExpanded) => {
    setIsExpanded(isExpanded);
  };

  // Handle clicking copy button
  const handleCopy = useCallback((event, text) => {
    navigator.clipboard.writeText(text.toString());
    setCopied(true);
  }, []);

  // Reset copied state
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  });

  if (!String(children).includes('\n')) {
    return (
      <code {...props} className="pf-chatbot__message-inline-code">
        {children}
      </code>
    );
  }

  // Setup code block header
  const actions = (
    <>
      <CodeBlockAction>
        {language && <div className="pf-chatbot__message-code-block-language">{language}</div>}
        <Button
          ref={buttonRef}
          aria-label={ariaLabel ?? 'Copy code'}
          variant="plain"
          className="pf-chatbot__button--copy"
          onClick={(event) => handleCopy(event, children)}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
        <Tooltip id={tooltipID} content="Copy" position="top" triggerRef={buttonRef} />
      </CodeBlockAction>
    </>
  );

  return (
    <div className="pf-chatbot__message-code-block" ref={codeBlockRef}>
      <CodeBlock actions={actions}>
        <CodeBlockCode>
          <>
            {language ? (
              // SyntaxHighlighter doesn't work with ExpandableSection because it targets the direct child
              // Forked for now and adjusted to match what we need
              <ExpandableSectionForSyntaxHighlighter
                variant={ExpandableSectionVariant.truncate}
                isExpanded={isExpanded}
                isDetached
                toggleId={toggleId}
                contentId={contentId}
                language={language}
                {...expandableSectionProps}
              >
                <SyntaxHighlighter
                  {...props}
                  language={language}
                  style={obsidian}
                  PreTag="div"
                  CodeTag="div"
                  wrapLongLines
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </ExpandableSectionForSyntaxHighlighter>
            ) : (
              <ExpandableSection
                variant={ExpandableSectionVariant.truncate}
                isExpanded={isExpanded}
                isDetached
                toggleId={toggleId}
                contentId={contentId}
                {...expandableSectionProps}
              >
                {children}
              </ExpandableSection>
            )}
          </>
        </CodeBlockCode>
        {isExpandable && (
          <ExpandableSectionToggle
            isExpanded={isExpanded}
            onToggle={onToggle}
            direction="up"
            toggleId={toggleId}
            contentId={contentId}
            hasTruncatedContent
            className="pf-chatbot__message-code-toggle"
            {...expandableSectionToggleProps}
          >
            {isExpanded ? expandedText : collapsedText}
          </ExpandableSectionToggle>
        )}
      </CodeBlock>
    </div>
  );
};

export default CodeBlockMessage;
