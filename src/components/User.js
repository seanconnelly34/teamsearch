import React, { Component } from "react";
import axios from "axios";
import MemberTeams from "./MemberTeams";

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
    //decalre user id
    const userId = this.props.id;
    //get full info on user by appending user id to axios request url
    const user = await axios.get(
      "http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/user/" +
        userId
    );

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
        {!isLeader ? (
          this.state.id &&
          this.state.name &&
          this.state.username && (
            <table>
              <tr>
                <td>
                  <p>{this.state.id}</p>
                </td>

                <td>
                  <p>{this.state.name}</p>
                </td>

                <td>
                  <p>{this.state.username}</p>
                </td>

                <td>
                  <MemberTeams teamId={this.state.teamMemberOf} />
                </td>

                <td>
                  {!this.state.teamLeadOf.length ? (
                    <p>No</p>
                  ) : (
                    <p>{this.state.teamLeadOf}</p>
                  )}
                </td>
              </tr>
            </table>
          )
        ) : (
          <p>
            <strong>Team Lead: </strong>
            {this.state.name}
          </p>
        )}
      </div>
    );
  }
}

export default User;
