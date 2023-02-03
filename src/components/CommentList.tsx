import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  deleteComment,
  getPagingComments,
  getTotalComments,
} from 'src/store/features/comments.action';
import { setMode, setForm } from 'src/store/features/comments.slice';
import styled from 'styled-components';
import Loading from './Loading';

function CommentList() {
  const { comments, loading, error } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const handleEdit = (id: string) => {
    const editComment = comments?.find(comment => comment.id === id);
    if (editComment) dispatch(setForm(editComment));
    dispatch(setMode('put'));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await dispatch(deleteComment(id));
      dispatch(getPagingComments(1));
      dispatch(getTotalComments());
    }
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://picsum.photos/id/1/50/50';
  };

  useEffect(() => {
    dispatch(getPagingComments(1));
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {comments?.map(comment => (
        <Comment key={comment.id}>
          <img
            src={comment.profile_url}
            onError={handleImgError}
            alt="프로필이미지"
          />
          {comment.author}
          <CreatedAt>{comment.createdAt}</CreatedAt>
          <Content>{comment.content}</Content>
          <Button>
            <button
              type="button"
              onClick={() => {
                handleEdit(comment.id);
              }}
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete(comment.id);
              }}
            >
              삭제
            </button>
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
