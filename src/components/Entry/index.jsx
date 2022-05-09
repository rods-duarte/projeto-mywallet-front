import { useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

export default function Entry({ entryData, pageData, setPageData }) {
  const { value, desc, type, date, _id } = entryData;
  const { user } = useContext(UserContext);

  function confirmDelete(_id) {
    const URL = `http://localhost:5000/users/${_id}`;
    axios
      .delete(URL, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => setPageData({ ...pageData, records: response.data }))
      .catch((err) => console.log(err));
  }
  return (
    <Record>
      <div>
        <Date>{date}</Date>
        <Description>{desc}</Description>
      </div>
      <div>
        <span className={type}>{value.toString().replace(".", ",")}</span>
        <span
          onClick={() => {
            if (window.confirm("Tem certeza que quer deletar ?"))
              confirmDelete(_id);
          }}
        >
          x
        </span>
      </div>
    </Record>
  );
}

const Record = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin: 10px 0;
  font-size: 16px;

  div {
    display: flex;
  }

  div:nth-child(2) span:nth-child(2) {
    color: #c6c6c6;
    margin-left: 10px;
    font: 16px;
  }

  .positive {
    color: #61cb60;
  }

  .negative {
    color: #d12f2e;
  }
`;

const Date = styled.span`
  color: #c6c6c6;
`;

const Description = styled.span`
  margin: 0 7px;
  display: block;
`;
