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
propComponents: ['VirtualAssistant']
sourceLink: https://github.com/patternfly/virtual-assistant/blob/main/packages/module/patternfly-docs/content/extensions/virtual-assistant/examples/VirtualAssistant/VirtualAssistant.md
---

import VirtualAssistant from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistant';

The **virtual assistant** description

### Basic example

Blank basic example of virtual assistant

```js file="./VirtualAssistantExample.tsx"

```

### Setting a different title and placeholder for the input

You can configure a different title and placeholder input value


```js file="./VirtualAssistantCustomText.tsx"

```

### Listening to messages

You can listen to messages using `onMessage`

```js file="./VirtualAssistantMessages.tsx"

```

### Using custom actions

You can add custom actions to your assistant


```js file="./VirtualAssistantWithActions.tsx"

```
