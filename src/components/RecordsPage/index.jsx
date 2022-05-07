import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import RecordsBox from "../RecordsBox";

import UserContext from "../../contexts/UserContext";

import logOutIcon from "./../../assets/images/log-out.svg";
import plusIcon from "./../../assets/images/plus.svg";
import minusIcon from "./../../assets/images/minus.svg";
import { Link } from "react-router-dom";

export default function RecordsPage() {
  const [pageData, setPageData] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const loadingSvg = <ThreeDots width="50px" color="#fff" />;

  function getRecords() {
    console.log(user.userId);
    const URL = `http://localhost:5000/users/${user.userId}`;
    axios
      .get(URL, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setPageData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    const URL = "http://localhost:5000/sign-out";
    axios
      .delete(URL, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(getRecords, []);

  return !pageData ? (
    <LoadingContainer>{loadingSvg}</LoadingContainer>
  ) : (
    <Records>
      <header>
        <h1>Ola, {pageData.name}</h1>
        <img src={logOutIcon} alt="logout" onClick={logout} />
      </header>
      <RecordsBox pageData={pageData} />
      <Buttons>
        <Link
          className="btn-link"
          to="/records/add"
          state={{ negative: false }}
        >
          <button>
            <img src={plusIcon} alt="+" />
            <span>Nova Entrada</span>
          </button>
        </Link>
        <Link className="btn-link" to="/records/add" state={{ negative: true }}>
          <button>
            <img src={minusIcon} alt="-" />
            <span>Nova Saida</span>
          </button>
        </Link>
      </Buttons>
    </Records>
  );
}

const Records = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  header {
    width: 80%;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }

  img {
    width: 26px;
  }

  h1 {
    color: #fff;
    font-weight: bold;
    font-size: 26px;
  }
`;

const Buttons = styled.div`
  width: 80%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

  button,
  .btn-link {
    width: 48%;
    height: 114px;
    background-color: #a329d6;
    color: #fff;
    border: none;
    border-radius: 5px;
    position: relative;
    text-align: left;
  }

  span {
    display: block;
    width: 40px;
    position: absolute;
    left: 5px;
    bottom: 5px;
    font-weight: 700;
    font-size: 17px;
  }

  img {
    position: absolute;
    left: 5px;
    top: 5px;
    width: 30px;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
