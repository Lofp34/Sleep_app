const {
  DISTRESS_MESSAGE,
  detectDistress,
  readRequestBody,
  callOpenAi,
  respond
} = require('./shared');

const MOCK_RECOMMENDATION = {
  sessionId: 'sleep_03',
  title: "Relâcher l’hyper-éveil",
  why: 'Ton mental est encore très actif ce soir.',
  instruction: 'Lance la séance et pose le téléphone écran éteint.',
  oneTipForTomorrow: 'Coupe les écrans 20 minutes plus tôt.'
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed' });
  }

  let payload;
  try {
    payload = await readRequestBody(req);
  } catch (error) {
    return respond(res, 400, { error: 'Corps de requête JSON invalide' });
  }

  const distress = detectDistress(payload);
  if (distress) {
    return respond(res, 200, { message: DISTRESS_MESSAGE });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return respond(res, 200, MOCK_RECOMMENDATION);
  }

  try {
    const aiResult = await callOpenAi({ apiKey, userPayload: payload });
    if (aiResult) {
      return respond(res, 200, aiResult);
    }
    return respond(res, 200, MOCK_RECOMMENDATION);
  } catch (error) {
    return respond(res, 200, MOCK_RECOMMENDATION);
  }
};
