# Real-space

Real space company web page management system
会社ウェブページ管理システム

RealSpace の建築ディーサインをイメージ中心にアップロード及び管理する為のシステム<br/>
：多量のイメージを簡単に安く管理するように設計

<br/>

## 📆 Project period

### 22.03 ~ 22.04,

### 22.07 ~

<br/>

## 🎯 프로젝트 주요 관심사

- 다량의 이미지 업로드 및 렌더링을 가장 저렴하고 안정적으로 구축하기 위한 시스템
- 테스트 코드를 통한 믿을 수 있는 코드 작성
- 코드리뷰를 통해 코드 품질 향상
- 코드 컨벤션 준수하여 코드 통일성 유지

<br/>

## 🛠 기술스택

- Java 11
- Spring Boot 2.6.9
- Gradle
- Spring Security
- Junit 5
- Hibernate / SpringJPA
- MySQL 8.0
- Redis
- React.js
- Redux

<br/>

## - [Git Branch Strategy]

- Git Flow

1. main : 제품으로 출시될 수 있는 브랜치
2. develop : 다음 출시 버전을 개발하는 브랜치
3. feature : 기능을 개발하는 브랜치
4. release : 이번 출시 버전을 준비하는 브랜치
5. hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

[gitFlow](https://user-images.githubusercontent.com/91414657/178094928-db77ef51-6492-4af7-9e36-4499b7bbce58.jpg)

## [Following AirBnb Code Convention](https://github.com/airbnb/javascript)

<br/>

## 🧩 ERD Ex

```mermaid
erDiagram
    MOVIE ||--o{ MOVIE_TIME : ""
    MOVIE {
        bigint id PK "영화 ID"
        varchar title "영화제목"
        int running_time "러닝타임"
        datetime created_at "등록일시"
        datetime updated_at "수정일시"
    }
    THEATER ||--o{ MOVIE_TIME : ""
    THEATER ||--|{ SEAT : ""
    THEATER {
        bigint id PK "상영관 ID"
        int theater_number "상영관 번호"
        int seat_count "좌석수"
        datetime created_at "등록일시"
        datetime updated_at "수정일시"
    }
    SEAT ||--o{ TICKET : ""
    SEAT {
        bigint id PK "좌석 ID"
        bigint theater_id FK "상영관 ID"
        int column "열"
        int row "행"
        datetime created_at "등록일시"
        datetime updated_at "수정일시"
    }
    MOVIE_TIME ||--o{ TICKET : ""
    MOVIE_TIME {
        bigint id PK "상영시간표 ID"
        bigint movie_id FK "영화 ID"
        bigint theater_id FK "상영관 ID"
        int round "회차"
        time start_at "시작 시간"
        time end_at "종료 시간"
        datetime created_at "등록일시"
        datetime updated_at "수정일시"
    }
    TICKET {
        bigint id PK "티켓 ID"
        bigint seat_id FK "좌석 ID"
        bigint movie_time_id FK "상영시간표 ID"
        bigint payment_id "결제 ID"
        varchar status "상태 - 구매가능/예약진행중/판매완료"
        int ticket_price "가격"
        datetime created_at "등록일시"
        datetime updated_at "수정일시"
    }
    TICKET }|--|| PAYMENT : ""
    PAYMENT {
        bigint id PK "결제 ID"
        bigint user_id "유저ID"
        varchar movie_title "영화제목"
        varchar type "결제 타입 - 예) 네이버페이, 카카오페이"
        varchar status "상태 - 완료/환불/실패"
        varchar failed_message "실패사유 - 컬럼명을 알아보기 쉬운가?"
        varchar payment_number "예매번호"
        int total_price "결제 금액"
        datetime created_at "결제일시"
        datetime updated_at "수정일시"
    }
    USER ||--o{ PAYMENT : ""
    USER {
        bigint id "회원"
        varchar name "이름"
        varchar email "이메일"
        varchar password "비밀번호"
        varchar grade "등급 - 고객/임직원"
        varchar phone "휴대폰 번호"
        boolean is_deleted "탈퇴여부"
        datetime deleted_at "탈퇴일시"
        datetime created_at "가입일시"
        datetime updated_at "수정일시"
    }
```
