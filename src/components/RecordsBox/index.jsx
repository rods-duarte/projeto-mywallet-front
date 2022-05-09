import styled from "styled-components";

import Entry from "../Entry";

export default function RecordsBox({ pageData, setPageData }) {
  const balance = pageData?.records
    .reduce((acc, element) => {
      if (element.type === "positive") {
        return acc + Number(element.value);
      } else {
        return acc - Number(element.value);
      }
    }, 0)
    .toFixed(2);

  const records = pageData?.records.length ? (
    <>
      <div className="records">
        {pageData.records.map((record) => {
          return (
            <Entry
              key={record._id}
              entryData={record}
              pageData={pageData}
              setPageData={setPageData}
            />
          );
        })}
      </div>
      <div className="balance">
        <span>SALDO</span>
        <span className={balance >= 0 ? "positive" : "negative"}>
          {balance.toString().replace(".", ",")}
        </span>
      </div>
    </>
  ) : (
    <h2>Não há registros de entrada ou saída</h2>
  );
  return <Box>{records}</Box>;
}

const Box = styled.div`
  width: 80%;
  height: 300px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  .records {
    overflow: scroll;
    max-height: 436px;
  }

  h2 {
    color: #868686;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    display: block;
    width: 200px;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .balance {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-top: solid 1px #f1f1f1;
  }

  .balance span {
    font-weight: 600;
    font-size: 18px;
  }

  .positive {
    color: #61cb60;
  }

  .negative {
    color: #d12f2e;
  }
`;
