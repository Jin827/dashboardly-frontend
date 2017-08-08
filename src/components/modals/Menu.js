import React, { Component } from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import './Menu.css';
import { API_HOST } from '../../config'



class Menu extends Component {
  constructor() {
    super()
    this.state= {
      image: "YAP"
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
      var url= `${API_HOST}/auth/me`
      fetch(url)
      .then(response=> response.json())
      .then(data =>{
          this.setState({
            image: data.avatarUrl
          })
        })
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)

  }
  
  handleClickOutside = () => {
    this.props.closeMenu();
  }

  render() {
    
    let { closeMenu, show } = this.props
    const isLoggedIn = auth.isLoggedIn()
    return (
      <div className={`menu ${show?"show":""}`}>

        <div className="menu__header">
          <img src={this.state.image} alt="profile-pic" className="menu__avatar"/>
        </div>

        <div className="menu__list">

          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>

          {!isLoggedIn ?
            <Link to="/login" className="menu__item" onClick={closeMenu}>
              Login
            </Link>
          : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={closeMenu}>
              Signup
            </Link>
          : null}

          {isLoggedIn ?
            <Link to="/logout" className="menu__item" onClick={closeMenu}>
              Logout
            </Link>
          : null}
        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);