export async function onRequest(context) {
    // Only allow POST requests
    if (context.request.method !== 'POST') {
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Method not allowed' 
        }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { section } = await context.request.json();
        
        // ✅ YOUR MAIN DOMAIN - CHANGE THIS TO YOUR ACTUAL DOMAIN
        const baseUrl = 'https://ps3-pio.pages.dev';  // ← YOUR ACTUAL DOMAIN
        
        const urlMap = {
            '1D': `${baseUrl}/1d/`,
            '1M': `${baseUrl}/1m/`,
            '1N': `${baseUrl}/1n/`,
            '1E': `${baseUrl}/1e/`,
            '2D': `${baseUrl}/2d/`,
            '2M': `${baseUrl}/2m/`,
            '2N': `${baseUrl}/2n/`,
            '2E': `${baseUrl}/2e/`,
        };

        const url = urlMap[section];

        if (!url) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Section not found' 
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ 
            success: true, 
            url: url
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Invalid request' 
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
