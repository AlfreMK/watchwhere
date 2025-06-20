import styled from 'styled-components'

function Logo() {
  return <Container className="text-indigo-500">WatchWhere</Container>
}

export default Logo

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Century Gothic', Verdana, sans-serif;
  font-size: 3em;
  margin: 40px;
`
