import React, { useState, useRef } from "react";
import axios from "axios";
import "./teamAddForm.css"

const TeamAddForm= ({ onTeamCreated }) => {
  const [formData, setFormData] = useState({
    teamName: "",
    igl: "",
    player2: "",
    player3: "",
    player4: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPEG, PNG, or WebP image");
      return;
    }
    
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB");
      return;
    }

    setLogoFile(file);
    setError("");
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      teamName: "",
      igl: "",
      player2: "",
      player3: "",
      player4: "",
    });
    setLogoFile(null);
    setLogoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate all fields
    const requiredFields = ["teamName", "igl", "player2", "player3", "player4"];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());

    if (emptyFields.length > 0) {
      setError(`Please fill in: ${emptyFields.join(", ")}`);
      return;
    }

    if (!logoFile) {
      setError("Please upload a team logo");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("logo", logoFile);

    setUploading(true);
    try {
      const res = await axios.post("http://localhost:5000/teams/submit", data, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000 // 10 second timeout
      });
      
      setSuccess(res.data.message || "Team registered successfully!");
      resetForm();
      onTeamCreated();
      
    } catch (err) {
      console.error("Submission error:", err);
      let errorMsg = "Failed to submit team. Please try again.";
      
      if (err.response) {
        errorMsg = err.response.data?.message || 
                  `Server responded with ${err.response.status}`;
      } else if (err.request) {
        errorMsg = "No response from server. Check your connection.";
      } else if (err.code === "ECONNABORTED") {
        errorMsg = "Request timed out. Please try again.";
      }
      
      setError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
     <h2 style={{color:"#ffc107"}}>Team Registration</h2>
     <div className="divider"></div>
    <div className="form-container">
      {error && (
        <div className="alert error-message">
          <span>⚠️</span> {error}
        </div>
      )}
      
      {success && (
        <div className="alert success-message">
          <span>✓</span> {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {["teamName", "igl", "player2", "player3", "player4"].map((field) => (
          <div className="form-group" key={field}>
            <label>
              {field === "teamName" ? "Team Name" : 
               field === "igl" ? "IGL (In-Game Leader)" : 
               `Player ${field.slice(-1)}`} *
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              maxLength={field === "teamName" ? 50 : 30}
              disabled={uploading}
            />
          </div>
        ))}

        <div className="form-group">
          <label>Team Logo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            disabled={uploading}
            ref={fileInputRef}
          />
          {logoPreview && (
            <div className="logo-preview">
              <img 
                src={logoPreview} 
                alt="Team logo preview" 
                onError={() => setLogoPreview("")}
              />
              <button 
                type="button" 
                onClick={() => {
                  setLogoFile(null);
                  setLogoPreview("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="remove-logo-btn"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="submit-btn"
        >
          {uploading ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            "Registere"
          )}
        </button>
      </form>
    </div>
    </>
  );
};

export default TeamAddForm;
