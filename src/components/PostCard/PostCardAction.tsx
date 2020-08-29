import styled from 'styled-components';
import Link from 'next/link';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { IPostCardProps } from '../../interfaces/interfaces';
import { useState } from 'react';
import { unsaveContent } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
const PostCardActionWrapper = styled.div`
  padding: 0 16px 20px;
  .unsave-selections {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0 10px 0;
      font-weight: bold;
    }
  }
`;

export const PostCardAction = (props: IPostCardProps) => {
  const [isUnsaving, setUnsaving] = useState(false);
  const accessToken = useSelector(({ user }: any) => user.accessToken);

  const dispatch = useDispatch();

  const handleUnsaveClick = () => {
    setUnsaving(true);
  };

  const handleUnsave = async () => {
    console.log(props);
    const test = await dispatch(
      unsaveContent({ id: props.postId, accessToken })
    );
    console.log(test);
  };
  const unsaveSelections = (
    <div className="unsave-selections">
      <p>Are you sure?</p>
      <Button
        click={() => handleUnsave()}
        text="Yes"
        bgColor="danger"
        customClass="inverse"
        style={{ height: '30px', fontSize: '.9em' }}
      ></Button>
      <Button
        click={() => setUnsaving(false)}
        text="No"
        bgColor="primary"
        style={{ height: '30px', fontSize: '.9em' }}
      ></Button>
    </div>
  );

  return (
    <PostCardActionWrapper {...props}>
      {isUnsaving ? unsaveSelections : null}
      {!isUnsaving ? (
        <>
          <Link href={(props.url && props.url.substr(6)) || ''}>
            <a target="_blank">
              <FontAwesomeIcon size="lg" icon={faExternalLinkAlt} />
            </a>
          </Link>
          <Button
            click={() => handleUnsaveClick()}
            text="Unsave"
            bgColor="danger"
            customClass="inverse unsave"
            style={{ height: '30px', fontSize: '.9em', float: 'right' }}
          ></Button>
        </>
      ) : null}
    </PostCardActionWrapper>
  );
};

export default PostCardAction;
