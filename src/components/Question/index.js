import logo from '../../assets/images/undraw_adventure_4hum 1.svg'
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import Card from '../../common/components/Card'
import { Animated } from "react-animated-css";
import { useGlobalContext } from '../../provider/context';
import { useEffect } from 'react';

const Question = () => {
    const { state, nextQuestionHandler, optionClicked } = useGlobalContext()   
    // useEffect(() => {
    //          if(state.questionData){
    //             // const { country, quesion_type, currentQuestion, options, answer } = randQuestion()
    //             console.log(state.questionData.currentQuestion )
    //          }
    // },[state.questionData])
    if(state.loading){
        return <div>Loading...</div>
    }
    return( state.questionData ?
        
        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
            <Card>
                {state.questionData.quesion_type === 'flag' &&
                    <div className="flag">
                        <img src={state.questionData.country.flag} alt="flag" />
                    </div>
                   
                }
                <h3 className="question">{state.questionData.currentQuestion}</h3>
                <div className="options">
                    {
                        state.questionData.options.map((option, index) => {
                            const optionLabel = ['A', 'B', 'C', 'D']
                            return (
                                <div className={`
                                ${state.isAnswered && state.questionData.answer === option ? 'option success' : 'option'}
                                ${state.isAnswered && state.questionData.answer !==  state.user_answer && index === state.selectedOptionID ? 'danger' : ''}
                                `} key={index}>
                                    <span className="option-type">{optionLabel[index]}</span>
                                    <div className="answer" onClick={() => optionClicked(option, index)}>{option}</div>
                                    <span className="result-icon">
                                        {state.isAnswered && state.questionData.answer === option ? <IoIosCheckmarkCircleOutline/> : ''}
                                        {state.isAnswered && state.questionData.answer !==  state.user_answer && index === state.selectedOptionID ? <MdCancel/> : '' }
                                    </span>
                                </div>
                            )
                        })
                    }
                    
                    {/* <div className="option">
                        <span className="option-type">B</span>
                        <div className="answer">Vietnam</div>
                        <span className="result-icon"><MdCancel/></span>
                    </div>
                    <div className="option">
                        <span className="option-type">C</span>
                        <div className="answer">Vietnam</div>
                        <span className="result-icon">✔</span>
                    </div>
                    <div className="option">
                        <span className="option-type">D</span>
                        <div className="answer">Vietnam</div>
                        <span className="result-icon">✔</span>
                    </div> */}
                </div>
                
                {
                    state.isAnswered &&
                    <button className="btn btn-next" onClick={nextQuestionHandler}>Next</button>
                }
                <div className="logo">
                   <Animated animationIn="fadeIn" animationInDelay={1000}>
                        <img src={logo} alt="logo" />
                   </Animated>
                </div>
            </Card>
        </Animated>
        : ''
    )
}

export default Question