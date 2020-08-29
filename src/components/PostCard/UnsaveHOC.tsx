import * as React from 'react';
import { useSelector } from 'react-redux';
import { IPostCardProps } from '../../interfaces/interfaces';

export const withUnsave = (C: React.ComponentType<IPostCardProps>) => {
  const Wrapper = (props: any) => {
    const { unsaveState, id } = useSelector(
      ({ user }: any) => user.postToUnsave
    );

    // TODO: add a loading spinner & save err image to header
    const loadingHeader = unsaveState === 'unsaving' ? 'LOADER' : 'ERROR';
    const loadingContent =
      unsaveState === 'unsaving' ? (
        <b>Unsaving...</b>
      ) : (
        <b>Something went wrong - Changes were not saved!</b>
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
