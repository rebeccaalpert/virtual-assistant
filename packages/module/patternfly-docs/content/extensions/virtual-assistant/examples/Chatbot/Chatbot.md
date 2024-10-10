---
# Sidenav top-level section
# should be the same for all markdown files
section: PatternFly-AI
subsection: Chatbot
# Sidenav secondary level section
# should be the same for all markdown files
id: Chatbot container
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: [
'Chatbot',
'ChatbotContent', 
'MessageBox',
'ChatbotWelcomePrompt',
'WelcomePrompt'
]
sortValue: 2
---

import Chatbot, { ChatbotDisplayMode } from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import ChatbotWelcomePrompt from '@patternfly/virtual-assistant/dist/dynamic/ChatbotWelcomePrompt';

### Container

The PatternFly chatbot is a separate window that overlays or is embedded within other UI content. This container can be shown and hidden via [the chatbot toggle.](/patternfly-ai/chatbot/chatbot-toggle)

The `<Chatbot>` component is the container that encompasses the chatbot experience. It adapts to various display modes and supports both light and dark themes. 

The "embedded" display mode is meant to be used within a [PatternFly page](/components/page) or other container within your product.

```js file="./ChatbotContainer.tsx" isFullscreen

```

### Content and message box

The `<ChatbotContent>` component is the container that is placed within the `<Chatbot>`, between the [`<ChatbotHeader>`](/patternfly-ai/chatbot/chatbot-header) and [`<ChatbotFooter>`](/patternfly-ai/chatbot/chatbot-footer).

It usually contains a `<ChatbotMessageBox>` for displaying messages.

Your code structure should look like this:

```noLive
<Chatbot>
  <ChatbotHeader ... />
  <ChatbotContent>
    <ChatbotMessageBox>
    ...
    <ChatbotMessageBox>
  </ChatbotContent>
  <ChatbotFooter ... />
</Chatbot>
```

### Welcome prompt

To introduce users to the chatbot experience, a welcome prompt can fill the message box before they input their first message. This brief message should follow our [conversation design guidelines](/patternfly-ai/conversation-design) to welcome users to the chatbot experience and encourage them to interact.

To provide users with a more specific direction, you can also include optional welcome prompts.

```js file="./ChatbotWelcomePrompt.tsx"

```
