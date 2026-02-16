javascript
export default async function handler(req, res) {
  // 1. SET CORS HEADERS (Crucial for Hostinger)
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows requests from any site
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. HANDLE PREFLIGHT (OPTIONS)
  // Browsers send an "OPTIONS" request before the "POST" to check permissions.
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 3. ONLY ALLOW POST REQUESTS
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed' 
    });
  }

  try {
    const data = req.body;

    // 4. VALIDATION
    if (!data.reporterName || !data.reporterEmail || !data.eventDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Required fields: Name, Email, and Description.' 
      });
    }

    // 5. LOG TO VERCEL DASHBOARD
    // Check your Vercel Project -> Logs tab to see this data
    console.log("=== NEW SAFETY REPORT ===");
    console.log("Reporter:", data.reporterName, `(${data.reporterEmail})`);
    console.log("Phone:", data.reporterPhone);
    console.log("Country:", data.reporterCountry);
    console.log("Patient ID:", data.patientInitials);
    console.log("Product:", data.productName);
    console.log("Event Details:", data.eventDescription);
    console.log("Serious:", data.serious);
    console.log("=========================");

    // 6. SUCCESS RESPONSE
    return res.status(200).json({ 
      success: true, 
      message: 'Report received successfully!' 
    });

  } catch (error) {
    console.error("Submission Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
}
