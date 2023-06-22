import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Navbar.scss";
import {
  FaBars,
  FaSignOutAlt,
  FaHome,
  FaPlus,
  FaCog,
  FaMoneyBill,
} from "react-icons/fa";

const Sidebar = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  const navigate = useNavigate();

  function handleClick(event) {
    props.onLogout(event);
    navigate("/login");
  }
  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
  };

  const handleItemClick = () => {
    setShowSidebar(false);
  };

  const sidebarNavItems = [
    {
      display: "Home",
      icon: <FaHome />,
      to: "/home",
      section: "",
    },
    {
      display: "Adicionar",
      icon: <FaPlus />,
      to: "/new",
      section: "new",
    },
    {
      display: "Configuração",
      icon: <FaCog />,
      to: "/config",
      section: "user",
    },
    {
      display: "Depositar",
      icon: <FaMoneyBill />,
      to: "/deposit",
      section: "deposit",
    },
  ];

  return (
    <div
      className={`sidebar ${showSidebar ? "active" : ""} ${
        isMenuHidden ? "hidden" : ""
      }`}
    >
      <button className="sidebar__toggle visible" onClick={toggleSidebar}>
        <FaBars />
        {showSidebar ? (
          <i className="bx bx-chevron-left"></i>
        ) : (
          <i className="bx bx-menu"></i>
        )}
      </button>

      <button className="sidebar__hide" onClick={toggleMenu}>
        {isMenuHidden ? (
          <i className="bx bx-right-arrow-alt"></i>
        ) : (
          <i className="bx bx-left-arrow-alt"></i>
        )}
      </button>
      <div
        ref={sidebarRef}
        className={`sidebar__menu ${showSidebar ? "active-navbar" : ""}`}
      >
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        <div className={`sidebar__menu__list ${showSidebar ? "active" : ""}`}>
          {sidebarNavItems.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={handleItemClick}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </Link>
          ))}
          <button className="sidebar__menu__item" onClick={handleClick}>
            <div className="sidebar__menu__item__icon">
              <FaSignOutAlt />
            </div>
            <div className="sidebar__menu__item__text">Sair</div>
          </button>
        </div>
      </div>

      {showSidebar && (
        <button className="sidebar__toggle" onClick={toggleSidebar}>
          <i className="bx bx-chevron-left"></i>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
