import { MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  getTotalComments,
  getPagingComments,
} from 'src/store/features/comments.action';
import styled from 'styled-components';

function PageList() {
  const { totalCount, currentPage, error } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const pageArray = [];
  for (let i = 1; i <= Math.ceil(totalCount / 4); i += 1) {
    pageArray.push(i);
  }

  const onClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    const pageNum = Number(e.currentTarget.value);
    dispatch(getPagingComments(pageNum));
  };

  useEffect(() => {
    dispatch(getTotalComments());
  }, [totalCount]);

  if (error) return <div>{error}</div>;
  return (
    <PageListStyle>
      {pageArray.map(page => (
        <NumberPage
          active={page === currentPage}
          key={page}
          onClick={onClickButton}
          value={page}
        >
          {page}
        </NumberPage>
      ))}
    </PageListStyle>
  );
}

export default PageList;

const PageListStyle = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const Page = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  border: none;
  outline: none;
  background: #f8f9fe;
  cursor: pointer;
  margin: 3px;
  border: none;
`;

const NumberPage = styled(Page)`
  ${({ active }: { active: boolean }) =>
    active &&
    `
    background:#696d86;
        color: #fff;
  `}
`;
