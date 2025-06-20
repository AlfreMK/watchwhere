import styled from 'styled-components'

function Footer() {
  return (
    <Container>
      Made by{' '}
      <Link href="https://github.com/AlfreMK" className="text-indigo-500">
        {' '}
        Alfredo Medina
      </Link>
      .
    </Container>
  )
}

export default Footer

const Container = styled.footer`
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  @media (max-width: 640px) {
    font-size: 0.8em;
  }
`

const Link = styled.a`
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`
