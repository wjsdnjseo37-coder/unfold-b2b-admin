// Netlify Function - Groq API (무료, 빠름, 안정적)
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY || 'YOUR_API_KEY_HERE';

    const systemPrompt = `당신은 Unfold B2B 어드민 시스템 전문 AI 어시스턴트입니다.

Unfold B2B 시스템 정보:
- 광고 등록: "광고 만들기" 메뉴에서 이미지 업로드, 제목 입력, 트리거 선택, 예산 설정
- 예산: 최소 50,000원부터 (소상공인 50,000원, 중소기업 100,000~200,000원, 대기업 300,000원 이상)
- 정산: 매월 말일 진행, "정산 관리" 메뉴에서 확인
- 트리거: 매장 방문, 생일, 이벤트, 구매 완료, 위치 기반 등
- 대시보드: 실시간 통계, 노출/클릭 수, 전환율, 예산 현황, 월별 트렌드
- 파트너사 등록: 로그인 화면에서 "새 파트너사 등록하기" 선택
- 연락처: 전화 010-8274-0440, 이메일 wjsdnjseo37@gmail.com, 운영시간 평일 09:00-18:00

답변은 친근하고 전문적으로, 이모지를 사용하여 작성하세요.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API returned ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: aiResponse })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get AI response',
        details: error.message 
      })
    };
  }
};
