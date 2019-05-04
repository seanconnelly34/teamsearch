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
      leader: ""
    };
  }
  //

  componentDidMount() {
    const team = this.props.match.params.id;
    axios
      .get(
        "http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/team/" +
          team
      )
      .then(res => {
        this.setState({
          team: res.data,
          members: res.data.members,
          leader: res.data.lead
        });
      })
      .catch(err => {
        console.log(err);
      });

    //console logs an undefined becuase its logging before it happens becuase
    //its asynchronus
    // console.log(this.state.team.name);
    console.log("TEAM COMPONENT TEAM ID");
    console.log(this.state.teamId);
  }

  render() {
    return (
      <div className="container">
        <div class="col-12">
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

          {this.state.members.map((member, index) => (
            <Card className="card">
              <CardContent>
                <User key={index} id={member} leader={false} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Team;
