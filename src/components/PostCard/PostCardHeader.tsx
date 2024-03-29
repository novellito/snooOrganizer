import styled from 'styled-components';
import Link from 'next/link';
import { getRandomColor } from '../../constants/colors';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { IPostCardProps } from '../../interfaces/interfaces';

const PostCardHeaderWrapper = styled.div`
  height: 190px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  a,
  img {
    /* set inner anchor to center subreddit text */
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: inherit;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    color: white;
    font-size: 1.3em;
    text-decoration: none;
  }
  a {
  }
`;

export const PostCardHeader: React.FC<IPostCardProps> = (props) => {
  // note we use combo of useState/Effect because we will get the following:
  // Warning: Text content did not match. Server: "x" Client: "y"
  // because we are using SSR
  const [bGColor, setBGColor] = useState<{ backgroundColor: string }>();

  useEffect(() => {
    setBGColor({ backgroundColor: getRandomColor() });
  }, []);

  let headerToRender;

  if (props.thumbnailUrl) {
    headerToRender = <img src={props.thumbnailUrl} alt={props.postTitle} />;
  } else if (props.commentBody) {
    headerToRender = (
      <FontAwesomeIcon
        size="7x"
        icon={faCommentDots}
        style={{ color: 'white' }}
      />
    );
  } else {
    headerToRender = props.subreddit;
  }

  return (
    <PostCardHeaderWrapper {...props} style={bGColor}>
      {props.unsaveElem ? (
        props.unsaveElem.header
      ) : (
        <Link href={(props.url && props.url.substr(6)) || ''}>
          <a target="_blank">{headerToRender}</a>
        </Link>
      )}
    </PostCardHeaderWrapper>
  );
};

export default PostCardHeader;
