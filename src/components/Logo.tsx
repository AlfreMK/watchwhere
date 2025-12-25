import styled from "styled-components";
import SelectCountry from "@/components/select-country";

function Logo() {
  return (
    <div className="flex justify-center items-center flex-col sm:flex-row my-10 gap-6">
      <Container className="text-indigo-500">WatchWhere</Container>
      <SelectCountry />
    </div>
  );
}

export default Logo;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Century Gothic", Verdana, sans-serif;
  font-size: 3em;
`;
