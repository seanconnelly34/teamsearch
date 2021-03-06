import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Teams extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      teamNames: [],
      filteredTeam: []
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
    var updatedList = this.state.teams;
    let filtered = updatedList.filter(item => {
      return (
        item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0
      );
    });

    this.setState({ filteredTeam: filtered });
  }

  render() {
    return (
      <div className="container">
        <h1>List of Teams</h1>
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
        <ul className="teams-list">
          {this.state.teams && this.state.filteredTeam.length
            ? this.state.filteredTeam.map(team => (
                <Link key={team.id} to={`/${team.id}`}>
                  <li key={team.id} className="list-group-item">
                    <p>{team.name}</p>
                  </li>
                </Link>
              ))
            : this.state.teams.map(team => (
                <Link key={team.id} to={`/${team.id}`}>
                  <li key={team.id} className="list-group-item">
                    <p>{team.name}</p>
                  </li>
                </Link>
              ))}
        </ul>
      </div>
    );
  }
}

export default Teams;
