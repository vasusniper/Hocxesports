import TeamAddForm from "./TeamAddForm";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTeamProfile.css";

const ShowTeamProfile = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/teams/data`,
        {
          withCredentials: true,
        }
      );
      setTeams(response.data);
    } catch (err) {
      setError("Failed to fetch teams. Please try again later.");
      console.error("Error fetching teams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="team-list-container">
      <TeamAddForm onTeamCreated={fetchTeams} />

      <h2 style={{ color: "#ffc107" }}>Registered Teams</h2>
      <div className="divider"></div>

      {teams.length === 0 ? (
        <p className="no-teams">No teams registered yet.</p>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <div key={team._id} className="team-card">
              <div className="team-header">
                {team.logoUrl && (
                  <img
                    src={team.logoUrl}
                    alt={`${team.teamName} logo`}
                    className="team-logo"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100?text=No+Logo";
                    }}
                  />
                )}
                <h3 className="team-name">{team.teamName}</h3>
              </div>

              <div className="team-players">
                <div className="player">
                  <span className="player-label">IGL:</span>
                  <span className="player-name">{team.igl}</span>
                </div>
                <div className="player">
                  <span className="player-label">Player 2:</span>
                  <span className="player-name">{team.player2}</span>
                </div>
                <div className="player">
                  <span className="player-label">Player 3:</span>
                  <span className="player-name">{team.player3}</span>
                </div>
                <div className="player">
                  <span className="player-label">Player 4:</span>
                  <span className="player-name">{team.player4}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ShowTeamProfile;
