import styled from 'styled-components';
import {
  PRIMARY,
  SECONDARY,
  SUCCESS,
  DANGER,
  TEXT_PRIMARY,
  TEXT_HEADER
} from '../constants/colors';

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
    text-align: justify;
    color: ${TEXT_HEADER};
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
      <div className="content">CONTENT</div>
      <div className="action">action</div>
    </PostCardWrapper>
  );
};

export default PostCard;
