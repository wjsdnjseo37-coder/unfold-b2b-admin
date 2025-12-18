# Netlify로 LLM 챗봇 배포 가이드 (초간단 버전)

## 🚀 3단계로 끝내기 (5분)

### 1단계: Netlify 가입 (1분)

1. https://app.netlify.com/signup 접속
2. **Email로 가입** (GitHub 필요 없음!)
3. 이메일 인증

### 2단계: 프로젝트 배포 (2분)

#### 방법 A: GitHub 연결 (추천)
1. Netlify 대시보드에서 **"Add new site" → "Import an existing project"**
2. **"Deploy with GitHub"** 선택
3. GitHub 권한 승인
4. `unfold-b2b-admin` 저장소 선택
5. **"Deploy site"** 클릭 → 배포 시작!

#### 방법 B: Manual Deploy (GitHub 연결 안 될 경우)
1. 로컬 폴더 압축:
   ```powershell
   cd "C:\Users\사용자\OneDrive\Desktop\미팅 자료\개발\_언폴드B2B어드민"
   Compress-Archive -Path * -DestinationPath unfold-deploy.zip
   ```
2. Netlify 대시보드에서 **"Add new site" → "Deploy manually"**
3. `unfold-deploy.zip` 파일을 Drag & Drop
4. 배포 완료!

### 3단계: 환경 변수 설정 (2분)

1. 배포된 사이트 클릭
2. **"Site settings" → "Environment variables"** 클릭
3. **"Add a variable"** 클릭
4. 입력:
   ```
   Key: GEMINI_API_KEY
   Value: AIzaSyAINbNW0iUkaGbpV9PWN-SSflJ281C-DH0
   ```
5. **"Create variable"** 클릭
6. 상단 **"Deploys"** 탭 → **"Trigger deploy" → "Deploy site"** (재배포)

## ✅ 완료!

배포가 끝나면 (1-2분):
- 자동으로 GitHub Pages 대신 Netlify URL이 생성됨
- 예: `https://unfold-b2b-admin.netlify.app`
- 챗봇이 자동으로 Netlify Function을 호출
- 진짜 LLM(Google Gemini)이 작동!

## 🧪 테스트

1. **Netlify URL 접속**
2. **F12 → Console 열기**
3. **챗봇 버튼 클릭**
4. **질문:** "광고 캠페인을 처음 시작하는데 타겟이 20대 여성이고 예산이 10만원입니다. 어떤 전략을 추천하시나요?"
5. **콘솔 확인:**
   - 🚀 "Netlify Function 호출 중..."
   - ✅ "AI 응답 받음: ..."
   - 자연스러운 AI 답변!

## 📱 추가 설정 (선택)

### GitHub Pages 대신 Netlify 사용하기

Netlify가 더 좋으니 이걸 메인으로 사용하세요:
- GitHub Pages: `https://wjsdnjseo37-coder.github.io/unfold-b2b-admin/`
- Netlify: `https://unfold-b2b-admin.netlify.app` ← **이거 사용!**

### 커스텀 도메인 (선택)
Netlify에서 무료 도메인 변경 가능:
- Site settings → Domain management → "Add custom domain"

## 🎉 장점

✅ GitHub 연결 필요 없음 (Email만 있으면 됨)
✅ Drag & Drop으로 배포 가능
✅ 자동 HTTPS
✅ 자동 배포 (GitHub 연결 시)
✅ 완전 무료
✅ Vercel보다 설정 간단

## 문제 해결

### "Function not found" 오류
- Site settings → Environment variables에서 GEMINI_API_KEY 확인
- Deploys → Trigger deploy로 재배포

### "API Error 500" 오류
- Deploys → 최신 배포 클릭 → Function logs 확인
- GEMINI_API_KEY가 올바르게 설정되었는지 확인

### 챗봇이 키워드 응답만 함
- 콘솔에 "Netlify Function 호출 중..." 메시지가 있는지 확인
- 없으면 배포가 완료되지 않았거나 환경 변수 미설정

## 완료 후

이제 진짜 Google Gemini AI가 챗봇에 작동합니다! 🤖✨

무료 제한:
- Netlify: 월 100GB 대역폭, 125,000 Function 호출
- Gemini: 분당 60회, 일일 1,500회

일반 비즈니스 용도로는 충분합니다!
