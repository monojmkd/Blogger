import React, { Component } from 'react';
import profileHome from './../../src/template/profilehome.png'
import axios from 'axios';
import {
  Card, CardHeader, CardFooter, CardBody, Container,
  CardTitle, CardText, Row, Col, Media
} from 'reactstrap';

class Home extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    axios.get("http://localhost:4000/posts")
      .then(res => {
        console.log(res);
        this.setState({
          posts: res.data.slice(0, 20)
        });
      })
  }
  render() {
    const { posts } = this.state;
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <Row key={post.post_id}>
            <Col style={{ margin: 9 }}>
              {/* <div key={post.post_id}> */}
              <Card style={{ textAlign: "justify", boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.3)", borderRadius: 0 }}>
                <CardHeader style={{ textAlign: "left" }}>
                  <Row>
                    <Col sm="1" style={{ paddingRight: 0 }}>
                      <Media left>
                        <Media style={{ width: "90%", height: 'auto', marginTop: 10 }} src={profileHome} alt="profile image" />
                      </Media>
                    </Col>
                    <Col sm="10" >
                      <h5 style={{ fontSize: 30, fontStyle: "italic", textAlign: 'left', padding: 0 }}>{post.first_name}</h5>
                      <Col>
                        <h7 style={{ fontSize: 18, textAlign: 'left', paddingBottom: 100 }}>{post.category}</h7>
                      </Col>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "white" }}>
                  <CardTitle style={{ textDecoration: "underline", fontWeight: 600, fontSize: 20 }}>{post.post_title} </CardTitle>
                  <CardText>{post.post_body}</CardText>
                </CardBody>
                <CardFooter style={{ textAlign: "right", fontSize: 13 }}>Posted on : {post.posted_on.slice(0, 16)}</CardFooter>
              </Card>
            </Col>

          </Row>
        )
      })
    ) : (
        <Row>
          <Col>
            <div className="center">No posts to show</div>
          </Col>
        </Row>
      );

    return (
      <Container>
        <Row>
          <Col sm="2"></Col>
          <Col sm="8">
            <h4 style={{ textAlign: "center", paddingTop: 40, paddingBottom: 30, fontFamily: "sans-serif" }}>Welcome {this.props.userProps.userName}</h4>
            {postList}
          </Col>
          <Col sm="2"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
