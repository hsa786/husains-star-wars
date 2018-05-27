import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  // TItle
  const title = (
    <strong className="navbar-brand text-uppercase">Star Wars</strong>
  )

  // Welcome
  const welcome = user ? (
    <span className="btn btn-primary active user-indicator">Hi <strong>{user.name}!</strong></span>
  ) : null;

  // Links
  // Usually these would come from an API
  // Hard coding for the demo
  const links = [
    {
      path: '/',
      label: 'Login'
    },
    {
      path: '/search',
      label: 'Search'
    }
  ]

  // Render Links
  const renderLinks = () => {
    const arr = [];

    links.map((link, i) => {
      const item = (
        <li className="nav-item" key={i}>
          <Link to={link.path} className="nav-link">{link.label}</Link>
        </li>
      );

      if (!user) arr.push(item);
      if (user && link.path !== '/') arr.push(item);
    })

    return arr;
  }

  // Nav
  const nav = (
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        {/* Render Links */}
        {renderLinks()}
      </ul>
    </div>
  )

  return (
    <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-primary">
      {/* Title */}
      {title}

      {/* Welcome */}
      {welcome}

      {/* Nav */}
      {nav}
    </nav>
  )
}

export default Header;