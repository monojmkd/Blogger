import React, { Component, Fragment } from 'react';
import profile from './../../src/template/index.png'
import axios from 'axios';
import {
  Card, Button, CardFooter, CardBody, Container,
  CardText, Row, Col, CardHeader, Media, Input
} from 'reactstrap';

class MyPosts extends Component {
  state = {
    posts: [],
    editOn: false,
    selectedPostId: "",
    selectedPostTitle: "",
    selectedPostBody: "",
  }

  fetchPosts() {
    const id = this.props.userProps.userId;
    axios.get("http://localhost:4000/posts?user_id=" + id)
      .then(res => {
        // console.log(res);
        this.setState({
          posts: res.data.slice(0, 10)
        });
      })
  }

  componentDidMount() {
    this.fetchPosts();

  }

  handleChange = (e) => {
    switch (e.target.name) {
      case "postTitle":
        this.setState({
          selectedPostTitle: e.target.value
        })
        break;
      case "postBody":
        this.setState({
          selectedPostBody: e.target.value
        })
        break;
      default:
        break;
    }

  }

  handleEdit = (post) => {
    console.log("Post selected", post);
    this.setState({
      editOn: true,
      selectedPostId: post.post_id,
      selectedPostTitle: post.post_title,
      selectedPostBody: post.post_body
    })
  }

  handleDelete = (post) => {
    axios.delete("http://localhost:4000/posts?post_id=" + post.post_id)
      .then(res => {
        this.fetchPosts();
        console.log(res);
      })
      .catch(err => {
        console.log("Err", err)
      })
  }

  handleSubmit = (post) => {
    let data = {
      postTitle: this.state.selectedPostTitle,
      postBody: this.state.selectedPostBody
    }
    axios.put("http://localhost:4000/posts?post_id=" + post.post_id, data)
      .then(res => {
        this.setState({
          editOn: false,
          selectedPostId: null
        })
        this.fetchPosts();
      })
      .catch(err => {
        console.log("Err", err)
      })
  }

  render() {
    const { posts } = this.state;
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <Row key={post.post_id}>
            <Col style={{ margin: 7 }}>
              <Card style={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.3)", borderRadius: 0 }}>
                <CardHeader>
                  <Row>
                    <Col sm="2" style={{ paddingRight: 0 }}>
                      <Media left>
                        <Media style={{ width: "75%", height: 'auto' }} src={profile} alt="profile image" />
                      </Media>
                    </Col>
                    <Col sm="10" style={{ textAlign: 'left', padding: "15px 0" }}>
                      {
                        this.state.editOn && this.state.selectedPostId === post.post_id ? (
                          <Fragment>
                            <Input
                              type="text"
                              name="postTitle"
                              value={this.state.selectedPostTitle}
                              onChange={this.handleChange}
                            />
                          </Fragment>
                        ) : (
                            <Fragment>
                              <h5>{post.post_title}</h5>
                            </Fragment>
                          )
                      }
                      <h6>user : {this.props.userProps.userName}</h6>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "white", borderTop: "1px solid lightgrey" }}>
                  {
                    this.state.editOn && this.state.selectedPostId === post.post_id ? (
                      <Fragment>
                        <Input
                          type="textarea"
                          name="postBody"
                          value={this.state.selectedPostBody}
                          onChange={this.handleChange}
                        />
                      </Fragment>
                    ) : (
                        <CardText>{post.post_body}</CardText>
                      )
                  }
                </CardBody>
                <CardFooter style={{ textAlign: "right", fontSize: 12 }}>Posted on : {post.posted_on.slice(0, 16)}
                  <Row>
                    <Col sm="3">
                      {
                        this.state.editOn && this.state.selectedPostId === post.post_id ? (
                          <Button color="success" onClick={() => this.handleSubmit(post)}>Submit</Button>
                        ) : (
                            <Button color="link" onClick={() => this.handleEdit(post)}>Edit</Button>)
                      }
                    </Col>
                    <Col sm="6"></Col>
                    <Col sm="3">
                      <Button color="link" onClick={() => this.handleDelete(post)}>Delete</Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col >
          </Row>
        )
      })
    ) : (
        <Row>
          <Col></Col>
          <Col style={{ margin: 100 }}>
            <span style={{ textAlign: "center" }}>No posts to show</span>
          </Col>
          <Col></Col>
        </Row>
      );

    return (
      <Container>
        <Row style={{ marginTop: 20 }}>
          <Col sm="2"></Col>
          <Col sm="8">
            {postList}
          </Col>
          <Col sm="2">
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyPosts;
