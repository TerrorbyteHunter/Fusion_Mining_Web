#!/usr/bin/env node
const fs = require('fs');

function loadEnv() {
  const env = {};
  if (process.env.HF_API_KEY) env.HF_API_KEY = process.env.HF_API_KEY;
  if (process.env.HF_MODEL) env.HF_MODEL = process.env.HF_MODEL;
  const envPath = `${process.cwd()}/.env`;
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, 'utf8');
    raw.split(/\r?\n/).forEach(line => {
      const m = line.match(/^\s*([A-Za-z0-9_]+)=(.*)$/);
      if (m) {
        const k = m[1];
        let v = m[2] || '';
        // strip surrounding quotes
        if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
        if (!env[k]) env[k] = v;
      }
    });
  }
  return env;
}

async function main() {
  const env = loadEnv();
  const apiKey = env.HF_API_KEY;
  const model = env.HF_MODEL || 'deepseek-ai/DeepSeek-V3.2:novita';

  if (!apiKey) {
    console.error('HF_API_KEY not found in environment or .env.');
    process.exit(2);
  }

  const routerUrl = 'https://router.huggingface.co/v1/chat/completions';
  const body = {
    model,
    messages: [
      { role: 'system', content: "You are Fusion Mining's support assistant." },
      { role: 'user', content: 'Hello from hf_router_test: please say hi and identify the model.' }
    ],
    max_tokens: 200,
    temperature: 0.2,
  };

  console.log('HF inference request ->', routerUrl, 'model=', model);
  try {
    const resp = await fetch(routerUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const txt = await resp.text();
    console.log('Response status:', resp.status, resp.statusText);
    const out = txt && txt.length > 2000 ? txt.slice(0, 2000) + '...(truncated)' : txt;
    console.log('Response body (truncated):', out);
    if (!resp.ok) process.exit(3);
  } catch (err) {
    console.error('Request failed:', err);
    process.exit(4);
  }
}

main();
