# API 서버와 통신해서 작동하는 댓글 프로젝트를 Redux를 통해 구현

## 배포링크

## 프로젝트 개요

Redux의 기본적인 기능 이해 및 Redux를 사용해 API 서버와 통신하여 CRUD 구현 <br/>

## 구현 화면

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

```js
$ git clone https://github.com/Jooseulgi/redux-comment.git
$ cd redux-comment
$ yarn install
$ yarn run api
$ yarn start
```

<br/>

## 사용 기술

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![React-Redux](https://img.shields.io/badge/React%20redux-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Redux-toolkit](https://img.shields.io/badge/Redux%20toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Styled-Components](https://img.shields.io/badge/Styled%20components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) <br/>

- <b>Redux-Toolkit</b>
  - `CreateSlice`를 통해 Action과 Reducer를 한번에 정의할수있고 ` CreateAsyncThunk`를 통해 thunk 미들웨어를 내장하고있어서 추가로 비동기를 위한 외부 라이브러리를 설치할 필요가없다.
  - 기존 Redux의 단점으로 꼽히는 보일러플레이트 코드가 줄어듦
  - 많은 라이브러리들이 내장되어 있어서 라이브러리들의 의존성을 줄일 수 있음
- <b>TypeScript</b>
  - 컴파일 단계에서 오류 확인이 가능해 잠재적인 위험을 줄일 수 있음
- <b>Styled-Components</b>
  - 'CSS IN JS' 방식으로 원하는 스타일이 가능
  - 짧은 길이의 유니크한 클래스를 자동적으로 생성하기에 스타일을 위한 추가적인 코드를 주지 않아도 되는 장점
  - props를 활용한 조건부 렌더링에 용이, 컴포넌트화하여 재활용 가능
- <b>Axios</b>
  - fetch와 비교해 서버로부터 데이터를 받은 후, json으로 변환할 필요가 없는 장점
  - instance를 제작하여 fetch보다 가독성 높은 코드를 작성 가능

<br/>

## 폴더 구조

```js
redux-comment
├─ 📁 public
├─ 📁 src
│  ├─ 📁 components  #comment 관련 components가 모여있는 폴더입니다.
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

## 기술적인 고민들

- handleImgError 추가
  - 과제 요구사항엔 없지만 프로필이미지 입력 input에 error처리를 넣어 이미지 링크가 오류가 나면 기본 이미지가 나오게 처리하였다.
- error, loading 처리
  - 컴포넌트마다 error, loading을 처리하니 로딩 될 때 컴포넌트 갯수만큼 로딩이 등장한다. reducer에서는 pending, rejected를 주되 리스트를 불러오는 컴포넌트를 제외한 나머지는 loading 처리를 빼야하는건지.. 이부분은 좀 더 알아보고 리팩토링 해야겠다.

<br/>

## 회고

<details>
<summary>Redux의 어려움</summary>
상태 관리 라이브러리를 Recoil로 처음 접했어서 과정을 이해하는데 힘들었다.<br/>
처음엔 redux-toolkit을 쓰지않고 그냥 react-redux만으로 작업해봤는데 보일러플레이트가 너무 많아 코드를 위한 코드가 많은게 아닌가??란 생각이 들면서 작업효율이 오히려 떨어지지 않을까 싶었지만 전역 상태값이 많아진다면 디버깅이 상대적으로 편한 Redux가 좋지 않을까란 생각도 들었다.<br/>이번엔 검색과 검색과 검색의 결과로 만들었지만 Redux와 친해지기 위해 다른 프로젝트도 만들어봐야겠다.
</details>
