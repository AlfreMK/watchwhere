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
            <h2>Streaming</h2>
            <Container>
                {providers.stream.map((provider, index) => (
                    <Provider key={index}>
                        <Image src={logoProvider(provider)} alt={provider.provider_name} title={provider.provider_name}/>
                    </Provider>
                ))}
            </Container>
            <h2>Buy</h2>
            <Container>
                {providers.buy.map((provider, index) => (
                    <Provider key={index}>
                        <Image src={logoProvider(provider)} alt={provider.provider_name} title={provider.provider_name}/>
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
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

const Provider = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;