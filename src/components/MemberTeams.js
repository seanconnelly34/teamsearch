import React, { Component } from "react";
import axios from "axios";

class MemberTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      memberOfIds: this.props.teamId,
      filteredTeams: [],
      teamLeadOf: ""
    };
    this.teamLeadFilter = this.teamLeadFilter.bind(this);
  }

  componentDidMount() {
    console.log(this.props.teamId);
    this._asyncRequest = axios
      .get(
        "http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/team/"
      )
      .then(res => {
        const teams = res.data;

        //filter member of teams, compare team id's of member Teams
        //with full list of teams
        const memberTeams = teams
          .filter(g => this.props.teamId.includes(g.id))
          .map(g => g.name);

        //filter team lead id's with id's of full array of teams
        const leadOf = this.teamLeadFilter("3");

        this.setState({
          teams: res.data,
          filteredTeams: memberTeams,
          teamLeadOf: leadOf
        });
      });
  }

  teamLeadFilter(arg) {
    console.log("fucka", arg);
    const leaderOfTeam = arg;
    if (leaderOfTeam > 0) {
      leaderOfTeam
        .filter(g => this.props.teamLead.includes(g.id))
        .map(g => g.ame);
      return leaderOfTeam;
    }
    return "0";
  }

  render() {
    return (
      <>
        <p>
          <strong>Team Lead of: </strong>
          {this.state.teamLeadOf === "0" ? (
            <span>Not a team lead.</span>
          ) : (
            this.state.teamLeadOf
          )}
        </p>

        <p>
          <strong>Member of team(s): </strong>
        </p>
        <ul>
          {this.state.filteredTeams &&
            this.state.filteredTeams.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
        </ul>
      </>
    );
  }
}

export default MemberTeams;
