import React from "react";
import TournamentList from "./tournamentList";
import "./tournamentPage.css"
import ShowTeamProfile from "../PlayerList/showTeamProfile";

const tournamentPage = () => {
  return (
    <div className="tournamentPage-container">
    
        <ShowTeamProfile/>
        <TournamentList />
    </div>
  );
};

export default tournamentPage;
