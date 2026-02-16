javascript
export default async function handler(req, res) {
  // 1. SET CORS HEADERS (Crucial for Hostinger)
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. HANDLE PREFLIGHT (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 3. ONLY ALLOW POST REQUESTS
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    // 4. VALIDATION
    if (!data || !data.reporterName || !data.reporterEmail || !data.eventDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: Name, Email, or Description.' 
      });
    }

    // 5. LOG THE DATA (View this in Vercel Dashboard -> Logs)
    console.log("=== NEW SAFETY REPORT RECEIVED ===");
    console.log("Reporter:", data.reporterName, `(${data.reporterEmail})`);
    console.log("Event:", data.eventDescription);
    console.log("Serious:", data.serious || "No");
    console.log("==================================");

    // 6. SUCCESS RESPONSE
    return res.status(200).json({ 
      success: true, 
      message: 'Report logged successfully' 
    });

  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
