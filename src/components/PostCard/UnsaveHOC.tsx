import * as React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { IPostCardProps } from '../../interfaces/interfaces';

export const withUnsave = (C: React.ComponentType<IPostCardProps>) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch();
    const { unsaveState, id } = useSelector(
      ({ user }: any) => user.postToUnsave
    );

    // TODO: add a loading spinner & save err image to header
    const loadingHeader = unsaveState === 'unsaving' ? 'LOADER' : 'ERROR';
    const loadingContent =
      unsaveState === 'unsaving' ? (
        <b>Unsaving...</b>
      ) : (
        <b>Something went wrong - Unsave Unsuccessful</b>
      );

    return (
      <>
        {id === props.postId ? (
          <C
            {...props}
            unsaveElem={{ header: loadingHeader, content: loadingContent }}
          />
        ) : (
          <C {...props} />
        )}
      </>
    );
  };
  return Wrapper;
};
