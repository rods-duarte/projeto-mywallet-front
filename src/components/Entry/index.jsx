import styled from "styled-components";

export default function Entry({ entryData }) {
  const { value, desc, type, date } = entryData;
  return (
    <Record>
      <div>
        <Date>{date}</Date>
        <Description>{desc}</Description>
      </div>
      <div className={type}>{value.toString().replace(".", ",")}</div>
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
