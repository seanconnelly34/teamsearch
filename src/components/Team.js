import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import User from "./User";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {},
      teamId: this.props.match.params.id,
      leader: "",
      membersId: [],
      filteredUsers: [],
      searchText: ""
    };
    this.filterList = this.filterList.bind(this);
  }
  //

  async componentDidMount() {
    //team id
    const team = this.props.match.params.id;

    //get team from team id passed into get get request
    //get full list of all users not related to team
    await axios
      .all([
        axios.get(
          "http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/team/" +
            team
        ),
        axios.get(
          "http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/user/"
        )
      ])
      .then(
        axios.spread(async (team, user) => {
          //id's of member belonging to team
          const members = team.data.members;
          //all members, name and their id's
          const users = user.data;
          //get member name and id from users data\
          //used to compare search term with list of names of members
          const membersInfo = users
            .filter(g => members.includes(g.id))
            .map(g => ({ id: g.id, name: g.name }));
          console.log("member ids", members);
          console.log("members infooooooooooooooooo", membersInfo);

          this.setState({
            team: team.data,
            membersId: team.data.members,
            leader: team.data.lead,
            filteredUsers: membersInfo
          });
        })
      )

      .catch(err => {
        console.log(err);
      });
  }

  //set search term to state, on input change
  onSearchTextChange = event => {
    this.setState({ searchText: event.target.value.toLowerCase() });
  };

  filterList(searchTerm) {
    const { filteredUsers } = this.state;

    if (!searchTerm || !searchTerm.length) {
      return filteredUsers;
    }
    return filteredUsers.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm) >= 0;
    });
  }

  render() {
    const { searchText, filteredUsers } = this.state;
    const userList =
      filteredUsers && filteredUsers.length ? this.filterList(searchText) : [];

    return (
      <div className="container">
        <div className="col-12">
          <Link to="/">
            <p className="back-button">Back</p>
          </Link>
          <Card className="card">
            <CardContent>
              <h1>
                {this.state.team.name} <span>Team</span>
              </h1>
              {this.state.leader && (
                <User id={this.state.leader} leader={true} />
              )}

              <p>
                <strong>Number of Members:</strong>{" "}
                {this.state.membersId.length}
              </p>
            </CardContent>
          </Card>
          <h2>Members</h2>
          <form>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by first or last name"
                onChange={this.onSearchTextChange}
              />
            </fieldset>
          </form>

          <Card className="header-card">
            <CardContent className="header-content">
              <table>
                <tr>
                  <td>
                    <p>
                      <strong>id</strong>
                    </p>
                  </td>
                  <td>
                    <p>
                      <strong>Full Name</strong>
                    </p>
                  </td>
                  <td>
                    <p>
                      <strong>Username</strong>
                    </p>
                  </td>
                  <td>
                    <p>
                      <strong>Member of</strong>
                    </p>
                  </td>
                  <td>
                    <p>
                      <strong>Team Leader</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </CardContent>
          </Card>

          {userList &&
            userList.map((member, index) => (
              <Card key={member.id} className="header-card">
                <CardContent className="header-content">
                  <User id={member.id} leader={false} />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }
}

export default Team;
