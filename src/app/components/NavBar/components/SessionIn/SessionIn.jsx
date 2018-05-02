
import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav, NavItem, NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Icon } from 'react-fa';
import { actionsCreator as aCauth } from '../../../../actions/auth';
import { actionsCreator as aCsources } from '../../../../actions/sources';
import { connect } from 'react-redux';
import classnames from 'classnames';

const mapProps = (state) => ({
    sources: state.sources.data,
    selected: state.sources.selected
});

class SessionIn extends React.PureComponent {
    static defaultProps = {
        sources: []
    }
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleSelected = (item) => () => {
        const { dispatch } = this.props;
        dispatch(aCsources.selected(item));
    }
    handleArchivo = (e) => {
        e.preventDefault();
        const file = this.file;
        file.click();
    }
    handleFileChange = () => {
        const { dispatch } = this.props;
        const files = this.file.files;
        if (files.length === 0) return;
        const data = new FormData();
        data.append("file", files[0])
        dispatch(aCsources.upload(data));
    }
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(aCauth.logout())
            .then(() => {
                const { location } = window;
                window.localStorage.clear();
                if (location.href === "/") {
                    location.reload();
                    return;
                }
                location.href = "/";
            });
    }
    render() {
        const { sources, selected } = this.props;
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <NavbarBrand href="/">
                        &nbsp;&nbsp;
						<Icon name="home" />
                        &nbsp;&nbsp;
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="" onClick={this.handleArchivo}>Archivo</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Formato
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {sources.map((value, index) => (
                                        <DropdownItem
                                            className={classnames({ active: selected === value })}
                                            onClick={this.handleSelected(value)}
                                            value={value} key={index}>
                                            {value}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="" onClick={this.handleLogout}>
                                    Logout
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <input
                    type="file"
                    onChange={this.handleFileChange}
                    style={{ display: 'none' }}
                    ref={(el) => this.file = el} />
            </React.Fragment>
        );
    }
}

export default connect(mapProps)(SessionIn);
