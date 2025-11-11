import { FunctionComponent } from 'react';

import Message from '@patternfly/chatbot/dist/dynamic/Message';
import patternflyAvatar from './patternfly_avatar.jpg';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import RedoIcon from '@patternfly/react-icons/dist/esm/icons/redo-icon';
import CheckIcon from '@patternfly/react-icons/dist/esm/icons/check-icon';

export const ResponseActionClickedExample: FunctionComponent = () => (
  <>
    <Message
      name="Bot"
      role="bot"
      avatar={patternflyAvatar}
      content="I updated your account with those settings. You're ready to set up your first dashboard!"
      actions={{
        // eslint-disable-next-line no-console
        positive: { onClick: () => console.log('Good response'), isClicked: true },
        // eslint-disable-next-line no-console
        negative: { onClick: () => console.log('Bad response') },
        // eslint-disable-next-line no-console
        copy: { onClick: () => console.log('Copy') },
        // eslint-disable-next-line no-console
        download: { onClick: () => console.log('Download') },
        // eslint-disable-next-line no-console
        listen: { onClick: () => console.log('Listen') }
      }}
    />
    <Message
      name="Bot"
      role="bot"
      avatar={patternflyAvatar}
      content="You can also use a different icon when custom actions are clicked. Notice how the regenerate button shows a checkmark icon after being clicked."
      actions={{
        regenerate: {
          ariaLabel: 'Regenerate',
          clickedAriaLabel: 'Regenerated',
          isClicked: true,
          // eslint-disable-next-line no-console
          onClick: () => console.log('Clicked regenerate'),
          tooltipContent: 'Regenerate',
          clickedTooltipContent: 'Regenerated',
          icon: <RedoIcon />,
          clickedIcon: <CheckIcon />
        },
        info: {
          ariaLabel: 'Info',
          // eslint-disable-next-line no-console
          onClick: () => console.log('Clicked info'),
          tooltipContent: 'Info',
          icon: <InfoCircleIcon />,
          clickedIcon: <CheckCircleIcon />
        }
      }}
    />
  </>
);
