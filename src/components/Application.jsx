import React, { Component } from "react";
import { firestore } from "../firebase";

import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

class Application extends Component {
  state = {
    posts: []
  };

  unsubscribe = null;

  componentDidMount = async () => {
    // Fetching all posts just once.
    // const snapshot = await firestore.collection("posts").get();
    // const posts = snapshot.docs.map(collectIdsAndDocs);

    this.unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillMount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
