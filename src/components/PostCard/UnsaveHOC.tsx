import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { IPostCardProps, IDashboardState } from '../../interfaces/interfaces';
import { UnsaveState } from '../../constants/enums';
import { SNOO_BLUE } from '../../constants/colors';
import ContentLoader from 'react-content-loader';

export const withUnsave = (C: React.ComponentType<IPostCardProps>) => {
  const Wrapper = forwardRef((props: any, ref: any) => {
    const { unsaveState, id } = useSelector(
      ({ dashboard }: { dashboard: IDashboardState }) => dashboard.postToUnsave
    );

    const loadingHeader =
      unsaveState === UnsaveState.UNSAVING ? (
        <ContentLoader backgroundColor={SNOO_BLUE} uniqueKey="unsave-loader">
          <circle cx="50%" cy="50%" r="50" />
        </ContentLoader>
      ) : (
        'ERROR'
      );
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
