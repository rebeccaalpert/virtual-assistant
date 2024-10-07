// ============================================================================
// Chatbot Main - Messages - Jump to Top
// ============================================================================
import React from 'react';

// Import PatternFly components
import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  CardTitle,
  Icon,
  pluralize
} from '@patternfly/react-core';
import { AngleLeftIcon, AngleRightIcon } from '@patternfly/react-icons';

export interface SourcesCardProps extends CardProps {
  /** Additional classes for the pagination navigation container. */
  className?: string;
  /** Flag indicating if the pagination is disabled. */
  isDisabled?: boolean;
  /** Label for the English word "of". */
  ofWord?: string;
  /** Accessible label for the pagination component. */
  paginationAriaLabel?: string;
  /** Content rendered inside the paginated card */
  sources: { title: React.ReactNode; body?: React.ReactNode }[];
  /** Label for the English word "source" */
  sourceWord?: string;
  /** Plural for sourceWord */
  sourceWordPlural?: string;
  /** Accessible label for the button which moves to the next page. */
  toNextPageAriaLabel?: string;
  /** Accessible label for the button which moves to the previous page. */
  toPreviousPageAriaLabel?: string;
  /** Function called when user clicks to navigate to next page. */
  onNextClick?: (event: React.SyntheticEvent<HTMLButtonElement>, page: number) => void;
  /** Function called when user clicks to navigate to previous page. */
  onPreviousClick?: (event: React.SyntheticEvent<HTMLButtonElement>, page: number) => void;
  /** Function called when page is changed. */
  onSetPage?: (event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => void;
}

const SourcesCard: React.FunctionComponent<SourcesCardProps> = ({
  className,
  isDisabled,
  ofWord = 'of',
  paginationAriaLabel = 'Pagination',
  sources,
  sourceWord = 'source',
  sourceWordPlural = 'sources',
  toNextPageAriaLabel = 'Go to next page',
  toPreviousPageAriaLabel = 'Go to previous page',
  onNextClick,
  onPreviousClick,
  onSetPage,
  ...props
}: SourcesCardProps) => {
  const [page, setPage] = React.useState(1);

  const handleNewPage = (_evt: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
    onSetPage && onSetPage(_evt, newPage);
  };

  return (
    <div className="pf-chatbot__source">
      <span>{pluralize(sources.length, sourceWord, sourceWordPlural)}</span>
      <Card className="pf-chatbot__paginated-card" {...props}>
        <CardTitle>{sources[page - 1].title}</CardTitle>
        {sources[page - 1].body && <CardBody>{sources[page - 1].body}</CardBody>}
        <CardFooter className="pf-chatbot__paginated-card-footer-container">
          <div className="pf-chatbot__paginated-card-footer">
            <nav className={`pf-chatbot__paginated-card-footer-buttons ${className}`} aria-label={paginationAriaLabel}>
              <Button
                variant={ButtonVariant.plain}
                isDisabled={isDisabled || page === 1}
                data-action="previous"
                onClick={(event) => {
                  const newPage = page >= 1 ? page - 1 : 1;
                  onPreviousClick && onPreviousClick(event, newPage);
                  handleNewPage(event, newPage);
                }}
                aria-label={toPreviousPageAriaLabel}
              >
                <Icon iconSize="xl">
                  <AngleLeftIcon />
                </Icon>
              </Button>
              <Button
                variant={ButtonVariant.plain}
                isDisabled={isDisabled || page === sources.length}
                aria-label={toNextPageAriaLabel}
                data-action="next"
                onClick={(event) => {
                  const newPage = page + 1 <= sources.length ? page + 1 : sources.length;
                  onNextClick && onNextClick(event, newPage);
                  handleNewPage(event, newPage);
                }}
              >
                <Icon isInline iconSize="xl">
                  <AngleRightIcon />
                </Icon>
              </Button>
            </nav>

            <span aria-hidden="true">
              {page} {ofWord} {sources.length}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SourcesCard;
