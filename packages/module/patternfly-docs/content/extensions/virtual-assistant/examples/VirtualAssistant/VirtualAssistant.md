---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Virtual assistant
# Sidenav secondary level section
# should be the same for all markdown files
id: Virtual assistant
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['VirtualAssistant', 'VirtualAssistantHeader', 'VirtualAssistantAction', 'SystemMessageEntry', 'LoadingMessage', 'ConversationAlert', 'AssistantMessageEntry', 'UserMessageEntry', 'Citation', 'Citations']
sourceLink: https://github.com/patternfly/virtual-assistant/blob/main/packages/module/patternfly-docs/content/extensions/virtual-assistant/examples/VirtualAssistant/VirtualAssistant.md
---

import VirtualAssistant from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistant';
import VirtualAssistantAction from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistantAction';
import SystemMessageEntry from '@patternfly/virtual-assistant/dist/dynamic/SystemMessageEntry';
import LoadingMessage from '@patternfly/virtual-assistant/dist/dynamic/LoadingMessage';
import EllipsisVIcon from '@patternfly/react-icons/dist/dynamic/icons/ellipsis-v-icon';
import { GrinIcon, AngleDownIcon, UserIcon } from '@patternfly/react-icons';
import ConversationAlert from '@patternfly/virtual-assistant/dist/dynamic/ConversationAlert';
import AssistantMessageEntry from '@patternfly/virtual-assistant/dist/dynamic/AssistantMessageEntry';
import UserMessageEntry from '@patternfly/virtual-assistant/dist/dynamic/UserMessageEntry';
import Citations from '@patternfly/virtual-assistant/dist/dynamic/Citations';

The **virtual assistant** component renders body of the virtual assistant window.

### Basic example

A blank example of the virtual assistant body.

```js file="./VirtualAssistantExample.tsx"

```

### Full page example

You can make the assistant body use whole available space with the `isFullPage` property.

```js file="./VirtualAssistantFullPageExample.tsx"

```

### Using custom actions

Custom actions can be added to the assistant body using the `actions` property.


```js file="./VirtualAssistantWithActions.tsx"

```

### Using custom header

You can override the default header layout using the `header` property accepting any React node. It is recommended to use the original `CardHeader` component as a wrapper for your custom header. The default virtual assistant header component is also exported as `VirtualAssistantHeader` component.


```js file="./VirtualAssistantCustomHeaderExample.tsx"

```

### Customizing input title and placeholder

You can configure a custom title and placeholder input value using `title` and `inputPlaceholder` props.


```js file="./VirtualAssistantCustomText.tsx"

```

### Listening to messages

The `onSendMessage` property can be used for listening to the send button click.

```js file="./VirtualAssistantMessages.tsx"

```

### Disabling send button

Disabling the send button using `isSendButtonDisabled` prevents it from being clicked.

```js file="./VirtualAssistantDisableOnEmptyText.tsx"

```

### Conversation Alert

You can configure a custom title and variant input value using `title` and `variant` props.

```js file="./VirtualAssistantConversationAlert.tsx"

```

### System Message Entry

The `SystemMessageEntry` component provides a simple system message with an option for text links.


```js file="./VirtualAssistantSystemMessageEntry.tsx"

```

### Loading Messages

The `LoadingMessage` component shows a typing indicator for messages still being processed, introducing an intentional delay to simulate a smoother flow of conversation. Additionally, it allows for the use of a custom icon through the `icon` property.


```js file="./VirtualAssistantLoadingMessage.tsx"

```

### Assistant Message

This is an example of a message sent by assistant. Additionally, it allows for the use of a custom icon through the `icon` property.

```js file="./AssistantMessage.tsx"

```

### Assistant Message with follow-up options

This is an example of a message sent by assistant with follow-up options. Follow-up options are defined within `options` property.

```js file="./AssistantMessageWithFollowup.tsx"

```

### Assistant Message with dropdown options

This is an example of a message sent by assistant with dropdown options. Follow-up options are defined within `dropdown` property.

```js file="./AssistantMessageWithDropdown.tsx"

```

### User Message

This is an example of a message sent by user. 

```js file="./UserMessage.tsx"

```

### Adding citations

You can use the citations component to render an accordion of sources as a part of the assistant response. 

```js file="./VirtualAssistantCitationsExample.tsx"

```

### Using custom theme

In case you need to customize the look and feel of your virtual assistant, you can use your custom JSS theme and pass it through the `theme` property to the virtual assistant component. It will be merged with the default theme, which is also exported as `defaultTheme`.

```js file="./AssistantMessageNoRadiusExample.tsx"

```
