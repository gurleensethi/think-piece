import React, { Component } from "react";
import { firestore, auth } from "../firebase";

import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    posts: [],
    user: null
  };

  unsubscribe = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    // Fetching all posts just once.
    // const snapshot = await firestore.collection("posts").get();
    // const posts = snapshot.docs.map(collectIdsAndDocs);

    this.unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ user });
    });
  };

  componentWillMount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts
          user={user}
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
