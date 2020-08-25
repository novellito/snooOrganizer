import styled from 'styled-components';
import { getRandomColor } from '../../constants/colors';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

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
interface IPostCardHeaderProps {
  //   username: string;
  //   title: string;
  //   subredit: string;
  //   postDate: string;
  //   bgColor: string;
}

export const PostCardHeader = (props: IPostCardHeaderProps) => {
  // note we use combo of useState/Effect because we will get the following:
  // Warning: Text content did not match. Server: "x" Client: "y"
  // because we are using SSR
  const [bGColor, setBGColor] = useState();

  useEffect(() => {
    setBGColor({ backgroundColor: getRandomColor() });
  }, []);
  return (
    <PostCardHeaderWrapper id="123" {...props} style={bGColor}>
      <Link href="//www.reddit.com/">
        <a target="_blank">
          {/* <img
            src="https://external-preview.redd.it/-yaXtAnRhnSZ74SaZ9ADHVNjJUUyXeWnILzobuAWBXE.jpg?width=640&crop=smart&auto=webp&s=4c4fcfc7c2d8234b88dbf176b40492f1698af715"
            alt=""
          /> */}
          {/* r/mechanicalkeyboards */}
          <FontAwesomeIcon
            size="7x"
            icon={faCommentDots}
            style={{ color: 'white' }}
          />
        </a>
      </Link>
    </PostCardHeaderWrapper>
  );
};

export default PostCardHeader;
