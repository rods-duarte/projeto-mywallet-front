import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

import Logo from "../../assets/images/MyWalletLogo.svg";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const loadingSvg = <ThreeDots width="50px" color="#fff" />;

  function confirmLogin(event) {
    const URL = "http://localhost:5000/sign-in";
    event.preventDefault();
    setLoading(true);
    axios
      .post(URL, credentials)
      .then((response) => {
        const { data } = response;
        setUser({ ...data });
        navigate("/records");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <Login>
      <img src={Logo} alt="My Wallet LOGO" />
      <form onSubmit={confirmLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={credentials.email}
          disabled={loading}
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={credentials.password}
          disabled={loading}
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? loadingSvg : "Entrar"}
        </button>
      </form>
      <Link to="/register">
        <span>Primeira vez? Cadastre-se!</span>
      </Link>
    </Login>
  );
}

const Login = styled.main`
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
