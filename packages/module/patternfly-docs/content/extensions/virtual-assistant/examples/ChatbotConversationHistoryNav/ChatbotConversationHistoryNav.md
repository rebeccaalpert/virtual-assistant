---
# Sidenav top-level section
# should be the same for all markdown files
section: PatternFly-AI
subsection: Chatbot
# Sidenav secondary level section
# should be the same for all markdown files
id: Chatbot conversation history
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['ChatbotConversationHistoryNav', 'Conversation']
---

import { ChatbotDisplayMode } from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import ChatbotConversationHistoryNav from '@patternfly/virtual-assistant/dist/dynamic/ChatbotConversationHistoryNav';
import {
ChatbotHeader,
ChatbotHeaderMain,
ChatbotHeaderMenu,
ChatbotHeaderTitle,
} from '@patternfly/virtual-assistant/dist/dynamic/ChatbotHeader';
import { DropdownItem, DropdownList, Checkbox } from '@patternfly/react-core';
import { ChatbotContent } from '@patternfly/virtual-assistant/dist/dynamic/ChatbotContent';

### Conversation history navigation

The chatbot conversation history is contained in an interactive drawer that allows users to interact with previous conversations or start a new conversation.

The `<ChatbotConversationHistoryNav>` component is a wrapper placed within the `<Chatbot>` that contains all other chatbot components in `drawerContent`. There is a focus trap so users can only tab within the drawer while it is open.

The code structure will look like this:

```
<Chatbot>
  <ChatbotConversationHistoryNav
    ...
    drawerContent={
        <>
            <ChatbotContent>
                <ChatbotMessageBox>
                ...
                <ChatbotMessageBox>
            </ChatbotContent>
            <ChatbotFooter ... />
        </>
    }>
  </ChatbotConversationHistoryNav>
</Chatbot>
```

The conversation history drawer looks different depending on the `displayMode` of the parent `<Chatbot>`. (As shown in the [main chatbot demo](/patternfly-ai/chatbot/chatbot/react-demos#basic-chatbot).):

- `Default` and `docked` display modes display the conversation history on top of the rest of the chatbot content, with a PatternFly backdrop between the drawer panel and drawer content.
- `Fullscreen` and `embedded` display modes display the conversation history in line with the drawer content.

### Drawer with search and "new chat" button

In the conversation history drawer, users can search previous chatbot conversations via an input field. They can also start new conversations via a "New chat" button. Both the search input field and "New chat" buttons are optional.

```js file="./ChatbotHeaderDrawer.tsx"

```

### Drawer with conversation actions

Actions can be added to conversations with the `menuItems` prop. Optionally, you can also add a `className` to the menu with `menuClassName`, change the default aria-label and tooltip content with `label`, and add an `onSelect` callback for when a user selects an item.

```js file="./ChatbotHeaderDrawerWithActions.tsx"

```

### Drawer in header

This example illustrates how to use `aria-expanded` and the `<ChatbotHeaderMenu>` with the drawer.

```js file="./ChatbotHeaderDrawerInHeader.tsx"

```
