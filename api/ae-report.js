javascript
export default async function handler(req, res) {
  // 1. SET EXPLICIT HEADERS (Replace * with your actual Hostinger URL for better safety)
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', 'https://safesignal-portal-builder-nzko98ouc1ykimj5.hostingersite.com'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type'
  );

  // 2. HANDLE PREFLIGHT (REQUIRED for complex POST requests)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    console.log("=== DATA RECEIVED FROM HOSTINGER ===", data);

    return res.status(200).json({ 
      success: true, 
      message: 'Report received!' 
    });
  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
