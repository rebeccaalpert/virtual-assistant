// ============================================================================
// Chatbot Main - Message - Content - Image
// ============================================================================

import { ExtraProps } from 'react-markdown';

const ImageMessage = ({ children, ...props }: Omit<JSX.IntrinsicElements['img'], 'ref'> & ExtraProps) => (
  <img className="pf-chatbot__message-image" {...props}>
    {children}
  </img>
);

export default ImageMessage;
