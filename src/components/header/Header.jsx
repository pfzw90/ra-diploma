import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import Search from '../search/Search.jsx';

const links = [
  { title: 'Главная', alias: '/' },
  { title: 'Каталог', alias: '/catalog' },
  { title: 'О магазине', alias: '/about' },
  { title: 'Контакты', alias: '/contacts' },
];

function Header({ location }) {
  return (
    <React.Fragment>
    <header className="container">
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        <img src="/header-logo.png" alt="Bosa Noga"/>
                    </a>

                    <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                        {links.map((link) => (
                            <li key={nanoid()} className={`nav-item${location.pathname === link.alias ? ' active' : ''}`}>
                                <Link className="nav-link" to={link.alias}>{link.title}</Link>
                            </li>
                        ))}
                        </ul>
                        <div>
                            <div className="header-controls-pics">
                                <Search header prefix="header-controls"/>
                                <div className="header-controls-pic header-controls-cart">
                                    <div className="header-controls-cart-full">1</div>
                                    <div className="header-controls-cart-menu"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    </header>
</React.Fragment>
  );
}

export default withRouter(Header);
