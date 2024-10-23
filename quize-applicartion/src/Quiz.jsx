import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Head from './Head';
import './App.css';
const Quiz = () => {
    const [count, setCount] = useState(0);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [correctAnswer,setCorrectAnswer]=useState('');
    const [incorrectAnswers,setIncorrectAnswer]=useState('');
    const [selectedAnswer,setSelectedAnswer]=useState('');
    const [score,setScore]=useState(0);
    const api = async () => {
        try {
            const response = await axios.get("https://the-trivia-api.com/v2/questions");
            console.log(response);
            const questionData = response.data[count];
            if (questionData && questionData.question) {
                setQuestion(questionData.question.text);
                const incorrectAnswers = questionData.incorrectAnswers;
                const correctAnswer=questionData.correctAnswer;
                setCorrectAnswer(correctAnswer);
                const allAnswers = [...incorrectAnswers,correctAnswer].sort(() => Math.random() - 0.5);
                setAnswers(allAnswers);
                setSelectedAnswer('');
            } else {
                setQuestion('No question available.');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setQuestion('Error fetching question.');
        }
    };

    useEffect(() => {
        api();
    }, [count]);
    function select(answer){
       setSelectedAnswer(answer);
    }
    function handlescore(){
        if(selectedAnswer===correctAnswer){
            setScore(prev=>prev+1)
        }
        setCount(prevcount=>prevcount+1)
    }
    return (
        <>
            <Head />
            <div className='bg-warning-subtle mt-2'>
                <h1 className='fs-2 text-danger fw-bold m-2'>Q. {question}</h1>
                {answers.map((answer, index) => (
                    <div key={index} className={`bg-secondary-subtle m-3 fs-3 point ${selectedAnswer===answer?'bg-info':''}`}onClick={()=>{
                        select(answer)
                    }}>
                        {index+1}.{answer}
                    </div>
                ))}
                <button
                    className='btn btn-primary btn-lg button mb-1'
                    onClick={() =>handlescore()}
                >
                    Next
                </button>
                <label for="one"className='form-label mx-2 text-success fw-bold fs-3'>Point:</label>
                <input type="number"className='form-control hw border border-dark'id="one"value={score}/>
            </div>
        </>
    );
};

export default Quiz;
