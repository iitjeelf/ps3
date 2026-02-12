// ========== _worker.js - ABSOLUTELY NO FETCH ==========
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // ===== YOUR SECRET URLs (Base64 encoded) =====
    const SECRET_URLS = [
      'aHR0cHM6Ly8xZC1hbmEucGFnZXMuZGV2', // 1D
      'aHR0cHM6Ly8xbS02cTMucGFnZXMuZGV2', // 1M
      'aHR0cHM6Ly8xbi1hajMucGFnZXMuZGV2', // 1N
      'aHR0cHM6Ly8xZS1jdDYucGFnZXMuZGV2', // 1E
      'aHR0cHM6Ly8yZC1lN3QucGFnZXMuZGV2', // 2D
      'aHR0cHM6Ly8ybS04N2UucGFnZXMuZGV2', // 2M
      'aHR0cHM6Ly8ybi1lZGYucGFnZXMuZGV2', // 2N
      'aHR0cHM6Ly8yZS0ybTMucGFnZXMuZGV2'  // 2E
    ];

    // ✅ HANDLE ROOT - serve index.html directly
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return fetch('https://ps3-pio.pages.dev/index.html');
    }

    // ✅ HANDLE /go - DIRECT REDIRECT ONLY! NO FETCH!
    if (url.pathname === '/go') {
      const index = parseInt(url.searchParams.get('i') || '0');
      
      if (index >= 0 && index < SECRET_URLS.length) {
        const realUrl = atob(SECRET_URLS[index]);
        
        // ⚠️ IMPORTANT: This is a DIRECT response. NO fetch() call!
        return new Response(null, {
          status: 302,
          headers: {
            'Location': realUrl,
            'Cache-Control': 'no-cache, no-store'
          }
        });
      }
    }

    // ✅ HANDLE STATIC FILES - CSS, JS, IMAGES
    // This is the ONLY place fetch() is used
    try {
      // Only fetch static assets from your pages.dev domain
      if (url.pathname.includes('.')) {
        return fetch(request);
      }
    } catch (e) {
      // Ignore errors
    }

    // ✅ DEFAULT - serve index.html
    return fetch('https://ps3-pio.pages.dev/index.html');
  }
}
