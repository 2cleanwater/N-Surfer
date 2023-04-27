# 🏄‍♂️ 프로젝트 개요
- Notion API를 이용한 마이크로 블로그 및 데일리 기록 서비스입니다!

# 👨‍🏫 팀 멤버
- 🟩 BackEnd : [류정주](https://github.com/JeongJuRyu)
- 🟦 FrontEnd : [이정수](https://github.com/2cleanwater)

# 🔗 페이지 링크 및 상세 페이지
### 1. 페이지링크 (서버 운영 시간 : 10:00~24:00)
```bash
http://nsurfer.s3-website.ap-northeast-2.amazonaws.com/
```

### 2. 프로젝트 상세 노션 페이지 
```bash
https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100
```

### 3. GitHub 페이지
```bash
🟩 BackEnd  : https://github.com/JeongJuRyu/n-surfer-be
🟦 FrontEnd : https://github.com/2cleanwater/N-Surfer
```


# 🔨 사용 기술 스택
**프론트엔드**
- ![title](https://img.shields.io/badge/-TypeScript-77216F?&logo=typescript&logoColor=white)
- ![title](https://img.shields.io/badge/-React-00CAFF?&logo=React&logoColor=white)
- ![title](https://img.shields.io/badge/-HTML5-E8E8E8?&logo=html5&logoColor=white)
- ![title](https://img.shields.io/badge/-ReactHookForm-EC5990?&logo=reacthookform&logoColor=white)
- ![title](https://img.shields.io/badge/-MobX-FF9955?&logo=mobx&logoColor=white)

**백엔드**
- ![title](https://img.shields.io/badge/-SpringBoot-6DB33F?&logo=springboot&logoColor=white)
- ![title](https://img.shields.io/badge/-SpringSecurity-6DB33F?&logo=springsecurity&logoColor=white)
- ![title](https://img.shields.io/badge/-Redis-DC382D?&logo=redis&logoColor=white)
- ![title](https://img.shields.io/badge/-Docker-2496ED?&logo=docker&logoColor=white)
- ![title](https://img.shields.io/badge/-Jenkins-D24939?&logo=jenkins&logoColor=white)

**배포**
- ![title](https://img.shields.io/badge/-EC2-232F3E?&logo=Amazon-AWS&logoColor=white)
- ![title](https://img.shields.io/badge/-S3-13FF3D?&logo=Amazon-S3&logoColor=white)


# 🏄‍♂️ 기능 소개
### 1. Notion DB를 통한 텍스트 및 이미지 CRUD
```bash
- 포스트 내용 및 사진 업로드
- 작성자만 자신의 글 수정 가능
```
### 2. 노션 공유
```bash
- 공유 버튼을 통해 포스트 내용 HTML 형식으로 파일 다운로드
- 노션의 “가져오기” 기능을 이용해 개인 노션으로 저장
```

### 3. 데일리 기록 서비스
```bash
- 글을 작성하거나 수정할 때마다 수치 증가
- 작성된 글 삭제 시 관련된 수치 기록 삭제
- 날짜가 바꼈을 때 오늘의 횟수 초기화
```
### 4. 커뮤니티 서비스
```bash
- 카카오 API를 이용한 로그인 시스템
- 다른 유저들이 작성한 글 목록에서 회원 닉네임과 라벨로 검색 가능
- 작성한 유저의 파도 목록 및 작성한 글을 확인 가능
```
