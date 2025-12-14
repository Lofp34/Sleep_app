# Sleep_app — API IA minimale

Implémentation des endpoints IA décrits dans `CODEX_GPT5_INTEGRATION.md` pour Vercel.

## Endpoints

- `POST /api/ai/recommendation`
  - Entrée : `{ "problem": "endormissement|reveil|recuperation", "rumination": number, "stress": number, "fatigue": number, "duration": "short|normal|long" }`
  - Sortie : recommandation structurée (mock si aucune clé `OPENAI_API_KEY`).

- `POST /api/ai/journal-insight`
  - Entrée : `{ "sleepQuality": number, "note": "..." }`
  - Sortie : observation + conseil doux (mock si aucune clé `OPENAI_API_KEY`).

- `GET /api/health`
  - Vérification rapide du fonctionnement serveur : `{ "status": "ok" }`.

Les deux endpoints renvoient un message de sécurité si des signaux de détresse sont détectés dans le payload.

## Configuration

- `OPENAI_API_KEY` (Vercel Environment Variable) pour activer l’appel GPT-5 mini.
- Sans clé, les réponses restent utilisables grâce aux mocks inclus.

## Développement local

Aucune dépendance externe n’est requise pour les mocks. Pour vérifier la syntaxe Node :

```bash
node -e "require('./api/ai/recommendation'); require('./api/ai/journal-insight')"
```

## Déploiement Vercel

Structure compatible avec les Serverless Functions (`/api/ai/*`).
Assurez-vous d’ajouter `OPENAI_API_KEY` dans les variables d’environnement Vercel pour activer l’IA.
