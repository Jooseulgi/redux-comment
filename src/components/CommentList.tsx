import React, { useEffect } from 'react';
import { useAddDispatch, useAppSelector } from 'src/store';
import { getComments } from 'src/store/features/comments.slice';
import styled from 'styled-components';

function CommentList() {
  const dispatch = useAddDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);
  const { comments, loading, error } = useAppSelector(state => state);

  if (error) return <div>Sorry. Cant get the data..</div>;
  return (
    <div>
      {loading
        ? '로딩중'
        : comments?.map(comment => (
            <Comment key={comment.id}>
              <img src={comment.profile_url} alt="" />
              {comment.author}
              <CreatedAt>{comment.createdAt}</CreatedAt>
              <Content>{comment.content}</Content>
              <Button>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </Button>
            </Comment>
          ))}
    </div>
  );
}

export default CommentList;

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
