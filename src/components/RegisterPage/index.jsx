import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import Logo from "./../../assets/images/MyWalletLogo.svg";

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadingSvg = <ThreeDots width="50px" color="#fff" />;

  function confirmRegister(event) {
    const URL = "http://localhost:5000/sign-up";
    event.preventDefault();
    setLoading(true);
    axios
      .post(URL, newUser)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <Register>
      <img src={Logo} alt="My Wallet LOGO" />
      <form onSubmit={confirmRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={newUser.name}
          disabled={loading}
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          disabled={loading}
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={newUser.password}
          disabled={loading}
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Confirmar a senha"
          value={newUser.confirmPassword}
          disabled={loading}
          onChange={(e) => {
            setNewUser({ ...newUser, confirmPassword: e.target.value });
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? loadingSvg : "Cadastrar"}
        </button>
      </form>
      <Link to="/">
        <span>Já tem uma conta? Entre agora!</span>
      </Link>
    </Register>
  );
}

const Register = styled.main`
  width: 100%;
  height: 100vh;

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
    display: block;
    margin-bottom: 20px;
  }

  form {
    width: fit-content;
    width: 80%;
  }

  input,
  button {
    width: 100%;
    border-radius: 5px;
    margin: 5px 0;
    font-size: 20px;
  }

  input {
    color: #000;
    background-color: #fff;
    height: 58px;
    padding-left: 10px;
  }

  input::placeholder {
    color: #000;
  }

  button {
    color: #fff;
    background-color: #a328d6;
    margin-bottom: 30px;
    height: 46px;
    border: none;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:hover {
    background-color: #9725c9;
  }

  span {
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    text-decoration: underline;
  }
`;
