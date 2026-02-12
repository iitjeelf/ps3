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
        
        // Get URLs from Cloudflare Secrets
        const urlMap = {
            '1D': context.env.URL_1D,
            '1M': context.env.URL_1M,
            '1N': context.env.URL_1N,
            '1E': context.env.URL_1E,
            '2D': context.env.URL_2D,
            '2M': context.env.URL_2M,
            '2N': context.env.URL_2N,
            '2E': context.env.URL_2E
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
