const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  try {
    const requestBody = req.body;
    if (!requestBody || !Array.isArray(requestBody.data)) {
      return res
        .status(400)
        .json({ error: "Invalid JSON format. 'data' should be an array." });
    }


    const alphabets = requestBody.data.filter((item) => isNaN(item));
    const numbers = requestBody.data.filter((item) => !isNaN(item));
    const lowerCaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));
    const highestLowerCaseAlphabet = lowerCaseAlphabets.length
      ? [lowerCaseAlphabets.sort().reverse()[0]]
      : [];

    
    let fileInfo = {
      file_valid: false,
    };

    if (requestBody.file_b64) {
      const base64String = requestBody.file_b64;
      const buffer = Buffer.from(base64String, "base64");

      
      const fileType = "application/octet-stream"; 
      const fileSizeKb = buffer.length / 1024; 

      fileInfo = {
        file_valid: true,
        file_mime_type: fileType,
        file_size_kb: fileSizeKb.toFixed(2),
      };
    }

    
    return res.json({
      is_success: true,
      user_id: "murthy_23082003",
      college_email_id: "samudramurthy_v@srmap.edu.in",
      college_roll_no: "AP21110011284",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowerCaseAlphabet,
      ...fileInfo,
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/bfhl", (req, res) => {
  return res.json({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
