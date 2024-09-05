---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Chat bots / AI
# Sidenav secondary level section
# should be the same for all markdown files
id: Chatbot attachment with menu
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents:
  [
    'Chatbot',
    'ChatbotToggle',
    'ChatbotContent',
    'ChatbotWelcomePrompt',
    'ChatbotFooter',
    'MessageBar',
    'ChatbotFootnote',
    'MessageBox',
    'Message'
  ]
---

import ChatbotToggle from '@patternfly/virtual-assistant/dist/dynamic/ChatbotToggle';
import Chatbot from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import ChatbotContent from '@patternfly/virtual-assistant/dist/dynamic/ChatbotContent';
import ChatbotWelcomePrompt from '@patternfly/virtual-assistant/dist/dynamic/ChatbotWelcomePrompt';
import ChatbotFooter, { ChatbotFootnote } from '@patternfly/virtual-assistant/dist/dynamic/ChatbotFooter';
import MessageBar from '@patternfly/virtual-assistant/dist/dynamic/MessageBar';
import MessageBox from '@patternfly/virtual-assistant/dist/dynamic/MessageBox';
import Message from '@patternfly/virtual-assistant/dist/dynamic/Message';
import FileDropZone from '@patternfly/virtual-assistant/dist/dynamic/FileDropZone';
import FileDetailsLabel from '@patternfly/virtual-assistant/dist/dynamic/FileDetailsLabel';
import { BellIcon, CalendarAltIcon, ClipboardIcon, CodeIcon, UploadIcon } from '@patternfly/react-icons';
import AttachmentIcon from './AttachmentIcon.svg';
import { useDropzone } from 'react-dropzone';

### Basic example

```js file="./ChatbotAttachmentMenu.tsx" isFullscreen

```
