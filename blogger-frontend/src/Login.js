import React, { Component } from "react";
import axios from "axios";
import Signup from './Component/SignUp';
import { Container, Row, Col, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import Logo from './../src/template/index.ico'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg: "",
      showSignup: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    axios.defaults.baseURL = "http://localhost:4000";
  }
  toggleShow() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/login", data)
      .then(res => {
        if (res.data.success && res.data.user_id) {
          this.props.setLogin(res.data.user_id, res.data.first_name, res.data.category);
        } else {
          this.setState({
            errorMsg: "Incorrect username/password !"
          }, () => {

            setTimeout(() => {
              this.setState({
                errorMsg: ''
              })
            }, 5000)
          });
        }
      })
      .catch(error => {
        this.setState({
          errorMsg: "API Error!"
        });
      });
  };

  handleChange = e => {
    switch (e.target.name) {
      case "email":
        this.setState({
          email: e.target.value
        });
        break;
      case "password":
        this.setState({
          password: e.target.value
        });
        break;
      default:
        break;
    }
  };

  handleSignup = e => {
    this.setState({
      ...this.state,
      showSignup: true
    })
  }
  render() {

    if (this.state.showSignup) {
      return (
        <Signup />
      )
    }
    else {
      return (
        <Container className="App">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col sm="4"></Col>
              <Col sm="4" style={{ padding: 25, backgroundColor: "#fff", borderRadius: 5, border: "1px solid rgba(0,0,0,0.4)", boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.3)" }}>
                <Row>
                  <Col sm="12">
                    <img src={Logo} alt="mylogo" style={{ height: "auto", width: 50 }} />
                    <h4 style={{ textAlign: "center", marginTop: 10, fontWeight: 510 }}> Sign in </h4> <span style={{ color: "red" }}> {this.state.errorMsg} </span>
                  </Col>
                  <Col sm="12">
                    <FormGroup style={{ marginTop: 10 }}>
                      <Input style={{ height: 55, fontSize: "18px" }}
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup style={{ marginTop: 10, border: "1px solid #ced4da", borderRadius: 5 }}>
                      <InputGroup>
                        <Input style={{ height: 55, fontSize: "18px", border: "none"}}
                          type="password"
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                        <InputGroupAddon  style={{margin:15}}addonType="append">
                          <RemoveRedEye style={{opacity: 0.6, outlineStyle:""}} onClick={this.toggleShow} />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm="12" style={{ margin: 20 }}>
                    <Row>
                      <Col sm="4">
                        <Button onClick={this.handleSignup} color="link"> Sign Up </Button>
                      </Col>
                      <Col sm="3"></Col>
                      <Col sm="4">
                        <FormGroup >
                          <Button color="success" type="submit"> Login </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col sm="4"></Col>
            </Row>
          </Form>
        </Container >
      )
    }
  }
}
export default Login;
