import styled from 'styled-components';
import { SNOO_BLUE } from '../../constants/colors';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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
interface IPostCardActionProps {
  //   username: string;
  //   title: string;
  //   subredit: string;
  //   postDate: string;
}

export const PostCardAction = (props: IPostCardActionProps) => {
  return (
    <PostCardActionWrapper {...props}>
      <Link href="//www.reddit.com/">
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
