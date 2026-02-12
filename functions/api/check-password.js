export async function onRequest(context) {
    // Only allow POST requests
    if (context.request.method !== 'POST') {
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Method not allowed' 
        }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Get password from request body
        const { password } = await context.request.json();
        
        // Get valid password from Secrets (NOT hardcoded!)
        const validPassword = context.env.ACCESS_CODE;
        
        // Check if password matches
        if (password === validPassword) {
            // Success - return which screen to show
            return new Response(JSON.stringify({ 
                success: true, 
                type: 'sections'  // This takes user to the sections page
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            // Failed authentication
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Incorrect access code. Please try again.' 
            }), {
                status: 200, // Use 200 even for failure to handle gracefully
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
    } catch (error) {
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Authentication service unavailable' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
