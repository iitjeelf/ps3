// ========== _worker.js - ULTIMATE HIDDEN ==========
// No section names, no paths – only numeric index!

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // ===== ALL YOUR SECRET URLs - Base64 encoded =====
    const SECRET_URLS = [
      'aHR0cHM6Ly8xZC1hbmEucGFnZXMuZGV2', // index 0 = 1D
      'aHR0cHM6Ly8xbS02cTMucGFnZXMuZGV2', // index 1 = 1M
      'aHR0cHM6Ly8xbi1hajMucGFnZXMuZGV2', // index 2 = 1N
      'aHR0cHM6Ly8xZS1jdDYucGFnZXMuZGV2', // index 3 = 1E
      'aHR0cHM6Ly8yZC1lN3QucGFnZXMuZGV2', // index 4 = 2D
      'aHR0cHM6Ly8ybS04N2UucGFnZXMuZGV2', // index 5 = 2M
      'aHR0cHM6Ly8ybi1lZGYucGFnZXMuZGV2', // index 6 = 2N
      'aHR0cHM6Ly8yZS0ybTMucGFnZXMuZGV2'  // index 7 = 2E
    ];

    // ===== INTERCEPT REQUESTS TO /go =====
    if (url.pathname === '/go') {
      const index = parseInt(url.searchParams.get('i')); // ?i=0, ?i=1, ...
      
      // Validate index
      if (index >= 0 && index < SECRET_URLS.length) {
        const realUrl = atob(SECRET_URLS[index]);
        return Response.redirect(realUrl, 302);
      }
    }

    // Serve all other files normally
    return fetch(request);
  }
}
