import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../Styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="footer__social-media-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="footer__social-media-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="footer__social-media-icon" />
          </a>
        </div>
        <div className="footer__links">
          <a href="/">Termos de Uso</a>
          <a href="/">Política de Privacidade</a>
          <a href="/">FAQ</a>
          <a href="/">Contato</a>
        </div>
        <div className="footer__credits">
          <p>Financify &copy; 2023. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
