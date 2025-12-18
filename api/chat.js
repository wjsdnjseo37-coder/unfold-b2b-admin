// Vercel Serverless Function - Gemini API Proxy
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Vercel 환경 변수에서 API 키 가져오기
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const systemPrompt = `당신은 Unfold B2B 어드민 시스템 전문 AI 어시스턴트입니다. 

🚨 중요 규칙:
- Unfold B2B 시스템 관련 질문만 답변하세요
- 광고, 예산, 정산, 트리거, 캠페인, 파트너사 등록 등과 관련 없는 질문은 정중히 거절하세요
- 비즈니스와 무관한 질문(날씨, 일상 대화, 일반 지식 등)에는 "죄송하지만 Unfold B2B 시스템 관련 질문에만 답변드립니다"라고 답하세요

Unfold B2B 시스템 정보:
- 광고 등록: "광고 만들기" 메뉴에서 이미지 업로드, 제목 입력, 트리거 선택, 예산 설정
- 예산: 최소 50,000원부터 (소상공인 50,000원, 중소기업 100,000~200,000원, 대기업 300,000원 이상)
- 정산: 매월 말일 진행, "정산 관리" 메뉴에서 확인
- 트리거: 매장 방문, 생일, 이벤트, 구매 완료, 위치 기반 등
- 대시보드: 실시간 통계, 노출/클릭 수, 전환율, 예산 현황, 월별 트렌드
- 파트너사 등록: 로그인 화면에서 "새 파트너사 등록하기" 선택
- 연락처: 전화 010-8274-0440, 이메일 wjsdnjseo37@gmail.com, 운영시간 평일 09:00-18:00

답변 스타일:
- 이모지 사용
- 친근하지만 전문적인 톤
- 비즈니스 관련 질문에만 상세히 답변
- 비즈니스 외 질문은 정중히 거절하고 시스템 관련 질문을 유도
- 필요시 메뉴 경로나 단계별 안내 제공`;

    // Google Gemini API 호출
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\n사용자 질문: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ response: aiResponse });
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
}
