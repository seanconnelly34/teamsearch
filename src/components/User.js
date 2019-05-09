import React, { Component } from "react";
import axios from "axios";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      username: "",
      teamLeadOf: "",
      teamMemberOf: [],
      isLeader: props.leader
    };
  }

  async componentDidMount() {
    const userId = this.props.id;

    const user = await axios.get("http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/user/" + userId)

    this.setState({
      id: user.data.id,
      name: user.data.name,
      username: user.data.username,
      teamLeadOf: user.data.lead_teams,
      teamMemberOf: user.data.member_teams
    });
  }

  render() {
    const isLeader = this.state.isLeader;

    return (
      <div>
        {this.state.id &&
        this.state.name &&
        this.state.username &&
        !isLeader ? (
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
