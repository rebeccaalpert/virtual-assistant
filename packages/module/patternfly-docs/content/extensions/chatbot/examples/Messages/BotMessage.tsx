import React from 'react';
import Message from '@patternfly/chatbot/dist/dynamic/Message';
import patternflyAvatar from './patternfly_avatar.jpg';
import squareImg from './PF-social-color-square.svg';
import { AlertActionLink, Form, FormGroup, Radio } from '@patternfly/react-core';
import { Chart, ChartAxis, ChartBar, ChartGroup, ChartVoronoiContainer } from '@patternfly/react-charts';

export const BotMessageExample: React.FunctionComponent = () => {
  const [variant, setVariant] = React.useState('code');

  /* eslint-disable indent */
  const renderContent = () => {
    switch (variant) {
      case 'code':
        return code;
      case 'heading':
        return heading;
      case 'emphasis':
        return emphasis;
      case 'blockQuotes':
        return blockQuotes;
      case 'orderedList':
        return orderedList;
      case 'unorderedList':
        return unorderedList;
      case 'moreComplexList':
        return moreComplexList;
      case 'inlineCode':
        return inlineCode;
      case 'link':
        return link;
      case 'table':
        return table;
      case 'image':
        return image;
      default:
        return;
    }
  };
  /* eslint-enable indent */

  const code = `
Here is some YAML code:

~~~yaml
apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
  name: azure-sample-repo0oooo00ooo
spec:
  connectionConfig:
  url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
~~~

Here is some JavaScript code:

~~~js
import React from 'react';

const MessageLoading = () => (
  <div className="pf-chatbot__message-loading">
    <span className="pf-chatbot__message-loading-dots">
      <span className="pf-v6-screen-reader">Loading message</span>
    </span>
  </div>
);

export default MessageLoading;

~~~
`;

  const heading = `
# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading
`;

  const emphasis = `
**Bold text, formatted with double asterisks**

__Bold text, formatted with double underscores__

*Italic text, formatted with single asterisks*

_Italic text, formatted with single underscores_

~~Strikethrough~~
`;

  const blockQuotes = `> Blockquotes can also be nested...
>> ...by using additional greater-than signs (>) right next to each other...
> > > ...or with spaces between each sign.`;

  const orderedList = `
  Here is an ordered list:

  1. Item 1
  2. Item 2
  3. Item 3`;

  const unorderedList = `
  Here is an unordered list:

  * Item 1
  * Item 2
  * Item 3`;

  const moreComplexList = `You may be wondering whether you can display more complex lists with formatting. In response to your question, I will explain how to spread butter on toast.

1. **Using a \`toaster\`:**

   - Place \`bread\` in a \`toaster\`.
   - Once \`bread\` is lightly browned, remove from \`toaster\`.

2. **Using a \`knife\`:**

     Acquire 1 tablespoon of room temperature \`butter\`. Use \`knife\` to spread butter on \`toast\`. Bon appétit!
 `;

  const link = `A paragraph with a URL: https://reactjs.org.`;

  const inlineCode = `Here is an inline code - \`() => void\``;

  const table = `To customize your table, you can use [PatternFly TableProps](/components/table#table)

 | Version | GA date | User role 
 |-|-|-|
 | 2.5 | September 30, 2024 | Administrator |
 | 2.5 | June 27, 2023 | Editor |
 | 3.0 | April 1, 2025 | Administrator
 `;

  const image = `![Multi-colored wavy lines on a black background](https://cdn.dribbble.com/userupload/10651749/file/original-8a07b8e39d9e8bf002358c66fce1223e.gif)`;

  const error = {
    title: 'Could not load chat',
    children: 'Wait a few minutes and check your network settings. If the issue persists: ',
    actionLinks: (
      <React.Fragment>
        <AlertActionLink component="a" href="#">
          Start a new chat
        </AlertActionLink>
        <AlertActionLink component="a" href="#">
          Contact support
        </AlertActionLink>
      </React.Fragment>
    )
  };

  const chartContent = (
    <Chart
      ariaDesc="Average number of pets"
      ariaTitle="Bar chart example"
      containerComponent={<ChartVoronoiContainer labels={({ datum }) => datum.name} constrainToVisibleArea />}
      domain={{ y: [0, 9] }}
      domainPadding={{ x: [30, 25] }}
      legendData={[{ name: 'Cats' }, { name: 'Dogs' }, { name: 'Birds' }, { name: 'Mice' }]}
      legendOrientation="vertical"
      legendPosition="right"
      height={250}
      name="chart1"
      padding={{
        bottom: 50,
        left: 50,
        right: 200, // Adjusted to accommodate legend
        top: 50
      }}
      width={600}
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup offset={11}>
        <ChartBar
          data={[
            { name: 'Cats', x: '2015', y: 1 },
            { name: 'Cats', x: '2016', y: 2 },
            { name: 'Cats', x: '2017', y: 5 },
            { name: 'Cats', x: '2018', y: 3 }
          ]}
        />
        <ChartBar
          data={[
            { name: 'Dogs', x: '2015', y: 2 },
            { name: 'Dogs', x: '2016', y: 1 },
            { name: 'Dogs', x: '2017', y: 7 },
            { name: 'Dogs', x: '2018', y: 4 }
          ]}
        />
        <ChartBar
          data={[
            { name: 'Birds', x: '2015', y: 4 },
            { name: 'Birds', x: '2016', y: 4 },
            { name: 'Birds', x: '2017', y: 9 },
            { name: 'Birds', x: '2018', y: 7 }
          ]}
        />
        <ChartBar
          data={[
            { name: 'Mice', x: '2015', y: 3 },
            { name: 'Mice', x: '2016', y: 3 },
            { name: 'Mice', x: '2017', y: 8 },
            { name: 'Mice', x: '2018', y: 5 }
          ]}
        />
      </ChartGroup>
    </Chart>
  );

  const chart = `
Hello I am some content 

~~~chart

~~~

I am some more content 

~~~chart 
<Chart
      ariaDesc="Average number of pets"
      ariaTitle="Bar chart example"
      containerComponent={<ChartVoronoiContainer labels={({ datum }) => datum.name} constrainToVisibleArea />}
      domain={{ y: [0, 9] }}
      domainPadding={{ x: [30, 25] }}
      legendData={[{ name: 'Cats' }, { name: 'Dogs' }, { name: 'Birds' }, { name: 'Mice' }]}
      legendOrientation="vertical"
      legendPosition="right"
      height={250}
      name="chart1"
      padding={{
        bottom: 50,
        left: 50,
        right: 200, // Adjusted to accommodate legend
        top: 50
      }}
      width={600}
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup offset={11}>
        <ChartBar
          data={[
            { name: 'Cats', x: '2015', y: 1 },
            { name: 'Cats', x: '2016', y: 2 },
            { name: 'Cats', x: '2017', y: 5 },
            { name: 'Cats', x: '2018', y: 3 }
          ]}
        />
        <ChartBar
          data={[
            { name: 'Dogs', x: '2015', y: 2 },
            { name: 'Dogs', x: '2016', y: 1 },
            { name: 'Dogs', x: '2017', y: 7 },
            { name: 'Dogs', x: '2018', y: 4 }
          ]}
        />
        <ChartBar
          data={[
            { name: 'Birds', x: '2015', y: 4 },
            { name: 'Birds', x: '2016', y: 4 },
            { name: 'Birds', x: '2017', y: 9 },
            { name: 'Birds', x: '2018', y: 7 }
          ]}
        />
        <ChartBar
          data={[
            { name: 'Mice', x: '2015', y: 3 },
            { name: 'Mice', x: '2016', y: 3 },
            { name: 'Mice', x: '2017', y: 8 },
            { name: 'Mice', x: '2018', y: 5 }
          ]}
        />
      </ChartGroup>
    </Chart>
~~~
  `;

  return (
    <>
      <Message name="Bot" role="bot" avatar={patternflyAvatar} content={chart}></Message>
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content={`This is a text-based message from "Bot," with an updated timestamp.`}
        timestamp="1 hour ago"
      />
      <Message name="Bot" role="bot" avatar={patternflyAvatar} content="Example content" isLoading />
      <Message role="bot" avatar={patternflyAvatar} content="This message is from a nameless bot." />
      <Message
        name="Default Openshift Container Platform Assistant That Can Help With Any Query You Might Need Help With"
        role="bot"
        avatar={patternflyAvatar}
        content="This is a message from a bot with really long name: it's truncated!"
      />
      <Message
        name="Bot"
        role="bot"
        avatar={squareImg}
        content="This bot has a square avatar. You can further customize the avatar by applying an additional class or passing [PatternFly avatar props](/components/avatar) to the `<Message>` component via `avatarProps`."
        hasRoundAvatar={false}
      />
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content={`Text-based message from a bot named "Bot," with updated timestamp`}
        timestamp="1 hour ago"
      />
      <Message name="Bot" role="bot" avatar={patternflyAvatar} content="Example content" isLoading />

      <Form>
        <FormGroup role="radiogroup" isInline fieldId="bot-message-type" label="Message content type">
          <Radio
            isChecked={variant === 'code'}
            onChange={() => setVariant('code')}
            name="bot-message-type"
            label="Code"
            id="code"
          />
          <Radio
            isChecked={variant === 'inlineCode'}
            onChange={() => setVariant('inlineCode')}
            name="bot-message-type"
            label="Inline code"
            id="inline-code"
          />
          <Radio
            isChecked={variant === 'heading'}
            onChange={() => setVariant('heading')}
            name="bot-message-type"
            label="Heading"
            id="heading"
          />
          <Radio
            isChecked={variant === 'blockQuotes'}
            onChange={() => setVariant('blockQuotes')}
            name="bot-message-type"
            label="Block quote"
            id="block-quotes"
          />
          <Radio
            isChecked={variant === 'emphasis'}
            onChange={() => setVariant('emphasis')}
            name="bot-message-type"
            label="Emphasis"
            id="emphasis"
          />
          <Radio
            isChecked={variant === 'link'}
            onChange={() => setVariant('link')}
            name="bot-message-type"
            label="Link"
            id="link"
          />
          <Radio
            isChecked={variant === 'unorderedList'}
            onChange={() => setVariant('unorderedList')}
            name="bot-message-type"
            label="Unordered list"
            id="unordered-list"
          />
          <Radio
            isChecked={variant === 'orderedList'}
            onChange={() => setVariant('orderedList')}
            name="bot-message-type"
            label="Ordered list"
            id="ordered-list"
          />
          <Radio
            isChecked={variant === 'moreComplexList'}
            onChange={() => setVariant('moreComplexList')}
            name="bot-message-type"
            label="More complex list"
            id="more-complex-list"
          />
          <Radio
            isChecked={variant === 'table'}
            onChange={() => setVariant('table')}
            name="bot-message-type"
            label="Table"
            id="table"
          />
          <Radio
            isChecked={variant === 'image'}
            onChange={() => setVariant('image')}
            name="bot-message-type"
            label="Image"
            id="image"
          />
          <Radio
            isChecked={variant === 'error'}
            onChange={() => setVariant('error')}
            name="bot-message-error"
            label="Error"
            id="error"
          />
        </FormGroup>
      </Form>
      <Message
        name="Bot"
        role="bot"
        avatar={patternflyAvatar}
        content={renderContent()}
        tableProps={
          variant === 'table' ? { 'aria-label': 'App information and user roles for bot messages' } : undefined
        }
        error={variant === 'error' ? error : undefined}
      />
    </>
  );
};
