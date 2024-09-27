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

### Chatbot header with controls

```js file="./ChatbotHeaderBasic.tsx"

```

### Chatbot header title

By default, HeaderTitle renders whatever children are passed in. Optionally, you can pass in a displayMode and props showOnEmbedded, showOnDocked, showOnFullScreen, and/or showOnDefault to render content conditionally.

```js file="./ChatbotHeaderTitle.tsx"

```
