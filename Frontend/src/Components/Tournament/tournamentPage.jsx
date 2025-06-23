import React from "react";
import TournamentList from "./tournamentList";
import ShowTeamProfile from "../PlayerList/showTeamProfile";
import "./tournamentPage.css"
const tournamentPage = () => {
  return (
    <div className="tournamentPage-container">
        <ShowTeamProfile/>
        <TournamentList />
    </div>
  );
};
export default tournamentPage;
