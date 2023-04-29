import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

const sidebarNavItems = [
  { display: 'Home', icon: <i className='bx bx-home'></i>, to: '/', section: '' },
  { display: 'Adicionar', icon: <i className='bx bx-star'></i>, to: '/new', section: 'new' },
  { display: 'Calendar', icon: <i className='bx bx-calendar'></i>, to: '/calendar', section: 'calendar' },
  { display: 'User', icon: <i className='bx bx-user'></i>, to: '/user', section: 'user' },
  { display: 'Orders', icon: <i className='bx bx-receipt'></i>, to: '/order', section: 'order' },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNavItems.findIndex((item) => item.section === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'active' : ''} ${isMenuHidden ? 'hidden' : ''}`}>
      <button className="sidebar__toggle" onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? <i className="bx bx-chevron-left"></i> : <i className="bx bx-menu"></i>}
      </button>
      <button className="sidebar__hide" onClick={toggleMenu}>
        {isMenuHidden ? <i className="bx bx-right-arrow-alt"></i> : <i className="bx bx-left-arrow-alt"></i>}
      </button>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`,
          }}
        ></div>
        <div className={`sidebar__menu__list ${showSidebar ? 'active' : ''}`}>
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index} className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
