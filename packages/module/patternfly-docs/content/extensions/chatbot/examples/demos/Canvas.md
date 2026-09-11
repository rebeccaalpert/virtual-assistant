---
id: Canvas
section: patterns
source: demo
---

import { useState, useRef, useCallback, useEffect, FunctionComponent, ReactNode } from 'react';
import {
Brand,
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
Popover,
Select,
SelectList,
SelectOption,
Title,
Tooltip
} from '@patternfly/react-core';
import { CodeEditor, CodeEditorControl, Language } from '@patternfly/react-code-editor';
import Chatbot, { ChatbotDisplayMode } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import ChatbotContent from '@patternfly/chatbot/dist/dynamic/ChatbotContent';
import ChatbotFooter, { ChatbotFootnote } from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';
import MessageBar from '@patternfly/chatbot/dist/dynamic/MessageBar';
import MessageBox from '@patternfly/chatbot/dist/dynamic/MessageBox';
import Message from '@patternfly/chatbot/dist/dynamic/Message';
import ChatbotConversationHistoryNav from '@patternfly/chatbot/dist/dynamic/ChatbotConversationHistoryNav';
import ChatbotHeader, {
ChatbotHeaderActions,
ChatbotHeaderCloseButton,
ChatbotHeaderMain,
ChatbotHeaderMenu,
ChatbotHeaderTitle
} from '@patternfly/chatbot/dist/dynamic/ChatbotHeader';
import RhUiImageFillIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-image-fill-icon';
import RhUiAddIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-add-icon';
import RhUiClipboardIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-clipboard-icon';
import RhUiCodeIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-code-icon';
import RhUiExportIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-export-icon';
import RhUiRedoIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-redo-icon';
import RhUiUndoIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-undo-icon';
import RhUiUploadIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-upload-icon';
import RhUiAiEditIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-ai-edit-icon';
import RhUiAiInfoIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-ai-info-icon';
import { useDropzone } from 'react-dropzone';
import PFIconLogoColor from '../UI/PF-IconLogo-Color.svg';
import PFIconLogoReverse from '../UI/PF-IconLogo-Reverse.svg';
import userAvatar from '../Messages/user_avatar.svg';

### Canvas

To let users work with generated or editable content alongside a conversation, you can open a canvas drawer next to a fullscreen ChatBot. The following demo places the ChatBot on the left and a PatternFly drawer on the right. Canvas content is fully flexible&mdash;this example uses a PatternFly [`<CodeEditor>`](/components/code-editor), but you can render any React node in the canvas.

Canvas mode is launched by clicking the **Canvas** label below the message bar. You can also enable or disable canvas mode from the attach menu, and dismiss the label to exit canvas mode.

Apply the `pf-chatbot__canvas*` classes from `@patternfly/chatbot` so the drawer matches ChatBot backgrounds and fills the fullscreen layout.
<br /><br />
Your code structure should look like this:

```noLive
<Chatbot displayMode={ChatbotDisplayMode.fullscreen}>
  <div className="pf-chatbot__canvas">
    <Drawer className="pf-chatbot__canvas-drawer" isExpanded={...} isInline position="end">
      <DrawerContent panelContent={/* CodeEditor or other canvas content */}>
        <DrawerContentBody className="pf-chatbot__canvas-body">
          <ChatbotHeader>
            <ChatbotHeaderMain>
              <ChatbotHeaderMenu ... />
              <ChatbotHeaderTitle>{/* PatternFly logo */}</ChatbotHeaderTitle>
            </ChatbotHeaderMain>
            <ChatbotHeaderActions>
              <ChatbotHeaderCloseButton ... />
            </ChatbotHeaderActions>
          </ChatbotHeader>
          <ChatbotContent ... />
          <ChatbotFooter ... >
            <MessageBar additionalActions={<Label ...>Canvas</Label>} ... />
            <ChatbotFootnote label="Always review AI-generated content prior to use." />
          </ChatbotFooter>
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  </div>
</Chatbot>
```

```js file="./Canvas.tsx" isFullscreen

```
