import styled from 'styled-components';
import {
  PRIMARY,
  SECONDARY,
  SUCCESS,
  DANGER,
  TEXT_PRIMARY,
  TEXT_HEADER
} from '../constants/colors';
import Button from './Button';

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
    padding: 16px;
    height: 130px;
    overflow: hidden;
    p {
      margin: 0;
      &.userName {
        color: ${TEXT_HEADER};
        font-weight: bold;
        font-size: 1.3em;
      }
      &.postTitle {
        font-family: 'Open Sans', sans-serif; /* for text body */
        color: ${TEXT_PRIMARY};
        font-size: 1.1em;
        text-overflow: ellipsis;
      }
    }
  }
  .action {
    padding: 16px;
    background-color: #dfdfdf;
  }
`;
interface PostCardProps {
  //   username: string;
  //   title: string;
  //   subredit: string;
  //   postDate: string;
}

export const PostCard = (props: PostCardProps) => {
  return (
    <PostCardWrapper {...props}>
      <div className="header">HEAD</div>
      <div className="content">
        {/* need max length */}
        <p className="postTitle">
          I teach React courses - here's my collection of over 600 slides on
          various React topics (hosted on GitHub, licensed under CC-BY-SA)
        </p>
        <p className="userName">u/Dbossez</p>
      </div>
      <div className="action">
        <Button click={() => {}} text="Unsave" bgColor="danger"></Button>
      </div>
    </PostCardWrapper>
  );
};

export default PostCard;
