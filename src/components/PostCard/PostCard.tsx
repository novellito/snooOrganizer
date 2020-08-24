import styled from 'styled-components';
import {
  PRIMARY,
  SECONDARY,
  SUCCESS,
  DANGER,
  TEXT_PRIMARY,
  TEXT_HEADER,
  SNOO_BLUE
} from '../../constants/colors';
import Button from '../Button';
import ClampLines from 'react-clamp-lines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const bgColorMap: any = {
  primary: PRIMARY,
  secondary: SECONDARY,
  success: SUCCESS,
  danger: DANGER
};
const PostCardWrapper = styled.div`
  display: inline-block;
  width: 350px;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  transform-origin: left center;

  .header {
    height: 155px;
    background-color: #318fb5;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  .content {
    padding: 16px 16px 0;
    overflow: hidden;
    min-height: 130px;

    .content-header {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      .post-time {
        margin-left: auto;
        color: ${TEXT_PRIMARY};
        font-size: 0.9em;
      }
    }
    p {
      margin: 0;
      &.username {
        color: ${TEXT_HEADER};
        font-weight: bold;
        font-size: 1.3em;
      }
    }

    .clamp-lines {
      p {
        font-family: 'Open Sans', sans-serif; /* for text body */
        color: ${TEXT_PRIMARY};
        font-size: 1.1em;
      }

      .clamp-lines__button {
        background: none !important;
        border: none;
        padding: 0 !important;
        font-family: 'Open Sans', sans-serif; /* for text body */
        color: ${SNOO_BLUE};
        text-decoration: underline;
        cursor: pointer;
        outline: none;
        margin-bottom: 15px;
      }
    }
  }
  .action-bar {
    padding: 0 16px 16px;
    display: flex;
    align-items: center;
    a {
      color: ${SNOO_BLUE};
    }
    button {
      margin-left: auto;
    }
  }
`;
interface PostCardProps {
  //   username: string;
  //   title: string;
  //   subredit: string;
  //   postDate: string;
}

export const PostCard = (props: PostCardProps) => {
  const text =
    "I teach React courses - here's my collection of over 600 slides on various React topics (hosted on GitHub, licensed under CC-BY-SA)";
  // const text = ' I teach React courses ';
  return (
    <PostCardWrapper {...props}>
      <div className="header">HEAD</div>
      <div className="content">
        <div className="content-header">
          <p className="username">u/Dbossez</p>
          <p className="post-time">3 months ago</p>
        </div>
        {/* <p className="subreddit">r/mechanicalkeyboards</p> */}
        <ClampLines
          text={text}
          id="really-unique-id"
          ellipsis="..."
          className="post-title" // consider removing class
          innerElement="p"
        />
      </div>
      <div className="action-bar">
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
      </div>
    </PostCardWrapper>
  );
};

export default PostCard;
