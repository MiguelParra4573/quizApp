
const reducer = (state, action) => {
   
    switch (action.type) {
        case "FETCH_DATA":
            return {...state, countries: action.payload, loading: true, answered: 0, counter: 5, score: 0}    
        case "QUESTION_ANSWERED":
            const {counter, answered, isAnswered} = state
            const user_answer = action.payload.answer
            const optionID = action.payload.id
            const current_answer = state.questionData.answer
            const score = () => (user_answer === current_answer) ? 1 : 0
            if(!state.isAnswered)
            return {
                ...state,
                isAnswered: true,
                answered: parseInt(state.answered,10) + 1,
                score: parseInt(state.score, 10) + score(),
                selectedOptionID: optionID,
                user_answer: user_answer
            }
            return {...state}
        case 'START_QUIZ':
            const my_score = state.score;
            const { country, quesion_type, currentQuestion, options, answer } = action.payload
            const newQues = {
                quesion_type: quesion_type,
                currentQuestion: currentQuestion,
                answer: answer,
                options: options,
                country: country
            }
            return {
                ...state,
                loading: false,
                isAnswered: false,
                questionData: newQues
            }
        default:
            return state
    }
}

export default reducer
