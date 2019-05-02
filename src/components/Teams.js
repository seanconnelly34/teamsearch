import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Search from "./Search";

class Teams extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      teamNames: [],
      filteredTeamNames: []
    };
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `http://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/team/`
      )
      .then(res => {
        const teams = res.data;

        const teamnames = teams.map(function(obj) {
          return obj.name;
        });

        this.setState({
          teams: teams,
          teamNames: teamnames
        });
      });
  }

  filterList(event) {
    var updatedList = this.state.teamNames;
    console.log("updated list below");
    console.log(updatedList);
    updatedList = updatedList.filter(function(item) {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filteredTeamNames: updatedList });
  }

  render() {
    console.log("TEAMS items array");
    console.log(this.state.teams);
    console.log("TEAMNAME items array");
    console.log(this.state.teamNames);
    return (
      <div className="container">
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
        <div className="col-12">
          <h1>List of Teams</h1>
        </div>
        <div className="col-12">
          <ul>
            {this.state.teams &&
              this.state.teams.map(team => (
                <Link key={team.id} to={`/${team.id}`}>
                  <li key={team.id} className="list-group-item">
                    <p>{team.name}</p>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Teams;
