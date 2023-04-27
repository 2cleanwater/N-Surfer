# 🏄‍♂️ 프로젝트 개요
- Notion API를 이용한 마이크로 블로그 및 데일리 기록 서비스입니다!

# 👨‍🏫 팀 멤버
- 🟩 Backend : [류정주](https://github.com/JeongJuRyu)
- 🟦 Frontend : [이정수](https://github.com/2cleanwater)

# 🔗 페이지 링크 및 상세 페이지
### 1. 페이지링크 (서버 운영 시간 : 10:00~24:00) ([링크](http://nsurfer.s3-website.ap-northeast-2.amazonaws.com/))
```bash
http://nsurfer.s3-website.ap-northeast-2.amazonaws.com/
```

### 2. 프로젝트 상세 노션 페이지 ([링크](https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100))
```bash
https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100
```

### 3. GitHub 페이지 (Backend [링크](https://github.com/JeongJuRyu/n-surfer-be)) (Frontend [링크](https://github.com/2cleanwater/N-Surfer))
```bash
🟩 Backend  : https://github.com/JeongJuRyu/n-surfer-be
🟦 Frontend : https://github.com/2cleanwater/N-Surfer
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
![explainPost01](https://user-images.githubusercontent.com/32264455/234814926-ff4873c3-f9e6-4c2e-b638-d2c6aaddd233.png)

### 2. 노션 공유
```bash
- 공유 버튼을 통해 포스트 내용 HTML 형식으로 파일 다운로드
- 노션의 “가져오기” 기능을 이용해 개인 노션으로 저장
```
![explainShare01](https://user-images.githubusercontent.com/32264455/234815023-4265def5-ff3c-4ff9-a101-f5a5e807bca2.png)
![explainShare03](https://user-images.githubusercontent.com/32264455/234815034-9069cc49-7e09-4b51-87d4-58b886997478.png)

### 3. 데일리 기록 서비스
```bash
- 글을 작성하거나 수정할 때마다 수치 증가
- 작성된 글 삭제 시 관련된 수치 기록 삭제
- 날짜가 바꼈을 때 오늘의 횟수 초기화
```
![explainDaily01](https://user-images.githubusercontent.com/32264455/234815051-dc98dd92-9d03-44cf-b2ec-3bd7a3145dbc.png)

### 4. 커뮤니티 서비스
```bash
- 카카오 API를 이용한 로그인 시스템
- 다른 유저들이 작성한 글 목록에서 회원 닉네임과 라벨로 검색 가능
- 작성한 유저의 파도 목록 및 작성한 글을 확인 가능
```
![explainComm01](https://user-images.githubusercontent.com/32264455/234815100-62f51e81-caa7-4633-b564-07dbda36eec7.png)
![explainPost02](https://user-images.githubusercontent.com/32264455/234815128-f8e3d6bb-309f-4c74-a488-df5df9b9423e.png)


