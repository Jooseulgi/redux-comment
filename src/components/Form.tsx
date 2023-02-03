import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  addComment,
  getPagingComments,
  getTotalComments,
  updateComment,
} from 'src/store/features/comments.action';
import { setForm, setMode, resetForm } from 'src/store/features/comments.slice';
import styled from 'styled-components';
import Loading from './Loading';

function Form() {
  const { inputs, submitMode, currentPage, loading, error } = useAppSelector(
    state => state,
  );
  const { profile_url, author, content, createdAt } = inputs;
  const dispatch = useAppDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.currentTarget;
    dispatch(
      setForm({
        ...inputs,
        [name]: value,
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitMode === 'post') {
      await dispatch(addComment(inputs));
      dispatch(getPagingComments(1));
    } else if (submitMode === 'put') {
      const editedComment = {
        ...inputs,
        id: inputs.id,
      };
      await dispatch(updateComment(editedComment));
      dispatch(getPagingComments(currentPage));
    }
    dispatch(getTotalComments());
    dispatch(resetForm());
    dispatch(setMode('post'));
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          value={profile_url}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="작성자"
          value={author}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="내용"
          value={content}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="createdAt"
          placeholder="2020-05-30"
          value={createdAt}
          onChange={handleChange}
          required
        />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
}

export default Form;

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
