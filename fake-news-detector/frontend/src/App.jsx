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
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/predict/`, { text: newsText });
      setResult(response.data.prediction);
    } catch (error) {
      setResult("Error analyzing news, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Typography variant="h4" className="title" style={{ marginBottom: "2rem" }}>
        Fake News Detector
      </Typography>

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

      <Button 
        variant="contained" 
        onClick={handleAnalyze} 
        disabled={loading}
        sx={{ backgroundColor: "#6200ea", "&:hover": { backgroundColor: "#4b00b5" } }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze"}
      </Button>

      {result && (
        <Card 
          className="result-card"
          style={{
            backgroundColor: result === "Real" ? "#2e7d32" : "#d32f2f",
            color: "#ffffff",
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
