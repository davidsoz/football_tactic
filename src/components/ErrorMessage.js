
import styled from 'styled-components';


const Error = styled.div `
position: absolute;
color: red;
left: calc(50% - 78px);
font-size: 12px;
font-style: italic;
`



function ErrorMessage({message}) {
    return (
        <Error>{message}</Error>
    )
}

export default ErrorMessage;