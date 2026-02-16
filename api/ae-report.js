javascript
export default async function handler(req, res) {
  const allowedOrigin = "https://safesignal-portal-builder-nzko98ouc1ykimj5.hostingersite.com";
  
  // Set headers dynamically based on the request origin
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle the browser's "Preflight" check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    console.log("Form Data Received:", req.body);
    return res.status(200).json({ success: true, message: "Report received!" });
  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
