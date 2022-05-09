import axios from "axios";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function NewEntryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { negative } = location.state;
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [entryData, setEntryData] = useState({
    type: negative ? "negative" : "positive",
  });

  const loadingSvg = <ThreeDots width="50px" color="#fff" />;
  function addEntry(event) {
    const URL = `https://back-projeto-my-wallet.herokuapp.com/users/${user.userId}`;
    const { updateStatus } = location.state;
    event.preventDefault();
    setLoading(true);
    axios
      .post(URL, entryData, {
        headers: { authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        navigate("/records", { state: { updateStatus } });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <NewEntry>
      <header>
        <h1>Nova {negative ? "Saida" : "Entrada"}</h1>
      </header>
      <form onSubmit={addEntry}>
        <input
          type="number"
          min="1"
          step="any"
          placeholder="Valor"
          disabled={loading}
          value={entryData.value}
          onChange={(e) => {
            setEntryData({ ...entryData, value: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Descricao"
          disabled={loading}
          value={entryData.desc}
          onChange={(e) => {
            setEntryData({ ...entryData, desc: e.target.value });
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? loadingSvg : negative ? "Salvar Saida" : "Salvar Entrada"}
        </button>
      </form>
    </NewEntry>
  );
}

const NewEntry = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  header {
    width: 80%;
    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }

  h1 {
    color: #fff;
    font-weight: bold;
    font-size: 26px;
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
`;
