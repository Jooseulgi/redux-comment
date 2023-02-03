import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  deleteComment,
  getPagingComments,
  getTotalComments,
} from 'src/store/features/comments.action';
import { setMode, setForm } from 'src/store/features/comments.slice';
import styled from 'styled-components';
import { HiPencil, HiTrash } from 'react-icons/hi';
import Spinner from './Spinner';

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

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {comments?.map(comment => (
        <CommentBox key={comment.id}>
          <InfoContent>
            <Profile>
              <img
                src={comment.profile_url}
                onError={handleImgError}
                alt="프로필이미지"
              />
              <div>
                <span>{comment.author}</span>
                <CreatedAt>{comment.createdAt}</CreatedAt>
              </div>
            </Profile>
            <Buttons>
              <button
                type="button"
                onClick={() => {
                  handleEdit(comment.id);
                }}
              >
                <HiPencil />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(comment.id);
                }}
              >
                <HiTrash />
              </button>
            </Buttons>
          </InfoContent>
          <Content>{comment.content}</Content>
        </CommentBox>
      ))}
    </div>
  );
}

export default CommentList;

const CommentBox = styled.div`
  padding-top: 25px;
`;

const InfoContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Profile = styled.div`
  display: flex;
  img {
    margin-top: 5px;
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  span {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
`;

const CreatedAt = styled.div`
  margin-top: 7px;
  font-size: 12px;
  color: #999;
`;

const Content = styled.div`
  margin: 20px 0 0 35px;
  padding-bottom: 25px;
  border-bottom: 1px solid #f1f1f1;
`;

const Buttons = styled.div`
  flex: none;
  margin-left: 10px;
  button {
    margin-right: 10px;
    padding: 5px 8px;
    border-radius: 5px;
    border: none;
    background: #f8f9fe;
    color: #888;
    font-size: 12px;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background: #f3f5ff;
      color: #222;
    }
  }
`;
