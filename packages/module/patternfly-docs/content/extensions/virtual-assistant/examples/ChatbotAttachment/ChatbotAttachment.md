---
# Sidenav top-level section
# should be the same for all markdown files
section: PatternFly-AI
subsection: Chatbot
# Sidenav secondary level section
# should be the same for all markdown files
id: Chatbot attachments
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['AttachMenu', 'AttachmentEdit', 'FileDetails', 'FileDetailsLabel', 'FileDropZone', 'PreviewAttachment']
sortValue: 7
---

import AttachmentEdit from '@patternfly/virtual-assistant/dist/dynamic/AttachmentEdit';
import FileDetails from '@patternfly/virtual-assistant/dist/dynamic/FileDetails';
import FileDetailsLabel from '@patternfly/virtual-assistant/dist/dynamic/FileDetailsLabel';
import FileDropZone from '@patternfly/virtual-assistant/dist/dynamic/FileDropZone';
import { PreviewAttachment } from '@patternfly/virtual-assistant/dist/dynamic/PreviewAttachment';
import ChatbotAlert from '@patternfly/virtual-assistant/dist/dynamic/ChatbotAlert';

We are using [react-dropzone](https://react-dropzone.js.org) for opening the file dialog and handling drag and drop. It does not process files or provide any way to make HTTP requests to a server. If you need this, [react-dropzone](https://react-dropzone.js.org) suggests [filepond](https://pqina.nl/filepond/) or [uppy.io](https://uppy.io/).

### Attachment label

When an attachment is successfully uploaded, a label will appear in the message box. There are several label variants that cover different attachment states, including:

- **Plain:** Default attachment labels, which display the filename and extension.
- **Closeable:** Attachments that can be dismissed.
- **Clickable:** Attachments that can be selected, typically to open file details.
- **Loading:** Attachments that are still being uploaded.

```js file="./FileDetailsLabel.tsx"

```

### Attachment preview

```js file="./PreviewAttachment.tsx"

```

### Editable attachments

To allow users to edit an attached file, load a new code editor within the chatbot window. On this screen, you can allow users can make edits to a file and save changes if they'd like. Return users to the main chatbot window once they dismiss the editor.

```js file="./AttachmentEdit.tsx"

```

### Failed attachment error

When an attachment upload fails, a [danger alert](/components/alert) is displayed to provide details about the reason for failure.

```js file="./AttachmentError.tsx"

```

### Attachment dropzone

An attachment dropzone allows users to upload files via drag and drop.

```js file="./FileDropZone.tsx"

```
