import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

export function getLoginView() {
  return <Login />;
}

@inject("store") @observer
export class Login extends React.Component {
  @observable username = "";
  @observable password = "";
  @observable message = "Login with '1234' and '1234'"

  render() {
    return (
      <div>
        <h1>Please login</h1>
        <h2>{this.message}</h2>
        <br/>Username
        <br/><input value={this.username} onChange={this.onChangeUsername} />
        <br/>Password
        <br/><input value={this.password} onChange={this.onChangePassword} />
        <br/><button onClick={this.onLogin}>Login</button>
      </div>
    );
  }

  @action onChangeUsername = (e) => {
    this.username = e.target.value;
  }

  @action onChangePassword = (e) => {
    this.password = e.target.value;
  }

  @action onLogin = () => {
    this.message = "Verifying credentials..."
    this.props.store.performLogin(
      this.username,
      this.password,
      (authenticated) => {
        if (authenticated) {
          this.message = "Login accepted"
          this.props.store.showOverview();
        } else {
          this.message = "Login failed"
        }
      }
    )
  }
}
