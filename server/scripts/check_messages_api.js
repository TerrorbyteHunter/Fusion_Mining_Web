(async ()=>{
  const base = 'http://localhost:7000';
  // login as admin
  const loginResp = await fetch(base + '/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  console.log('login status', loginResp.status);
  const setCookie = loginResp.headers.get('set-cookie');
  console.log('set-cookie', setCookie);
  const cookieHeader = setCookie ? setCookie.split(';')[0] : '';

  const messagesResp = await fetch(base + '/api/messages', {
    method: 'GET',
    headers: { Cookie: cookieHeader }
  });
  console.log('messages status', messagesResp.status);
  const json = await messagesResp.json();
  console.dir(json, { depth: 2 });
})();
