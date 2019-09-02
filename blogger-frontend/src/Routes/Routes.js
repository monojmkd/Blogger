import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Navbar from '../Component/elements/Navbar';
import MyPost from '../Component/Mypost';
import CreatePost from './../Component/CreatePost';
import Home from './../Component/Home';

const Routes = (props) => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" render={() => <Home {...props} />} />
      <Route exact path="/mypost" render={() => <MyPost {...props} />} />
      <Route path="/createpost" render={() => <CreatePost {...props} />} />
    </Switch>
  </BrowserRouter>
)
export default Routes;