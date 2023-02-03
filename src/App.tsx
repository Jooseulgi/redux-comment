import styled from 'styled-components';
import CommentList from './components/CommentList';
import PageList from './components/PageList';
import Form from './components/Form';

function App() {
  return (
    <Layout>
      <CommentList />
      <PageList />
      <Form />
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  width: 510px;
  padding: 30px;
  margin: 0 auto;
  background: #fff;
  border-radius: 30px;
  box-shadow: 1px 5px 14px 5px #dbd9eb;
`;
