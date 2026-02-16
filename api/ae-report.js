javascript
export default async function handler(req, res) {
  // 1. ALLOW CORS (This lets your Hostinger site talk to Vercel)
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all websites to send data (Safe for testing)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Handle the "Preflight" request (Browsers send this first to check permissions)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 3. Only allow POST requests (The form submission)
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    // 4. Basic Validation: Ensure required fields are not empty
    if (!data.reporterName || !data.reporterEmail || !data.eventDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: Name, Email, or Description.' 
      });
    }

    // 5. LOG THE DATA: You will see this in your Vercel Project "Logs" tab
    console.log("=== NEW SAFETY REPORT FROM HOSTINGER ===");
    console.log("Reporter:", data.reporterName, `(${data.reporterEmail})`);
    console.log("Event:", data.eventDescription);
    console.log("Serious:", data.serious || "No");
    console.log("=========================================");

    // 6. Send success response back to Hostinger
    return res.status(200).json({ 
      success: true, 
      message: 'Report logged successfully' 
    });

  } catch (error) {
    console.error("Submission Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
}
