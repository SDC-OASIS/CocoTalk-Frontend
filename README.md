# CocoTalk-Frontend



[프론트엔드 정리](./assets/FrontendNote.md)

------

## ⚙ 개요

본 프로젝트는 Stove Dev Canp 2기 Oasis팀의 카카오톡 클론 프로젝트입니다.

카카오톡의 웹버전이 있다면 어떤 모습일지 고민하며 설계하고 개발했습니다.

스마일게이트의 인기 캐릭터 모코코 컨셉의 디자인으로 UI를 구현했습니다.

<hr/>

### 🎇목표

☘ 여러 웹메신저를 분석해 장점만을 차용하여 사용성 높은 형태의 UI를 설계하고 프로토타입을 제작한다.

☘ 아키텍처와 백엔드 로직 설계에 참여해 서비스 흐름을 이해하고 함께 기능구현 로직을 고민한다.

☘  데이터 통신 시나리오를 작성하고 렌더링 로직을 설계한다.

☘ Vue의 렌더링 로직을 이해하고 지속적인 검토를 통해  사용성을 개선한다.

☘ 개발과정 전반과 trouble shooting을 잘 기록해둔다.

<hr/>

### 🛠사용 기술

* Vue
* Vuex


<hr/>

### 🔧아키텍쳐

<img src = "./assets/프론트아키텍처.png" width="50%" height="50%">

![프론트엔드 아키텍처](./assets/프론트아키텍처.png){: width="50%"}

<hr/>

### ✨프로토타입

> Figma로 제작한 프로토타입 링크입니다.

https://www.figma.com/file/JfWarDBL2JrtpRMAZv1lhJ/Untitled?node-id=0%3A1



------

## ✔프로젝트 실행방법

#### npm 설치

```
npm install
```

#### 프로젝트 실행

```
npm run serve
```

#### 로그인

> 회원가입은 모바일에서만 진행합니다. 로그인을 원하시면 아래 정보를 사용해주세요.

[아이디] heeeun

[비밀번호] gmldms12345  => 알파벳은 "희은"을 영문타자로 입력합니다.



------

## 🏷 페이지별 주요 기능

### [로그인 페이지]

* 로그인 기능
* 네비게이션 가드



### [친구목록 페이지]

* 친구목록 조회
* 친구 추가
* 친구 프로필 열람
* 내 프로필 열람



### [채팅방 목록 페이지]

* 채팅방 목록 조회
* 신규메세지 수령에 따른 채팅방 목록 실시간 업데이트
* 채팅방별 읽지 않은 메세지수 확인
* 채팅방 생성



### [채팅시작 페이지]

* 1:1 채팅
* 단체 채팅
* 친구 초대
* 친구추가



### [에러 페이지]

* 올바르지 않은 경로로 진입시 해당 페이지로 이동



------

## 💡 개발 과정 및 Trouble Shooting

### 1. Router

### 2. 웹소켓 구조 설계

### 3. 채팅방 목록 실시간 변화

### 4. 이미지 렌더링



------

## ⛳느낀점 및 향후 도전 과제

1. 오프라인에서도 이용내역을 확인하는 서비스를 진행시 IndexedDB를 사용
2. 현재 패드와 PC환경에서의 반응형만을 구현함 => 모바일웹환경을 위한 반응형 제작
3. 보다 높은 사용성을 위한 애니메이션 활용

