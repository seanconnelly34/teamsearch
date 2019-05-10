import React, { Component } from "react";
import axios from "axios";

class MemberTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      memberOfIds: this.props.teamId,
      filteredTeams: []
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

        this.setState({
          teams: res.data,
          filteredTeams: memberTeams
        });
      });
  }

  render() {
    return (
      <>
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
