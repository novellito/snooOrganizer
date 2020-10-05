import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import { getRandomColor, SNOO_BLUE } from '../../constants/colors';
import ContentLoader from 'react-content-loader';

const PostCardLoaderWrapper = styled.div`
  width: 350px;
  border-radius: 4px;
  box-shadow: 0 0 0.8rem 0.1rem rgba(15, 72, 179, 0.06),
    0 20px 30px -10px rgba(15, 72, 179, 0.2);
  transform-origin: left center;
  .header {
    height: 190px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    text-align: center;
    svg {
      height: inherit;
    }
  }

  .content {
    padding: 16px 16px 0;
    overflow: hidden;
    min-height: 130px;
  }

  .action {
    padding: 0 16px 20px;
    height: 50px;
    svg {
      height: inherit;
    }
  }
`;
const rectangleRadius = {
  rx: '5',
  ry: '5'
};
export const PostCardLoader = (props) => {
  const [bGColor, setBGColor] = useState<{ backgroundColor: string }>();
  useEffect(() => {
    setBGColor({ backgroundColor: getRandomColor() });
  }, []);
  return (
    <PostCardLoaderWrapper {...props}>
      <div className="header" style={bGColor}>
        <ContentLoader backgroundColor={SNOO_BLUE} uniqueKey="icon-loader">
          <circle cx="50%" cy="50%" r="50" />
        </ContentLoader>
      </div>
      <div className="content">
        <ContentLoader backgroundColor={SNOO_BLUE} uniqueKey="content-loader">
          <rect x="0" y="5" {...rectangleRadius} width="140" height="25" />
          <rect x="250" y="5" {...rectangleRadius} width="50" height="15" />
          <rect x="0" y="50" {...rectangleRadius} width="200" height="20" />
          <rect x="0" y="85" {...rectangleRadius} width="300" height="20" />
          <rect x="0" y="120" {...rectangleRadius} width="120" height="20" />
        </ContentLoader>
      </div>
      <div className="action">
        <ContentLoader backgroundColor={SNOO_BLUE} uniqueKey="action-loader">
          <rect x="0" y="0" {...rectangleRadius} width="30" height="20" />
          <rect x="230" y="0" {...rectangleRadius} width="70" height="20" />
        </ContentLoader>
      </div>
    </PostCardLoaderWrapper>
  );
};
export default PostCardLoader;
