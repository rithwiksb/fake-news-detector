import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import "./App.css";

function App() {
  const [newsText, setNewsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/predict/", { text: newsText });
      setResult(response.data.prediction);
    } catch (error) {
      setResult("Error analyzing news, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      {/* Increased margin-bottom to create spacing */}
      <Typography variant="h4" className="title" style={{ marginBottom: "2rem" }}>
        Fake News Detector
      </Typography>

      {/* Increased margin-bottom for spacing below text field */}
      <TextField
        className="textbox"
        label="Enter news text..."
        multiline
        rows={4}
        variant="outlined"
        onChange={(e) => setNewsText(e.target.value)}
        fullWidth
        InputProps={{ style: { color: "#ffffff" } }} 
        style={{ marginBottom: "2rem" }} 
      />

      {/* Increased margin-bottom for spacing below button */}
      <Button 
  variant="contained" 
  onClick={handleAnalyze} 
  disabled={loading}
  sx={{ backgroundColor: "#6200ea", "&:hover": { backgroundColor: "#4b00b5" } }} // Purple and darker shade on hover
>
  {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze"}
</Button>


      {result && (
  <Card 
    className="result-card"
    style={{
      backgroundColor: result === "Real" ? "#2e7d32" : "#d32f2f", // Green for Real, Red for Fake
      color: "#ffffff", // White text for better contrast
    }}
  >
    <CardContent>
      <Typography variant="h6">Prediction: {result}</Typography>
    </CardContent>
  </Card>
)}

    </div>
  );
}

export default App;
