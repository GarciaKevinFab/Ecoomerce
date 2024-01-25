import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

import "./navbar.css";
import { AuthContext } from "./../../context/AuthContext";

const nav__links = [
  {
    path: "/home",
    display: "Inicio",
  },
  {
    path: "/product",
    display: "Productos",
  },
];

const Navbar = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.products);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <nav
            className="wrapper d-flex 
            align-items-center justify-content-between"
          >
            {/* ---------- logo ----------- */}
            <div className="logo">
              <h1>TechMart.</h1>
            </div>
            {/* ---------- logo end ----------- */}

            {/* ---------- menu start ----------- */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}{" "}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ---------- menu end ----------- */}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btn d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Cerrar Session
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Acceder</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Registrar</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Ícono del carrito */}

              <Link to="/cart">
                <Badge badgeContent={totalQuantity} color="primary" overlap="rectangular">
                  <ShoppingCartOutlined />
                </Badge>
              </Link>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </nav>
        </Row>
      </Container>
    </header>
  );
};

export default Navbar;
