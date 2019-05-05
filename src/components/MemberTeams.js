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

        const leaderOfTeam = teams
          .filter(g => this.props.teamLead.includes(g.id))
          .map(g => g.name);

        this.setState({
          teams: res.data,
          filteredTeams: memberTeams,
          teamLeadOf: leaderOfTeam
        });
      });
  }

  render() {
    return (
      <>
        <p>
          <strong>Team Lead of: </strong>
          {this.props.teamLead[0] === 0 ? (
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
