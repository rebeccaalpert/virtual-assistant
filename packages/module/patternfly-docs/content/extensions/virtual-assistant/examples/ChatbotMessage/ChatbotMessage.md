---
# Sidenav top-level section
# should be the same for all markdown files
section: PatternFly-AI
subsection: Chatbot
# Sidenav secondary level section
# should be the same for all markdown files
id: Chatbot messages
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
propComponents: [
'Message',
'PreviewAttachment',
'AttachmentEdit',
'ActionProps',
'SourcesCardProps'
]
sortValue: 6
---

import Message from '@patternfly/virtual-assistant/dist/dynamic/Message';
import PreviewAttachment from '@patternfly/virtual-assistant/dist/dynamic/PreviewAttachment';
import AttachmentEdit from '@patternfly/virtual-assistant/dist/dynamic/AttachmentEdit';
import SourcesCard from '@patternfly/virtual-assistant/dist/dynamic/SourcesCard';
import customImage from './custom_user_img.jpeg';
import { RobotIcon } from '@patternfly/react-icons/dist/esm/icons/robot-icon';


The `content` prop of the `<Message>` component is passed to a `<Markdown>` component (from [react-markdown](https://remarkjs.github.io/react-markdown/)), which is configured to translate plain text strings into PatternFly [`<Content>` components](/components/content) and code blocks into PatternFly [`<CodeBlock>` components.](/components/code-block)

### Bot messages

Messages from the chatbot will be marked with an "AI" label to clearly communicate the use of AI to users. The chatbot can display different `content` types, including plain text, code, or a loading animation (via `isLoading`).

<br />

By default, a date and timestamp is displayed with each message. You can update `timestamp` with a different [date and time format](/ux-writing/numerics) as needed.

```js file="./BotMessage.tsx"

```

### User messages

Messages from users have a different background color, in order to differentiate from bot messages. You can also display a custom avatar that is uploaded by the user.

```js file="./UserMessage.tsx"

```

### Messages with attachments

When [attachments](/patternfly-ai/chatbot/chatbot-attachments) are shared and displayed in the chatbot window, users will see a selectable and dismissible message that contains file details. Selecting the file can open a preview modal, which allows users to view or make edits to the file contents.

<br />

The `<PreviewAttachment>` component displays a modal with a read-only view of the attached file's contents. Selecting the "edit" button will open the `<AttachmentEdit>` component, which provides an interactive environment where users can make changes to the file.

<br />

If a `displayMode` is not passed to `<PreviewAttachment>` or `<AttachmentEdit>`, they both default to overlaying the default `displayMode` of the `<Chatbot>` component.

<br />

Note that this example does not actually apply any edits to the attached file. That logic depends on the implementation.

```js file="./MessageWithAttachment.tsx"

```

### Messages actions

You can add actions to a message, to allow users to interact with the message content. These actions can include:

- Feedback responses that allow users to rate a message as "good" or "bad".
- Copy and share controls that allow users to share the message content with others.
- A listen action, that will read the message content out loud.

<br />

Note that the logic for the actions is not built into the component and must be implemented by the consuming application.

```js file="./MessageWithResponseActions.tsx"

```

### Messages with sources

If you are using Retrieval-Augmented Generation, you may want to display sources. Sources allow you to paginate between any sources you provide. The API for a source requires a link at minimum, but we strongly recommend providing a more descriptive title and body so users have enough context. The title is limited to one line and the body is limited to two lines.

```js file="./MessageWithSources.tsx"

```
