# 🤖 GPT‑5 mini — INTÉGRATION IA (VERCEL + NEON)
## Extension IA pour l’application Sommeil & Récupération

---

## 🎯 OBJECTIF

Intégrer **GPT‑5 mini (OpenAI)** de manière **utile, discrète et sécurisée**, afin de :
- Réduire la charge cognitive de l’utilisateur
- Recommander **une seule action pertinente**
- Enrichir le journal de sommeil sans dérive thérapeutique

L’IA doit **servir le sommeil**, jamais l’excitation mentale.

---

## 🧠 PRINCIPES IA NON NÉGOCIABLES

1. **IA invisible**
   - Pas de chat permanent
   - Réponses courtes (1–3 phrases max)
   - Sorties structurées

2. **Aucun diagnostic**
   - Bien‑être uniquement
   - Disclaimer constant

3. **Ritualisation**
   - Même structure de réponse chaque soir
   - Ton neutre, calme, rassurant

---

## 🏗️ ARCHITECTURE TECHNIQUE

```
App React Native
      ↓
API Routes Vercel (Serverless)
      ↓
OpenAI Responses API (gpt‑5‑mini)
      ↓
PostgreSQL Neon (journal / préférences)
```

- ❌ Jamais de clé OpenAI dans l’app mobile
- ✅ Clé stockée uniquement dans **Vercel Secrets / Environment Variables**

---

## 🔐 CONFIGURATION DES SECRETS VERCEL (IMPORTANT)

### Variable d’environnement requise

Dans **Vercel Dashboard → Project → Settings → Environment Variables** :

| Name | Value | Environments |
|----|----|----|
| `OPENAI_API_KEY` | `sk-xxxxxxxx` | Production, Preview, Development |

⚠️ **Bonnes pratiques**
- Ne jamais commiter la clé
- Une seule variable suffit
- Vercel injecte automatiquement la variable dans `process.env`

---

## 🔌 ACCÈS À LA CLÉ DANS LE CODE (Vercel)

Exemple TypeScript (API Route) :

```ts
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY manquante dans Vercel");
}
```

Aucune autre configuration n’est nécessaire.

---

## 📡 ENDPOINT IA À CRÉER

### 1️⃣ `/api/ai/recommendation`

**But** : recommander **UNE séance** pour ce soir.

**Input**
```json
{
  "problem": "endormissement | reveil | recuperation",
  "rumination": 0,
  "stress": 2,
  "fatigue": 3,
  "duration": "short | normal | long"
}
```

**Output (JSON strict)**
```json
{
  "sessionId": "sleep_03",
  "title": "Relâcher l’hyper‑éveil",
  "why": "Ton mental est encore très actif ce soir.",
  "instruction": "Lance la séance et pose le téléphone écran éteint.",
  "oneTipForTomorrow": "Coupe les écrans 20 minutes plus tôt."
}
```

---

### 2️⃣ `/api/ai/journal-insight`

**But** : transformer le journal brut en **observation + micro‑action**.

**Input**
```json
{
  "sleepQuality": 2,
  "note": "réveillé vers 3h, pensées en boucle"
}
```

**Output**
```json
{
  "observation": "Le réveil nocturne semble lié à une activation cognitive.",
  "gentleAdvice": "Teste une respiration lente si cela se reproduit."
}
```

---

## 🧾 PROMPT SYSTEM (À UTILISER CÔTÉ BACKEND)

```text
Tu es un assistant de bien‑être spécialisé dans le sommeil.
Tu ne poses jamais de diagnostic médical.
Tu réponds toujours en JSON strict.
Tes réponses sont courtes, calmes, non anxiogènes.
Tu proposes UNE action maximum.
Tu n’utilises jamais de jargon thérapeutique.
```

---

## ⚙️ APPEL OPENAI — GPT‑5 MINI (RESPONSES API)

Exemple simplifié :

```ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
  model: "gpt-5-mini",
  input: [
    {
      role: "system",
      content: SYSTEM_PROMPT
    },
    {
      role: "user",
      content: JSON.stringify(userInput)
    }
  ],
  max_output_tokens: 200
});
```

---

## 💾 BASE DE DONNÉES (NEON / PRISMA)

### Table complémentaire
- `ai_recommendations`
  - id
  - user_id (optionnel)
  - payload (JSON)
  - created_at

⚠️ Stocker uniquement :
- résultats utiles
- jamais le prompt complet
- jamais de données sensibles inutiles

---

## 🧪 STRATÉGIE DE COÛT & PERFORMANCE

- GPT‑5 mini uniquement
- Réponses courtes (≤ 200 tokens)
- Cache possible côté API (24h)
- Pas d’appel IA automatique sans action utilisateur

---

## 🚨 CAS SENSIBLES

Si l’input utilisateur contient :
- détresse intense
- idées noires
- anxiété sévère

👉 Réponse fixe :
> “Cette application ne remplace pas un professionnel de santé. Si le sommeil devient une souffrance, parle‑en à un professionnel.”

---

## ✅ CRITÈRES DE VALIDATION IA

- L’app fonctionne sans clé exposée
- Les endpoints IA répondent en < 1s
- Aucune réponse longue ou anxiogène
- Structure toujours identique
- Aucun claim médical

---

## 🧠 PHILOSOPHIE FINALE

L’IA doit :
- réduire le bruit mental
- simplifier les choix
- renforcer le rituel

Si une fonctionnalité IA **n’aide pas à dormir**, elle doit être supprimée.
