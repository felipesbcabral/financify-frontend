import React, { useState } from "react";
import "../Styles/dados.css";
import defaultAvatar from "../assets/default-avatar.jpg";

function AccountDataPage() {
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleAvatarClick = () => {
    document.getElementById("avatar-input").click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="account-data-container">
      <div className="account-data-card">
        <div className="account-data-header">
          <h1 className="account-data-title">Dados da conta</h1>
          <label htmlFor="avatar-input" className="account-data-avatar-label">
            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <img
              src={avatar}
              alt="User Avatar"
              className="account-data-avatar"
              onClick={handleAvatarClick}
            />
          </label>
        </div>
        <div className="account-data-body">
          <p className="account-data-info">
            <strong>Nome:</strong> João da Silva
          </p>
          <p className="account-data-info">
            <strong>E-mail:</strong> joao.silva@gmail.com
          </p>
          <p className="account-data-info">
            <strong>Telefone:</strong> (11) 99999-9999
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountDataPage;
