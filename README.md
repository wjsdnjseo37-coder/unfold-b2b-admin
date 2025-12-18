# Unfold Biz — Local UI Sandbox

간단한 로컬 확인용 설명서입니다.

요약
- 파일: `고객B2B제휴 본사,,파트너 프로그램.HTML`
- 변경: `logo-text` id 추가, `budget-display` 추가, 뱃지 스타일 추가, 안전한 DOM 이벤트 초기화 등 UI/JS 개선

로컬 실행
1. 프로젝트 폴더로 이동:

```powershell
cd "c:\Users\사용자\OneDrive\Desktop\미팅 자료\개발"
```

2. 간단한 HTTP 서버 실행 (Python):

```powershell
python -m http.server 8000
```

3. 브라우저에서 열기:

http://localhost:8000/고객B2B제휴%20본사,,파트너%20프로그램.HTML

검증 항목
- 역할 전환 버튼으로 Partner / Admin 전환 동작
- AI Ad 스튜디오의 예산 슬라이더가 `선택 예산`에 반영되는지 확인
- 광고 승인/정산/제휴 제안 관련 목록 렌더링
- 콘솔 오류(Developer Tools) 확인

향후 작업 제안
- 브라우저 콘솔 로그 수집 및 런타임 오류 수정
- 접근성(ARIA) 및 폼 유효성 강화
- Git 원격(예: GitHub) 연결 및 푸시

Git 커밋 안내
1. 로컬에 Git이 설치되어 있지 않으면 https://git-scm.com/ 에서 설치하세요.
2. 아래 명령으로 초기화 및 커밋 수행:

```powershell
cd "c:\Users\사용자\OneDrive\Desktop\미팅 자료\개발"
git init
git config user.name "Your Name"
git config user.email "you@example.com"
git add .
git commit -m "chore: apply UI fixes (logo, badges, budget display) and add README"
```

원격 저장소로 푸시하려면 GitHub에서 리포지토리를 만들고 아래를 실행하세요:

```powershell
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```
