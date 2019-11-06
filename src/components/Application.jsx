import React, { Component } from "react";
import { auth, createUserProfileDocument } from "../firebase";

import Posts from "./Posts";
import Authentication from "./Authentication";

class Application extends Component {
  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication />
        <Posts onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
