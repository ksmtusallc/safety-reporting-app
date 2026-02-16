javascript
export default async function handler(req, res) {
  // 1. Only allow POST requests (this is what your form sends)
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed' 
    });
  }

  try {
    // 2. Capture the data sent from your index.html
    const data = req.body;

    // 3. Validation: Ensure required fields are not empty
    if (!data.reporterName || !data.reporterEmail || !data.eventDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Error: Name, Email, and Description are required.' 
    });
  }

    // 4. LOG THE DATA: This is how you read the reports!
    // You will see this in the "Logs" tab of your Vercel Project.
    console.log("--- NEW SAFETY REPORT RECEIVED ---");
    console.log("Reporter:", data.reporterName);
    console.log("Email:", data.reporterEmail);
    console.log("Country:", data.reporterCountry || "Not Provided");
    console.log("Patient ID:", data.patientInitials || "N/A");
    console.log("Product:", data.productName || "Unknown");
    console.log("Event Description:", data.eventDescription);
    console.log("Serious:", data.serious || "Not Specified");
    console.log("----------------------------------");

    // 5. Send a success response back to the user's browser
    return res.status(200).json({ 
      success: true, 
      message: 'Report received successfully!' 
    });

  } catch (error) {
    // If something breaks, log the error
    console.error("Backend Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
}
