const SYSTEM_PROMPT = [
  "Tu es un assistant de bien-être spécialisé dans le sommeil.",
  "Tu ne poses jamais de diagnostic médical.",
  "Tu réponds toujours en JSON strict.",
  "Tes réponses sont courtes, calmes, non anxiogènes.",
  "Tu proposes UNE action maximum.",
  "Tu n’utilises jamais de jargon thérapeutique."
].join(' ');

const DISTRESS_KEYWORDS = [
  'detresse',
  'détresse',
  'suicide',
  'desespoir',
  'désespoir',
  'angoisse',
  'anxiete',
  'anxiété',
  'idee noire',
  'idée noire'
];

const DISTRESS_MESSAGE =
  "Cette application ne remplace pas un professionnel de santé. Si le sommeil devient une souffrance, parle-en à un professionnel.";

async function readRequestBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') {
      return JSON.parse(req.body);
    }
    return req.body;
  }

  const rawBody = await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

  if (!rawBody) return {};
  return JSON.parse(rawBody);
}

function detectDistress(payload) {
  const combined = JSON.stringify(payload || {}).toLowerCase();
  return DISTRESS_KEYWORDS.some((keyword) => combined.includes(keyword))
    ? DISTRESS_MESSAGE
    : null;
}

function extractJsonContent(aiResponse) {
  if (!aiResponse) return null;

  if (typeof aiResponse === 'string') {
    try {
      return JSON.parse(aiResponse);
    } catch (error) {
      return null;
    }
  }

  const outputText = aiResponse.output_text;
  if (outputText) {
    try {
      return JSON.parse(outputText);
    } catch (error) {
      // continue
    }
  }

  const text = aiResponse?.output?.[0]?.content?.[0]?.text;
  if (text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      return null;
    }
  }
  return null;
}

async function callOpenAi({ apiKey, userPayload }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      input: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: JSON.stringify(userPayload) }
      ],
      max_output_tokens: 200,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${errorBody}`);
  }

  const aiData = await response.json();
  return extractJsonContent(aiData);
}

function respond(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

module.exports = {
  SYSTEM_PROMPT,
  DISTRESS_MESSAGE,
  readRequestBody,
  detectDistress,
  callOpenAi,
  respond
};
