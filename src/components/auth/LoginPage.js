import React from "react";
import OktaSignIn from "@okta/okta-signin-widget";

export default class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
    this.widget = new OktaSignIn({
      baseUrl: "https://decedo.okta.com",
      clientId: "0oa1cpd64lCoKhf9b5d6",
      redirectUri: "http://localhost:3000",
      authParams: {
        responseType: "id_token",
      },
    });
    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log("componentDid<Mount...");
    this.widget.session.get((response) => {
      if (response.status !== "INACTIVE") {
        this.setState({ user: response.login });
      } else {
        this.showLogin();
      }
    });
  }

  showLogin() {
    console.log("showLogin...");
    Backbone.history.stop();
    this.widget.renderEl(
      { el: this.loginContainer },
      (response) => {
        this.setState({ user: response.claims.email });
        this.widget.remove();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    console.log("logout...");
    this.widget.signOut(() => {
      this.setState({ user: null });
      this.showLogin();
    });
  }

  render() {
    console.log("rendering...");
    return (
      <div>
        {this.state.user ? (
          <div className="container">
            <div>Welcome, {this.state.user}!</div>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : null}
        {this.state.user ? null : (
          <div
            ref={(div) => {
              this.loginContainer = div;
            }}
          />
        )}
      </div>
    );
  }
}
