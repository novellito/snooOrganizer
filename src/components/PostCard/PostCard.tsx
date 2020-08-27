import styled from 'styled-components';

import PostCardAction from './PostCardAction';
import PostCardContent from './PostCardContent';
import PostCardHeader from './PostCardHeader';
import { IPostCardProps } from '../../interfaces/interfaces';

const PostCardWrapper = styled.div`
  display: inline-block;
  width: 350px;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  transform-origin: left center;
`;

export const PostCard = (props: any) => {
  // export const PostCard = (props: IPostCardProps) => {
  return (
    <PostCardWrapper {...props}>
      <PostCardHeader {...props} />
      <PostCardContent {...props} />
      <PostCardAction {...props} />
    </PostCardWrapper>
  );
};

export default PostCard;
