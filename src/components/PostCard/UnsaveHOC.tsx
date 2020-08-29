import * as React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { IPostCardProps } from '../../interfaces/interfaces';

export const withUnsave = (C: React.ComponentType<IPostCardProps>) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch();
    const postToUnsave = useSelector(({ user }: any) => user.postToUnsave);

    // console.log(props);
    console.log(postToUnsave);

    // ? maybe need to optimize using useMemo
    return (
      <>
        {postToUnsave === props.postId ? (
          <C
            {...props}
            unsaveElem={{ header: 'LOADER', content: 'Unsaving...' }}
          />
        ) : (
          <C {...props} />
        )}
      </>
    );
  };
  return Wrapper;
};
