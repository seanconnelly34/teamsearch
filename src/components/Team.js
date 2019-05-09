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
      onKeyFilter: [],
      fullUsers: [],
      searchText: ""
    };
    this.filterList = this.filterList.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }
  //

  async componentDidMount() {
    const team = this.props.match.params.id;

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
          const members = team.data.members;
          const users = user.data;
          const membersInfo = users
            .filter(g => members.includes(g.id))
            .map(g => ({ id: g.id, name: g.name }));

          const fullUsers = await this.getUsers(members);

          this.setState({
            team: team.data,
            membersId: team.data.members,
            leader: team.data.lead,
            filteredUsers: membersInfo,
            fullUsers: fullUsers
          });
        })
      )

      .catch(err => {
        console.log(err);
      });
  }

  getUsers = async users => {
    let array = [];
    let f = {};
    for (const user of users) {
      f = await axios.get(
        "http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/user/" +
          user
      );
      array.push(f.data);
      console.log("f.data", f.data);
      console.log("array", array);
    }
    return array;
  };

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
    console.log("fullllllllllll", this.state.fullUsers);

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
                placeholder="Search"
                onChange={this.onSearchTextChange}
              />
            </fieldset>
          </form>

          {userList &&
            userList.map((member, index) => (
              <Card key={member.id} className="card">
                <CardContent>
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
