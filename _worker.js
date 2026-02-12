// ========== _worker.js - FIXED, NO RECURSION ==========
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // ===== YOUR SECRET URLs - Base64 encoded =====
    const SECRET_URLS = [
      'aHR0cHM6Ly8xZC1hbmEucGFnZXMuZGV2', // 0: 1D
      'aHR0cHM6Ly8xbS02cTMucGFnZXMuZGV2', // 1: 1M
      'aHR0cHM6Ly8xbi1hajMucGFnZXMuZGV2', // 2: 1N
      'aHR0cHM6Ly8xZS1jdDYucGFnZXMuZGV2', // 3: 1E
      'aHR0cHM6Ly8yZC1lN3QucGFnZXMuZGV2', // 4: 2D
      'aHR0cHM6Ly8ybS04N2UucGFnZXMuZGV2', // 5: 2M
      'aHR0cHM6Ly8ybi1lZGYucGFnZXMuZGV2', // 6: 2N
      'aHR0cHM6Ly8yZS0ybTMucGFnZXMuZGV2'  // 7: 2E
    ];

    // ✅ Serve static files directly
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return fetch(request);
    }

    // ✅ Handle /go - DIRECT REDIRECT ONLY! NO FETCH TO SELF!
    if (url.pathname === '/go') {
      const index = parseInt(url.searchParams.get('i') || '0');
      
      if (index >= 0 && index < SECRET_URLS.length) {
        const realUrl = atob(SECRET_URLS[index]);
        
        // DIRECT 302 REDIRECT - NO FETCH CALL!
        return new Response(null, {
          status: 302,
          headers: {
            'Location': realUrl,
            'Cache-Control': 'no-cache, no-store',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // ✅ Serve all other files (CSS, JS, images)
    try {
      return await fetch(request);
    } catch {
      return fetch('https://ps3-pio.pages.dev/index.html');
    }
  }
}
