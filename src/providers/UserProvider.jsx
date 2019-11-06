import React, { createContext } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext();

export default class UserProvider extends React.Component {
  state = {
    user: null
  };

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      console.log(user);
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}
