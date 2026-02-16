import { createClient } from '@supabase/supabase-client';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const origin = req.headers.origin;
  // Specific Hostinger URL
  const allowed = "https://safesignal-portal-builder-nzko98ouc1ykimj5.hostingersite.com";

  res.setHeader('Access-Control-Allow-Origin', origin === allowed ? origin : allowed);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const data = req.body;
    if (data.patientAge) data.patientAge = parseInt(data.patientAge, 10) || null;
    
    const { error } = await supabase.from('safety_reports').insert([data]);
    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
