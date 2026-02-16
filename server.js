const http = require('http');
const fs = require('fs');
const path = require('path');

// Message store (in-memory with file backup)
const messagesFile = path.join(__dirname, 'messages.json');
let messages = [];

// Load existing messages
if (fs.existsSync(messagesFile)) {
    try {
        messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    } catch (e) {
        messages = [];
    }
}

// Save messages to file
function saveMessages() {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}

// CORS headers for GitHub Pages
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

const server = http.createServer((req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, corsHeaders);
        res.end();
        return;
    }

    // GET /messages - retrieve messages
    if (req.method === 'GET' && req.url === '/messages') {
        res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
        res.end(JSON.stringify(messages.slice(-50))); // Last 50 messages
        return;
    }

    // POST /send - send new message
    if (req.method === 'POST' && req.url === '/send') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const message = {
                    id: Date.now(),
                    sender: data.sender || 'user',
                    text: data.text,
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                    timestamp: Date.now()
                };
                
                messages.push(message);
                saveMessages();
                
                // Also log to console for OpenClaw to see
                console.log('\n🔔 NEW MESSAGE FROM MISSION CONTROL:');
                console.log(`From: ${data.sender}`);
                console.log(`Text: ${data.text}`);
                console.log('─────────────────────────────\n');
                
                res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, id: message.id }));
            } catch (e) {
                res.writeHead(400, corsHeaders);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // POST /respond - AI response (for future use)
    if (req.method === 'POST' && req.url === '/respond') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const message = {
                    id: Date.now(),
                    sender: 'agent',
                    name: 'Bert',
                    text: data.text,
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                    timestamp: Date.now()
                };
                
                messages.push(message);
                saveMessages();
                
                res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (e) {
                res.writeHead(400, corsHeaders);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // Default 404
    res.writeHead(404, corsHeaders);
    res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Mission Control Relay Server         ║
╠════════════════════════════════════════╣
║  Port: ${PORT}                            ║
║  Messages: http://localhost:${PORT}/messages    ║
║  Send: POST http://localhost:${PORT}/send      ║
╚════════════════════════════════════════╝

Waiting for messages from Mission Control app...
`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\nShutting down server...');
    saveMessages();
    server.close(() => {
        console.log('Server closed. Messages saved.');
        process.exit(0);
    });
});
