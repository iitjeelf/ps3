export default {
    async fetch(request) {
        const url = new URL(request.url);
        
        // Handle password check
        if (url.pathname === '/api/check-password') {
            const { password } = await request.json();
            
            // Define your passwords here
            const validPasswords = {
                'admin123': { type: 'sections' },  // Shows section buttons
                'teacher456': { type: 'redirect', url: 'https://teacher-dashboard.com' },
                'student789': { type: 'redirect', url: 'https://exam-portal.com' }
            };
            
            if (validPasswords[password]) {
                return Response.json({
                    success: true,
                    ...validPasswords[password]
                });
            } else {
                return Response.json({
                    success: false,
                    message: 'Invalid password'
                });
            }
        }
        
        // Handle section URLs
        if (url.pathname === '/api/get-section-url') {
            const { section } = await request.json();
            
            // Define your section URLs here
            const sectionUrls = {
                '1D': 'https://1d-exam.pages.dev',
                '1M': 'https://1m-exam.pages.dev',
                '1N': 'https://1n-exam.pages.dev',
                '1E': 'https://1e-exam.pages.dev',
                '2D': 'https://2d-exam.pages.dev',
                '2M': 'https://2m-exam.pages.dev',
                '2N': 'https://2n-exam.pages.dev',
                '2E': 'https://2e-exam.pages.dev'
            };
            
            if (sectionUrls[section]) {
                return Response.json({
                    success: true,
                    url: sectionUrls[section]
                });
            } else {
                return Response.json({
                    success: false,
                    message: 'Section not found'
                });
            }
        }
        
        return new Response('Not found', { status: 404 });
    }
}
