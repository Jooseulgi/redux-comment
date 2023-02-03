import { MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  getTotalComments,
  getPagingComments,
} from 'src/store/features/comments.action';
import styled from 'styled-components';

function PageList() {
  const { totalCount, currentPage } = useAppSelector(state => state);
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
  }, [currentPage]);

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
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;
`;

const NumberPage = styled(Page)`
  ${({ active }: { active: boolean }) =>
    active &&
    `
        background: gray;
        color: #fff;
  `}
`;
