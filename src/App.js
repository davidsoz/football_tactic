import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "./components/ErrorMessage";
import Modal from "./components/Modal";
import StadiumBackground from "./images/stadium.png";

const Container = styled.div`
    padding: 50px;
    background-color: lightgray;
    text-align: center;
`;

const InputContainer =styled.div`
    text-align: center;
    position: relative;
`;

const Stadium = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1px;
    margin: 20px auto;
    width: 520px;
    height: 700px;
    background-image: url(${StadiumBackground});
    background-position: top;
`
const Line = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Player = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: coral;
`

function App() {
    const [inputTactic, setInputTactic] = useState('');
    const [tactic, setTactic] = useState([0, 0, 0, 1]);
    const [showModal, setShowModal] = useState(false);
    const [showTypeError, setShowTypeError] = useState(false);

    const inputRef = useRef();
    const message = useMemo(() => {
        return Number(inputTactic[inputTactic.length-1]) ? 'next must be dash*' : 'next must be number*'
    }, [showTypeError])

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    function closeModalHandler() {
        setShowModal(false);
    }

    function showModalHandler() {
        setShowModal(true);
    }

    function validation(value) {
        for (let i = 0; i < value.length; i++) {
            if (isNaN(Number(value[i])) && (i === 0 || value[i] !== '-') ||
                (value[i] === '-' && value[i + 1] === '-') ||
                (Number(value[i]) && Number(value[i + 1]))) {
                setShowTypeError(true);
                return;
            }
        }
        setShowTypeError(false);
        return true;
    }

    function inputChangeHandler(e) {
        if (validation(e.target.value)) {
            setInputTactic(e.target.value);
        };
    }

    function updateTactic() {
        let parseInput = inputTactic.split('').filter(el => Number(el)).map(el => Number(el));
        let max = 0;
        for (let num of parseInput) {
            max += num;
            if (max > 10) {
                alert('Must be max 10 players');
                let nextInputTactic = inputTactic.split('');
                nextInputTactic.pop();
                nextInputTactic = nextInputTactic.join('');
                setInputTactic(nextInputTactic);
                return;
            }
        }
        let nextTactic = [...tactic];
        for (let i = 0; i < parseInput.length; i++) {
            nextTactic[nextTactic.length - 2 - i] = parseInput[i];
        }
        setTactic(nextTactic);
        if (inputTactic === '') {
            setTactic([0, 0, 0, 1])
        }
    }

    useEffect(() => {
        updateTactic();
    }, [inputTactic])

    return (
        <>
            {
                showModal &&
                <Modal onClose={closeModalHandler}>

                </Modal>
            }
            <Container>
                <InputContainer>
                    <input value={inputTactic} onChange={inputChangeHandler} ref={inputRef} maxLength='5' />
                    {showTypeError && <ErrorMessage message={message}/>} 
                </InputContainer>

                <Stadium>
                    {
                        tactic.map((position, i) => {
                            return (
                                <Line key={i}>
                                    {[...Array(position)].map((player, i) => <Player onClick={showModalHandler} key={i}></Player>)}
                                </Line>
                            )
                        })
                    }
                </Stadium>
            </Container>
        </>

    );
}

export default App;
