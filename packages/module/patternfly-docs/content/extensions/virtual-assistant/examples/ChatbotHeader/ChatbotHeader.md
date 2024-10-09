---
# Sidenav top-level section
# should be the same for all markdown files
section: PatternFly-AI
subsection: Chatbot
# Sidenav secondary level section
# should be the same for all markdown files
id: Chatbot header
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents:
  [
    'ChatbotHeader',
    'ChatbotHeaderMain',
    'ChatbotHeaderMenu',
    'ChatbotHeaderActions',
    'ChatbotHeaderTitle',
    'ChatbotHeaderOptionsDropdown',
    'ChatbotHeaderSelectorDropdown'
  ]
sortValue: 4
---

import {
ChatbotHeader,
ChatbotHeaderMain,
ChatbotHeaderMenu,
ChatbotHeaderActions,
ChatbotHeaderTitle,
ChatbotHeaderOptionsDropdown,
ChatbotHeaderSelectorDropdown
} from '@patternfly/virtual-assistant/dist/dynamic/ChatbotHeader';
import {
ChatbotDisplayMode
} from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import OutlinedWindowRestoreIcon from '@patternfly/react-icons/dist/esm/icons/outlined-window-restore-icon';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';
import OpenDrawerRightIcon from '@patternfly/react-icons/dist/esm/icons/open-drawer-right-icon';
import PFHorizontalLogoColor from './PF-HorizontalLogo-Color.svg';
import PFHorizontalLogoReverse from './PF-HorizontalLogo-Reverse.svg';

### Header sections

The chatbot header is persistent, and contains the title for the chatbot window, as well as any related controls and actions.

The `<ChatbotHeader>` has 2 sections:

- `<ChatbotHeaderMain>` contains the title and an optional menu toggle:
  - `<ChatbotHeaderTitle>` handles the layout and display of a title or image at different responsive sizes.
  - `<ChatbotHeaderMenu>` (optional) is placed on the left side of the header and used to toggle a chat history menu.
- `<ChatbotHeaderActions>` contains any additional controls:
  - The `<ChatbotHeaderSelectorDropdown>` component is a standard PatternFly dropdown that matches the chatbot styles.
  - The `<ChatbotHeaderOptionsDropdown>` component is a dropdown with a menu toggle that is intended to be used to update chatbot settings (like the display mode).

Your `<ChatbotHeader>` code structure should look like this:

```noLive
<ChatbotHeader>
  <ChatbotHeaderMain>
    <ChatbotHeaderMenu ... />
    <ChatbotHeaderTitle ... />
  </ChatbotHeaderMain>
  <ChatbotHeaderActions>
    <ChatbotHeaderSelectorDropdown ... />
    <ChatbotHeaderOptionsDropdown ... />
  </ChatbotHeaderActions>
</ChatbotHeader>
```

### Header title

By default, `<HeaderTitle>` renders any children that are passed in. Optionally, you can pass in a `displayMode`, `showOnEmbedded`, `showOnDocked`, `showOnFullScreen`, and/or `showOnDefault` to render content conditionally.

```js file="./ChatbotHeaderTitle.tsx"

```

### Header options

There are a variety of options and customizations you can make to the header, to adjust how information is displayed, or to add additional controls.

<br />

In this example, select the respective checkbox to toggle these features:

- **Menu:** Users can select the menu toggle to open a menu of additional options or actions.
- **Left-aligned logo**
- **Centered logo**
- **Selector dropdown:** Users can choose from preselected options in a dropdown menu. For example, they can toggle between AI models.
- **Options dropdown:** Users can select chatbot options from a menu. For example, they can switch between chatbot display modes.

```js file="./ChatbotHeaderBasic.tsx"

```
