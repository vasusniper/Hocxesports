import React from "react";
import TournamentList from "./tournamentList";
import ShowTeamProfile from "../PlayerList/ShowTeamProfile";
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
