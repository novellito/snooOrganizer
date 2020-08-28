import styled from 'styled-components';
import Link from 'next/link';
import Button from '../Button';
import { SNOO_BLUE } from '../../constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { IPostCardProps } from '../../interfaces/interfaces';

const PostCardActionWrapper = styled.div`
  padding: 0 16px 16px;
  display: flex;
  align-items: center;
  a {
    color: ${SNOO_BLUE};
  }
  button {
    margin-left: auto;
  }
`;

export const PostCardAction = (props: IPostCardProps) => {
  return (
    <PostCardActionWrapper {...props}>
      <Link href={(props.url && props.url.substr(6)) || ''}>
        <a target="_blank">
          <FontAwesomeIcon size="lg" icon={faExternalLinkAlt} />
        </a>
      </Link>

      <Button
        click={() => {}}
        text="Unsave"
        bgColor="danger"
        customClass="inverse"
        style={{ height: '30px', fontSize: '.9em' }}
      ></Button>
    </PostCardActionWrapper>
  );
};

export default PostCardAction;
