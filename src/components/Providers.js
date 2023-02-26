import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { logoProvider } from '../api/apiFunctions';

function Providers(props){
    const providersDefault = {buy: [], stream: []};
    const [providers, setProviders] = useState(providersDefault);
    useEffect(() => {
        setProviders(props.providers);
    }, [props.providers]);

    return (
        <div>
            <Text>Streaming</Text>
            <Container>
                {providers.stream.map((provider, index) => (
                    <Provider key={index}>
                        <Image className='shadow-inner' src={logoProvider(provider)} alt={provider.provider_name} title={provider.provider_name}/>
                    </Provider>
                ))}
            </Container>
            <Text>Buy</Text>
            <Container>
                {providers.buy.map((provider, index) => (
                    <Provider key={index}>
                        <Image className='shadow-inner' src={logoProvider(provider)} alt={provider.provider_name} title={provider.provider_name}/>
                    </Provider>
                ))}
            </Container>
        </div>

    )
            
}

export default Providers;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 12px;
    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
    }

`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 5px;
    background-color: #312e81;
    border-radius: 8px;
    padding: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const Provider = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

const Text = styled.span`
    display: inline;
    font-size: 15px;
    font-optical-sizing: auto;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: initial;
    color: #a5b3b9;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    @media (max-width: 768px) {
        font-size: 12px;
    }

`;