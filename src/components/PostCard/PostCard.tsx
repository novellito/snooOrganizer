import styled from 'styled-components';

import PostCardAction from './PostCardAction';
import PostCardContent from './PostCardContent';
import PostCardHeader from './PostCardHeader';
import { IPostCardProps } from '../../interfaces/interfaces';
import React from 'react';
import { withUnsave } from './UnsaveHOC';

const PostCardWrapper = styled.div`
  display: inline-block;
  width: 350px;
  border-radius: 4px;
  box-shadow: 0 0 0.8rem 0.1rem rgba(15, 72, 179, 0.06),
    0 20px 30px -10px rgba(15, 72, 179, 0.2);
  transform-origin: left center;
`;

// stateful for react-flip-move
class PostCard extends React.Component<IPostCardProps> {
  render() {
    return (
      <PostCardWrapper {...this.props}>
        <PostCardHeader {...this.props} />
        <PostCardContent {...this.props} />
        <PostCardAction {...this.props} />
      </PostCardWrapper>
    );
  }
}
export default withUnsave(PostCard);
