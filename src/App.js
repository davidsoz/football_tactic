import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./componenets/Modal";
import StadiumBackground from "./images/stadium.png"

const Container = styled.div`
    padding: 50px;
    background-color: lightgray;
    text-align: center;
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
    const [tactic, setTactic] = useState([0,0,0,1]);
    const [showModal, setShowModal] = useState(false);


    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    function closeModalHandler() {
        setShowModal(false);
    }

    function showModalHandler() {
        setShowModal(true);
    }

    function inputChangeHandler(e) {
        if(isNaN(Number(e.target.value)) && !e.target.value.split('').includes('-')) {
            return;
        };
        console.log('change');
        setInputTactic(e.target.value);
    }

    function updateTactic() {
        let parseInput = inputTactic.split('').filter(el => Number(el)).map(el => Number(el));
        let max = 0;
        for(let num of parseInput) {
            max += num;
            if(max > 10) {
                alert('Must be max 10 players');
                let nextInputTactic = inputTactic.split('');
                nextInputTactic.pop();
                nextInputTactic = nextInputTactic.join('');
                setInputTactic(nextInputTactic);
                return;
            }
        }
        let nextTactic = [...tactic];
        for(let i = 0; i < parseInput.length; i++) {
            nextTactic[nextTactic.length - 2 - i] = parseInput[i];
        }
        setTactic(nextTactic);
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
            <input value={inputTactic} onChange={inputChangeHandler} ref={inputRef} maxLength='5'/>
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
