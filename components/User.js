import React, { Component } from "react";
import axios from "axios";
import MemberTeams from "./MemberTeams";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      id: props.id,
      teamLeadOf: [],
      teamMemberOf: [],
      isLeader: props.leader
    };
  }

  componentDidMount() {
    const userId = this.props.id;

    this._asyncRequest = axios
      .get(
        "http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/user/" +
          userId
      )
      .then(res => {
        this.setState({
          name: res.data.name,
          username: res.data.username,
          teamLeadOf: res.data.lead_teams,
          teamMemberOf: res.data.member_teams
        });
      });
  }

  render() {
    const isLeader = this.state.isLeader;

    return (
      <div>
        {!isLeader ? (
          <div>
            <p>
              <strong>Username:</strong> {this.state.username}
            </p>
            <p>
              <strong>Name:</strong> {this.state.name}
            </p>

            <p>
              <strong>User id:</strong> {this.state.id}
            </p>

            {this.state.teamLeadOf.length ? (
              <MemberTeams
                teamId={this.state.teamMemberOf}
                teamLead={this.state.teamLeadOf}
              />
            ) : (
              <MemberTeams teamId={this.state.teamMemberOf} teamLead="0" />
            )}
          </div>
        ) : (
          <div>
            <strong>Team Lead:</strong> {this.state.name}
          </div>
        )}
      </div>
    );
  }
}

export default User;
