# Google Gemini API 설정 가이드 (무료)

## 1. API 키 발급받기

1. **Google AI Studio 접속**
   - 브라우저에서 https://makersuite.google.com/app/apikey 접속
   - 또는 https://aistudio.google.com/app/apikey

2. **Google 계정으로 로그인**
   - Gmail 계정으로 로그인

3. **API 키 생성**
   - "Create API key" 버튼 클릭
   - 새 프로젝트 생성 또는 기존 프로젝트 선택
   - API 키가 생성됩니다 (예: AIzaSyD...)

4. **API 키 복사**
   - 생성된 API 키를 복사해두세요

## 2. 코드에 API 키 적용

`app.html` 파일을 열어서 다음 부분을 찾으세요:

```javascript
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
```

이 부분을 발급받은 API 키로 변경:

```javascript
const GEMINI_API_KEY = 'AIzaSyD...여기에_발급받은_키_입력';
```

## 3. 저장 및 배포

```bash
cd "C:\Users\사용자\OneDrive\Desktop\미팅 자료\개발\_언폴드B2B어드민"
git add .
git commit -m "Add Gemini API key"
git push
```

## 4. 무료 티어 제한사항

Google Gemini API 무료 티어:
- ✅ 분당 60회 요청
- ✅ 일일 1,500회 요청
- ✅ 월간 무료 (상용 서비스 가능)

일반 챗봇 용도로는 충분합니다!

## 5. 테스트

1. GitHub Pages에서 사이트 접속
   - https://wjsdnjseo37-coder.github.io/unfold-b2b-admin/

2. 우측 하단 챗봇 버튼 클릭

3. 아무 메시지나 입력해서 테스트
   - "광고는 어떻게 만드나요?"
   - "예산은 얼마가 필요한가요?"

4. 응답이 더 자연스럽고 상세해졌다면 성공! 🎉

## 주의사항

⚠️ **API 키 보안**
- API 키는 공개 저장소에 올리지 마세요
- GitHub에 올릴 때는 환경 변수로 관리하는 것이 좋습니다
- 테스트용으로만 사용하고, 프로덕션에서는 백엔드에서 API 호출

## 문제 해결

**API 키가 작동하지 않을 때:**
1. API 키 형식 확인 (AIzaSy로 시작하는지)
2. Google AI Studio에서 API 키가 활성화되었는지 확인
3. 브라우저 콘솔(F12)에서 오류 메시지 확인

**할당량 초과 시:**
- 무료 티어는 분당 60회, 일일 1,500회 제한
- 다음 날 또는 다음 분이 되면 다시 사용 가능
- 필요시 유료 플랜 업그레이드

## 더 나은 응답을 위한 팁

챗봇이 더 똑똑해졌습니다! 이제:
- 자연스러운 대화 가능
- 복잡한 질문도 이해
- 맥락을 고려한 답변
- 더 상세하고 친절한 설명

예시 질문:
- "광고 캠페인을 처음 만드는데 어떻게 시작하면 좋을까요?"
- "예산이 10만원밖에 없는데 효과적인 전략이 있나요?"
- "정산이 늦어지고 있는데 어떻게 해야 하나요?"
