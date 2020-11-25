import React from "react"
// import axios from "axios";
// import Router from "./config/routes";
// import Navbar from "./components/nav/Navbar";
import "./App.css";
// import { withRouter } from 'react-router-dom';
import { Login } from '../components/auth/Login'
import { Logout } from '../components/auth/Logout'

const App = () => {
  // state = {
  //   currentUser: localStorage.getItem("uid")
  // };

  // setCurrentUser = userId => {
  //   this.setState({ currentUser: userId });
  //   localStorage.setItem('uid', userId);
  // };

  // logout = () => {
  //   axios
  //     .delete(`${process.env.REACT_APP_API_URL}/auth/logout`, {
  //       withCredentials: true
  //     })
  //     .then(res => {
  //       console.log(res);
  //       this.setState({currentUser: null});
  //       localStorage.removeItem('uid');
  //       this.props.history.push('/');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

    return (
      <>
        {/* <Navbar currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} logout={this.logout} /> */}
        {/* <Router
          currentUser={this.state.currentUser}
          setCurrentUser={this.setCurrentUser}
          logout={this.logout}
        /> */}
        <Login />
        <Logout />
      </>
    );
}

export default App;