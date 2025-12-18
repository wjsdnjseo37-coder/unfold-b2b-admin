// netlify/functions/chat.js
// OpenAI API (안정적, 고성능, 한국어 최적화)

exports.handler = async (event, context) => {
  // 1. CORS 헤더 설정 (보안 및 프론트엔드 통신 허용)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // 2. Preflight 요청(OPTIONS) 처리
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // 3. POST 요청만 허용
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    // 4. 요청 데이터 파싱 및 검증
    const { message } = JSON.parse(event.body);
    if (!message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message is required' }) };
    }

    // 5. OpenAI API Key 확인 (방어 로직)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('CRITICAL: OPENAI_API_KEY is missing in Netlify Environment Variables.');
      throw new Error('Server configuration error: API Key missing');
    }

    // 6. 시스템 프롬프트 (System Prompt)
    const systemPrompt = `당신은 Unfold B2B 어드민 시스템 전문 AI 어시스턴트입니다.
    
[시스템 정보]
- 광고 등록: "광고 만들기" 메뉴에서 이미지 업로드, 제목 입력, 트리거 선택, 예산 설정
- 예산: 최소 5만 원 (소상공인 5만, 중소기업 10~20만, 대기업 30만 이상)
- 정산: 매월 말일 진행, "정산 관리" 메뉴 확인
- 트리거: 매장 방문, 생일, 이벤트, 구매 완료, 위치 기반
- 대시보드: 실시간 통계, 노출/클릭 수, 전환율 제공
- 파트너사 등록: 로그인 화면 "새 파트너사 등록하기"
- 연락처: 010-8274-0440 / wjsdnjseo37@gmail.com

[답변 가이드]
- 답변은 친근하고 전문적인 "해요체"를 사용하세요.
- 적절한 이모지(📊, 💡, 💰 등)를 사용하여 가독성을 높이세요.
- 핵심만 요약하여 150자 이내로 답변하세요.`;

    // 7. OpenAI API 호출 (fetch 사용)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    // 8. API 응답 에러 처리
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API returned ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    // 9. 응답 데이터 가공
    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || '죄송합니다. 답변을 생성하지 못했습니다.';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: aiResponse })
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
    };
  }
};
