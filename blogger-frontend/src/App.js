import React from 'react';
import './../src/App.css'
import Login from './Login'
import Routes from './Routes/Routes';
import { Container } from 'reactstrap';

class App extends React.Component {

  state = {
    isLoggedIn: false,
    userId: null
  }
  componentDidMount = () => {
    var userId = localStorage.getItem("userId");
    var userName = localStorage.getItem("userName");
    if (userId === null || userName === null) {
      this.setState({
        isLoggedIn: false
      })
    } else {
      this.setState({
        isLoggedIn: true,
        userId: userId,
        userName: userName,
        
      })
    }
  }
  setLogin = (userId, userName, category) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    this.setState({
      isLoggedIn: true,
      userId: userId,
      userName: userName,
      category: category
    })
  }
  render() {
    return (
      <Container>
        <div>
          {
            this.state.isLoggedIn ? (
              <Routes userProps={this.state} />
            ) : (
                <Login setLogin={this.setLogin} />
              )
          }
        </div>
      </Container>
    );
  }
}
export default App;
