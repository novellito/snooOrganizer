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
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
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
