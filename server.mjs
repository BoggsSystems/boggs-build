import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm',
  '.pdf': 'application/pdf',
};

async function handleApply(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 20 * 1024 * 1024) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Payload exceeds 20MB limit' }));
      req.destroy();
    }
  });

  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const {
        candidateName,
        uottawaEmail,
        githubUrl,
        applicationTrack,
        targetSystem,
        interestsNote,
        resume,
      } = data;

      if (!candidateName || !uottawaEmail) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Candidate name and email are required' }));
      }

      const emailSubject = `uOttawa Student Application [${applicationTrack || 'Capstone'}] - ${targetSystem || 'Smart Mohs'} (${candidateName})`;

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.5;">
          <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 20px; border-radius: 12px; color: #ffffff; margin-bottom: 24px;">
            <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #e0f2fe; margin-bottom: 4px;">Boggs Systems • uOttawa Intake</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">${candidateName}</h1>
            <div style="font-size: 14px; color: #bae6fd; margin-top: 4px;">${applicationTrack || 'Capstone'} • ${targetSystem || 'System Pod'}</div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b; width: 160px;">Candidate Name</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${candidateName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">uOttawa Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${uottawaEmail}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${uottawaEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">GitHub Profile</td>
              <td style="padding: 10px 0;"><a href="${githubUrl}" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 600;">${githubUrl}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">Application Track</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${applicationTrack}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">Target System Pod</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${targetSystem}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #64748b;">Resume Attached</td>
              <td style="padding: 10px 0; font-weight: 600; color: ${resume ? '#10b981' : '#64748b'};">${resume ? `Yes (${resume.filename})` : 'No (GitHub profile provided)'}</td>
            </tr>
          </table>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
            <div style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin-bottom: 8px;">Engineering Strengths & Why I Want This System</div>
            <div style="font-size: 14px; color: #334155; white-space: pre-wrap;">${interestsNote || 'None provided.'}</div>
          </div>

          <div style="margin-top: 20px; margin-bottom: 24px;">
            <a href="mailto:${uottawaEmail}?subject=Re:%20uOttawa%20Student%20Application%20-%20${encodeURIComponent(targetSystem || 'Boggs Systems')}" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 11px 22px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">
              ✉️ Reply to ${candidateName} (${uottawaEmail})
            </a>
          </div>

          <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            Submitted directly through <a href="https://boggs.build" style="color: #0284c7; text-decoration: none;">boggs.build</a> Student Fast-Track Intake.
          </div>
        </div>
      `;

      const attachments = [];
      if (resume && resume.content && resume.filename) {
        attachments.push({
          filename: resume.filename,
          content: resume.content,
        });
      }

      const resendPayload = {
        from: 'notifications@opportunity-system.com',
        to: 'jeff@boggs.build',
        subject: emailSubject,
        html: htmlContent,
        attachments: attachments.length > 0 ? attachments : undefined,
      };

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendPayload),
      });

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error('Resend API Error:', resendData);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: resendData.message || 'Failed to dispatch email' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, id: resendData.id }));
    } catch (err) {
      console.error('Apply processing error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'POST' && pathname === '/api/apply') {
    return handleApply(req, res);
  }

  let filePath = path.join(DIST_DIR, pathname);

  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500);
          return res.end('Dist directory or index.html missing. Run npm run build.');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    if (filePath.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=300');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Boggs Systems Production Server listening on http://0.0.0.0:${PORT}`);
});
