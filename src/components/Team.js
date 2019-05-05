import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import User from "./User";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
//
class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {},
      teamId: this.props.match.params.id,
      members: [],
      leader: "",
      users: [],
      filteredUsers: []
    };
    this.filterList = this.filterList.bind(this);
  }
  //

  componentDidMount() {
    const team = this.props.match.params.id;
    axios
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
        axios.spread((team, user) => {
          //filter all users in an array
          const listAllUsers = user.data.map(function(obj) {
            return obj.name;
          });

          this.setState({
            team: team.data,
            members: team.data.members,
            leader: team.data.lead,
            users: listAllUsers
          });
          console.log(this.state.users);
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  filterList(event) {
    var updatedList = this.state.users;
    let filtered = updatedList.filter((item, index) => {
      return console.log("++++++"), console.log(item), console.log("--------");
    });

    this.setState({ filteredUsers: filtered });
  }

  render() {
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
                <strong>Number of Members:</strong> {this.state.members.length}
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
                onChange={this.filterList}
              />
            </fieldset>
          </form>

          {this.state.members.map((member, index) => (
            <Card key={index} className="card">
              <CardContent>
                <User id={member} leader={false} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Team;
