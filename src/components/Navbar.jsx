import React from "react";
import { FaHome, FaPlus, FaCog, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.scss";
import logo from "../assets/financify-logo.jpg";

const navbarItems = [
  {
    display: "Home",
    icon: <FaHome className="navbar__icon" />,
    to: "/home",
    section: "",
  },
  {
    display: "Adicionar",
    icon: <FaPlus className="navbar__icon" />,
    to: "/new",
    section: "new",
  },
  {
    display: "Configuração",
    icon: <FaCog className="navbar__icon" />,
    to: "/config",
    section: "user",
  },
  {
    display: "Depositar",
    icon: <FaMoneyBill className="navbar__icon" />,
    to: "/deposit",
    section: "deposit",
  },
  {
    display: "Sair",
    icon: <FaSignOutAlt className="navbar__icon" />,
    to: "/login",
    section: "login",
  },
];

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    props.onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar__logo">
        <img src={logo} alt="Financify Logo" />
      </Link>
      <Link to="/home" className="navbar__title">FINANCIFY</Link>
      <ul>
        {navbarItems.map((item, index) => (
          <li key={index}>
            {item.section === "login" ? (
              <a href={item.to} onClick={handleLogout}>
                {item.icon} {item.display}
              </a>
            ) : (
              <Link to={item.to}>
                {item.icon} {item.display}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
