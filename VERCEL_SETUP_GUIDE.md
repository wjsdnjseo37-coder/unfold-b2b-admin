# Vercel Serverless Function으로 LLM 연동 가이드

## 📋 단계별 가이드

### 1단계: Vercel 계정 생성 및 프로젝트 연결 (2분)

1. **Vercel 가입**
   - https://vercel.com 접속
   - "Sign Up" 클릭
   - GitHub 계정으로 로그인

2. **GitHub 저장소 연결**
   - Vercel 대시보드에서 "Add New..." → "Project" 클릭
   - GitHub에서 `unfold-b2b-admin` 저장소 선택
   - "Import" 클릭

3. **환경 변수 설정**
   - "Environment Variables" 섹션에서:
     ```
     Name: GEMINI_API_KEY
     Value: AIzaSyAINbNW0iUkaGbpV9PWN-SSflJ281C-DH0
     ```
   - "Add" 클릭

4. **배포**
   - "Deploy" 버튼 클릭
   - 배포 완료 대기 (1-2분)

### 2단계: Vercel URL 확인 및 코드 업데이트 (1분)

1. **배포된 URL 복사**
   - 배포 완료 후 URL이 표시됨 (예: `https://unfold-b2b-admin-xxx.vercel.app`)
   - URL 복사

2. **app.html 파일 수정**
   - 파일 열기: `app.html`
   - 다음 부분 찾기:
     ```javascript
     const VERCEL_API_URL = 'https://YOUR-VERCEL-APP.vercel.app/api/chat';
     ```
   - 복사한 URL로 변경:
     ```javascript
     const VERCEL_API_URL = 'https://unfold-b2b-admin-xxx.vercel.app/api/chat';
     ```

3. **Git 푸시**
   ```powershell
   cd "C:\Users\사용자\OneDrive\Desktop\미팅 자료\개발\_언폴드B2B어드민"
   git add app.html
   git commit -m "Update Vercel API URL"
   git push
   ```

### 3단계: 테스트 (1분)

1. **GitHub Pages 접속** (1-2분 후)
   - https://wjsdnjseo37-coder.github.io/unfold-b2b-admin/

2. **챗봇 테스트**
   - F12 → Console 탭 열기
   - 챗봇 버튼 클릭
   - 질문 입력: "광고 캠페인을 처음 시작하는데 20대 여성 타겟으로 예산 10만원이에요. 전략 추천해주세요"
   
3. **콘솔 확인**
   - 🚀 "Vercel API 호출 중..." 
   - ✅ "AI 응답 받음: ..."
   - 자연스러운 AI 답변 표시!

## 🎉 완료!

이제 진짜 Google Gemini LLM이 작동합니다!

### 장점:
✅ API 키 안전하게 숨김 (Vercel 환경 변수)
✅ CORS 문제 없음
✅ 무료 (Vercel 무료 티어)
✅ 자동 배포 (GitHub 푸시하면 자동 업데이트)

### 무료 제한:
- Vercel: 월 100GB 대역폭 (충분함)
- Gemini: 분당 60회, 일일 1,500회 (충분함)

## 문제 해결

**"API Error: 500" 오류**
- Vercel 대시보드 → Settings → Environment Variables
- GEMINI_API_KEY가 올바르게 설정되었는지 확인
- 재배포: Deployments → 최신 배포 → "Redeploy"

**"fetch failed" 오류**
- VERCEL_API_URL이 올바른지 확인
- /api/chat 경로가 정확한지 확인
- 네트워크 연결 확인

## 다음 단계

챗봇이 작동하면:
1. 다양한 질문으로 테스트
2. 응답 품질 확인
3. 필요시 시스템 프롬프트 조정

문제가 있으면 Vercel 대시보드의 "Functions" 탭에서 로그 확인!
