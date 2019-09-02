import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    Button
} from 'reactstrap';

class Navibar extends React.Component {

    handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        window.location.replace("/");
    }

    render() {
        return (
            <div>
                <Navbar style={{ padding: 10 }} color="light" light expand="md">
                    <NavbarBrand href="/">Blogger</NavbarBrand>
                    <Nav className="ml-auto" navbar >
                        <li style={{ padding: 10 }}>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li style={{ padding: 10 }}>
                            <NavLink to="/createpost">Create Post</NavLink>
                        </li>
                        <li style={{ padding: 10 }}>
                            <NavLink to="/mypost">My Posts</NavLink>
                        </li>
                        <li style={{ padding: 5 }}>
                            <Button color="info" onClick={this.handleLogout}>Logout</Button>
                        </li>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
export default withRouter(Navibar);
