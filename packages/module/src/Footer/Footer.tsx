// ============================================================================
// Chatbot Footer
// ============================================================================

// Global footer component
// Supports:
// - Message bar
// - Footnote
// - Footnote popover

import React from 'react';

export interface FooterProps extends React.HTMLProps<HTMLDivElement> {
  /** Children for the Footer that supports MessageBar and FootNote components*/
  children?: React.ReactNode;
  /** Custom classname for the Footer component */
  className?: string;
}

export const Footer: React.FunctionComponent<FooterProps> = ({ children, className, ...props }: FooterProps) => (
  <div className={`pf-chatbot__footer ${className}`} {...props}>
    {children}
  </div>
);

export default Footer;
