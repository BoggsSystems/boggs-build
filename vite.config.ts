import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-apply-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/apply', async (req, res) => {
            if (req.method === 'OPTIONS') {
              res.statusCode = 204;
              return res.end();
            }
            if (req.method !== 'POST') {
              res.statusCode = 405;
              return res.end();
            }
            let body = '';
            req.on('data', (c) => { body += c; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
              const emailSubject = `uOttawa Student Application [${data.applicationTrack || 'Capstone'}] - ${data.targetSystem || 'Smart Mohs'} (${data.candidateName})`;

              const htmlContent = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.5;">
                  <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 20px; border-radius: 12px; color: #ffffff; margin-bottom: 24px;">
                    <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #e0f2fe; margin-bottom: 4px;">Boggs Systems • uOttawa Intake</div>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">${data.candidateName}</h1>
                    <div style="font-size: 14px; color: #bae6fd; margin-top: 4px;">${data.applicationTrack || 'Capstone'} • ${data.targetSystem || 'System Pod'}</div>
                  </div>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
                    <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 700; color: #64748b; width: 160px;">Candidate Name</td><td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${data.candidateName}</td></tr>
                    <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 700; color: #64748b;">uOttawa Email</td><td style="padding: 10px 0;"><a href="mailto:${data.uottawaEmail}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${data.uottawaEmail}</a></td></tr>
                    <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 700; color: #64748b;">GitHub Profile</td><td style="padding: 10px 0;"><a href="${data.githubUrl}" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 600;">${data.githubUrl}</a></td></tr>
                    <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 700; color: #64748b;">Application Track</td><td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${data.applicationTrack}</td></tr>
                    <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 700; color: #64748b;">Target System Pod</td><td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${data.targetSystem}</td></tr>
                    <tr><td style="padding: 10px 0; font-weight: 700; color: #64748b;">Resume Attached</td><td style="padding: 10px 0; font-weight: 600; color: ${data.resume ? '#10b981' : '#64748b'};">${data.resume ? `Yes (${data.resume.filename})` : 'No (GitHub profile provided)'}</td></tr>
                  </table>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
                    <div style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin-bottom: 8px;">Engineering Strengths & Why I Want This System</div>
                    <div style="font-size: 14px; color: #334155; white-space: pre-wrap;">${data.interestsNote || 'None provided.'}</div>
                  </div>
                </div>
              `;

              const attachments = [];
              if (data.resume && data.resume.content && data.resume.filename) {
                attachments.push({ filename: data.resume.filename, content: data.resume.content });
              }

              const resendRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: 'notifications@opportunity-system.com',
                  to: 'jeff@boggs.build',
                  subject: emailSubject,
                  html: htmlContent,
                  attachments: attachments.length > 0 ? attachments : undefined,
                }),
              });

              const resendData = await resendRes.json();
              res.setHeader('Content-Type', 'application/json');
              if (resendRes.ok) {
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, id: resendData.id }));
              } else {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: resendData.message || 'Resend API error' }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
        });
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    // @ts-ignore - Vite allowedHosts configuration
    allowedHosts: true,
  },
    preview: {
      host: '0.0.0.0',
      // @ts-ignore - Vite allowedHosts configuration
      allowedHosts: true,
    },
  };
});

