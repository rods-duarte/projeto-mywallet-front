import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import Logo from "./../../assets/images/MyWalletLogo.svg";

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [badInput, setBadInput] = useState({});
  const navigate = useNavigate();
  const loadingSvg = <ThreeDots width="50px" color="#fff" />;

  function confirmRegister(event) {
    const URL = "https://back-projeto-my-wallet.herokuapp.com/sign-up";
    event.preventDefault();
    setLoading(true);
    axios
      .post(URL, newUser)
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setBadInput({});
        }, 500);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function validateInput(event) {
    event.preventDefault();

    const { name, email, password, confirmPassword } = newUser;
    const input = {};
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!name || name.length === 0) {
      input.badName = true;
    }

    if (!emailRegex.test(email)) {
      input.badEmail = true;
    }

    if (
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      password.length < 3
    ) {
      input.badPassword = true;
    }

    if (Object.keys(input).length === 0) return undefined;

    return input;
  }

  return (
    <Register>
      <img src={Logo} alt="My Wallet LOGO" />
      <form
        onSubmit={(event) => {
          const validation = validateInput(event);

          if (validation) {
            setBadInput(validation);
          } else {
            confirmRegister(event);
          }
        }}
      >
        <input
          className={badInput.badName ? "badinput-animation" : ""}
          type="text"
          placeholder="Nome"
          value={newUser.name}
          disabled={loading}
          onChange={(e) => {
            setBadInput({ ...badInput, badName: false });
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
        <input
          className={badInput.badEmail ? "badinput-animation" : ""}
          type="email"
          placeholder="Email"
          value={newUser.email}
          disabled={loading}
          onChange={(e) => {
            setBadInput({ ...badInput, badEmail: false });
            setNewUser({ ...newUser, email: e.target.value });
          }}
        />
        <input
          className={badInput.badPassword ? "badinput-animation" : ""}
          type="password"
          placeholder="Senha"
          value={newUser.password}
          disabled={loading}
          onChange={(e) => {
            setBadInput({ ...badInput, badPassword: false });
            setNewUser({ ...newUser, password: e.target.value });
          }}
        />
        <input
          className={badInput.badPassword ? "badinput-animation" : ""}
          type="password"
          placeholder="Confirmar a senha"
          value={newUser.confirmPassword}
          disabled={loading}
          onChange={(e) => {
            setBadInput({ ...badInput, badPassword: false });
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

  @keyframes shake {
    0% {
      transform: rotateZ(1deg);
      background-color: #ff6666;
    }

    25% {
      transform: rotateZ(-1deg);
      background-color: #ff6666;
    }

    50% {
      transform: rotateZ(1deg);
    }

    75% {
      transform: rotateZ(-1deg);
    }

    100% {
      transform: rotateZ(0);
    }
  }

  .badinput-animation {
    animation-name: shake;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-delay: 0;
    animation-direction: alternate;
    animation-fill-mode: none;
    animation-play-state: running;
    border: #ff6666 3px solid;
  }
`;
