# Redux-Comment

## 프로젝트 개요

API 서버와 통신해서 작동하는 댓글 프로젝트를 Redux를 통해 구현

<br/>

## 구현 화면

### 1) 댓글 CRUD

<img width="70%" src="https://user-images.githubusercontent.com/54945205/217288035-269d9f78-5892-446a-85c1-7123dc133cce.gif">

- 댓글 조회, 추가, 수정, 삭제 기능 구현
- 댓글 추가, 삭제시 1페이지로 이동, 수정 시 페이지 유지, 입력 폼 초기화 구현
- `redux-toolkit` 이 제공하는 `createAsyncThunk` 이용하여 [비동기 처리를 할 함수 구현](https://github.com/Jooseulgi/redux-comment/blob/master/src/store/features/comments.action.ts)
- `extraReducers `에서 각 api 호출 [함수의 상태에 따라 state를 처리](https://github.com/Jooseulgi/redux-comment/blob/master/src/store/features/comments.slice.ts)
- 각 promise 결과에 따라 `pending`, `rejected`를 이용해 loading, error에 대응 <br/>

### 2) 페이지네이션

<img width="70%" src="https://user-images.githubusercontent.com/54945205/217287474-b694114f-5a17-475d-82dd-323355d95737.gif">

- `totalCount`에 전체 페이지 갯수를 담고 [한 페이지 당 4개 씩 보이게 구현](https://github.com/Jooseulgi/redux-comment/blob/master/src/components/PageList.tsx)
- 페이지 클릭시 `getPagingComments(pageNum)` 함수를 이용해 [해당 페이지로 이동](https://github.com/Jooseulgi/redux-comment/blob/master/src/components/PageList.tsx)
- 댓글을 추가, 삭제시 `getTotalComments()` 함수를 호출해 페이지 갯수 컨트롤

<br/>

## 과제 요구사항

### 1) 범위

- 댓글 불러오기, 작성, 수정, 삭제가 동작하도록 기능 구현
- 페이지네이션
- 댓글 작성, 수정, 삭제 후 동작
  - 댓글 작성하고 난 뒤: 다른 페이지에 위치하고 있었더라도 1페이지로 이동, 입력 폼 초기화
  - 댓글 수정하고 난 뒤: 현재 보고있는 페이지 유지, 입력 폼 초기화
  - 삭제하고 난 뒤: 1페이지로 이동

### 2) 요구사항

- Redux 환경설정은 자유롭게 진행
  - Redux-saga or Redux-thunk 자유롭게 선택 가능
  - 미들웨어 사용안하는 것도 가능
- Redux logger, Redux-Devtools 설정 필수
- Redux를 이용한 비동기 처리 필수

<br/>

## 실행 방법

```bash
$ git clone https://github.com/Jooseulgi/redux-comment.git
$ cd redux-comment
$ yarn install
$ yarn run api  //http://localhost:4000/comments
$ yarn start  //http://localhost:3000/
```

<br/>

## 사용 기술

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![React-Redux](https://img.shields.io/badge/React%20redux-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Redux-toolkit](https://img.shields.io/badge/Redux%20toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Styled-Components](https://img.shields.io/badge/Styled%20components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) <br/>

- <b>TypeScript</b>
  - 컴파일 단계에서 오류 확인이 가능해 코드의 안정성을 주고 redux 관련 type 공부를 위해 선택했다.
- <b>Axios</b>
  - fetch와 비교해 서버로부터 데이터를 받은 후, json으로 변환할 필요가 없는 장점이 있다.
  - instance를 제작하여 fetch보다 가독성 높은 코드를 작성할 수 있어 선택했다.
- <b>Redux-Toolkit</b>
  - `CreateSlice`를 통해 Action과 Reducer를 한번에 정의할수있고 `CreateAsyncThunk`를 통해 thunk 미들웨어를 내장하고있어서 추가로 비동기를 위한 외부 라이브러리를 설치할 필요가 없다.
  - redux의 단점인 보일러플레이트 코드가 줄어든다는 장점에서 toolkit을 사용했다.
- <b>Styled-Components</b>
  - 'CSS IN JS' 방식으로 원하는 스타일이 가능하고 props를 활용한 조건부 렌더링 작업을 하고 싶어서 Styled-Components를 선택했다.

<br/>

## 폴더 구조

```bash
redux-comment
├─ 📁 data # json-server data가 있는 폴더입니다.
├─ 📁 public
├─ 📁 src
│  ├─ 📁 components  # comment 관련 components가 모여있는 폴더입니다.
│  ├─ 📁 store  # redux 관련 코드가 있는 폴더입니다.
│  │  └─ 📁 features # redux action, reducer로 구성된 폴더입니다.
│  │  ├─ index.ts
│  ├─ 📁 types  # 타입 선언 폴더입니다.
│  ├─ App.tsx
│  ├─ GlobalStyle.tsx
│  └─ index.tsx
├─ ⚙️ .eslintrc.json
├─ ⚙️ .gitignore
├─ ⚙️ .prettierrc.json
├─ ⚙️ package-lock.json
├─ ⚙️ package.json
├─  README.md
├─ ⚙️ tsconfig.json
└─ ⚙️ yarn.lock
```

<br/>

## 고민한 점

- handleImgError 추가
  - 과제 요구사항엔 없지만 프로필이미지 입력 input에 error처리를 넣어 이미지 링크에 오류가 나면 기본 이미지가 나오게 처리하였다.
- error, loading 처리

  - 컴포넌트마다 error, loading을 처리하니 로딩 될 때 컴포넌트 갯수만큼 로딩이 등장한다.
  - 디버깅을 위해 `pending`, `rejected`를 주되 리스트를 불러오는 컴포넌트를 제외한 나머지는 loading 처리를 제외시켜 갯수만큼 등장했던 로딩을 하나로 줄였다.
