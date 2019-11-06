import React, { createContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

export const PostContext = createContext();

class PostProvider extends React.Component {
  state = {
    posts: []
  };

  unsubscribe = null;

  componentDidMount = () => {
    this.unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  render() {
    const { posts } = this.state;
    const { children } = this.props;

    return (
      <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    );
  }
}

export default PostProvider;
