import styled from "styled-components";

const Contanier = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: gray;
    opacity: .5;
`;

const Box = styled.div`
    position: absolute;
    padding: 10px;
    width: 400px;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: #fff;
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
`;

function Modal({children, onClose, onSubmit}) {
    return (
        <Contanier>
            <Backdrop onClick={onClose}/>
            <Box>
                {children}
                <BtnContainer>
                    <button onClick={onSubmit}>submit</button>
                    <button onClick={onClose}>close</button>
                </BtnContainer>
            </Box>       
        </Contanier>
    )
}

export default Modal;