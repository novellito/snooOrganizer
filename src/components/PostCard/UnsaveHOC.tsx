import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { IPostCardProps } from '../../interfaces/interfaces';
import { UnsaveState } from '../../constants/enums';

export const withUnsave = (C: React.ComponentType<IPostCardProps>) => {
  const Wrapper = forwardRef((props: any, ref: any) => {
    const { unsaveState, id } = useSelector(
      ({ user }: any) => user.postToUnsave
    );

    // TODO: add a loading spinner & save err image to header
    const loadingHeader =
      unsaveState === UnsaveState.UNSAVING ? 'LOADER' : 'ERROR';
    const loadingContent =
      unsaveState === UnsaveState.UNSAVING ? (
        <b>Unsaving...</b>
      ) : (
        <b>Something went wrong - Changes were not saved!</b>
      );

    return (
      <>
        {id === props.postId ? (
          <C
            ref={ref}
            {...props}
            unsaveElem={{ header: loadingHeader, content: loadingContent }}
          />
        ) : (
          <C {...props} ref={ref} />
        )}
      </>
    );
  });
  return Wrapper;
};
