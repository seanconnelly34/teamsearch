import React, { Component } from "react";

class List extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.items.map(function(item) {
          return (
            <li className="list-group-item" data-category={item} key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default List;
