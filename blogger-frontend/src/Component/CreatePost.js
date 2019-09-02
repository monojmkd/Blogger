import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Logo from './../../src/template/index.ico'

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postBody: '',
      postTitleErr: '',
      postBodyErr: ''

    };
    axios.defaults.baseURL = "http://localhost:4000";

  }
  handleValidation = () => {
    let postTitleErr = "";
    let postBodyErr = "";

    if (this.state.postTitle.length === 0) {
      postTitleErr = "The post title is empty !"
    }
    if (this.state.postBody.length === 0) {
      postBodyErr = "The body is empty "
    }
    if (postTitleErr || postBodyErr) {
      this.setState({
        postTitleErr,
        postBodyErr
      })
      return false;
    }
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.handleValidation();


    let data = {
      postTitle: this.state.postTitle,
      postBody: this.state.postBody,
      user_id: this.props.userProps.userId
    }

    if (isValid) {
      axios.post("/createpost", data)
        .then(res => {

          window.location.replace("/")
        })
        .catch(function (error) {
          console.log("found errors", error)
        })
    
    }
  }

  handleChange = (e) => {

    switch (e.target.name) {
      case "postTitle":
        this.setState({
          postTitle: e.target.value
        })
        break;

      case "postBody":
        this.setState({
          postBody: e.target.value
        })
        break;
      default:
        break;
    }

  }

  render() {

    return (
      <Container className="App">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm="2"></Col>
            <Col sm="8" style={{ padding: 25, backgroundColor: "#fff", borderRadius: 5, border: "1px solid rgba(0,0,0,0.4)", boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.3)" }}>
              <Row>
                <Col sm="12">
                  <img src={Logo} alt="mylogo" style={{ height: "auto", width: 50 }} />
                  <h4 style={{ textAlign: "center", marginTop: 10 }}>Create Post</h4> <span style={{ color: "rgb(243, 83, 83)" }}></span>
                </Col>
                <Col>
                  <FormGroup style={{ margin: 7, textAlign: "left" }}>
                    <Label htmlFor="postTitle">Post Title</Label>
                    <Input
                      minLength={10}
                      type="text"
                      className=""
                      placeholder="Title"
                      name="postTitle"
                      value={this.state.postTitle}
                      onChange={this.handleChange}
                    />
                    <span style={{ color: "red" }}>{this.state.postTitleErr}</span>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup style={{ margin: 7, textAlign: "left" }}>
                    <Label htmlFor="">Say something...</Label>
                    <Input
                      type="textarea"
                      className=""
                      placeholder="Write post here"
                      name="postBody"
                      value={this.state.postBody}
                      onChange={this.handleChange}
                    />
                    <span style={{ color: "red" }}>{this.state.postBodyErr}</span>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup style={{ margin: 8 }}>
                    <Button type="submit">Submit</Button>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col sm="2"></Col>
          </Row>
        </Form>
      </Container >

    );
  }
}

export default CreatePost;
