import { createClient } from '@supabase/supabase-client';

// Initialize Supabase using environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const data = req.body;

      // Ensure patientAge is a number or null for Postgres
      if (data.patientAge) data.patientAge = parseInt(data.patientAge);
      if (data.patientAge === "") data.patientAge = null;

      const { error } = await supabase
        .from('safety_reports')
        .insert([data]);

      if (error) throw error;

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
