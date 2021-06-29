import React, { useContext, useEffect, useReducer, useState } from "react"
import reducer from "../reducer/reducer"
import store from "../store/store"
import useSound from 'use-sound';
import boopFailed from '../assets/sounds/failed.mp3';
import boopCorrect from '../assets/sounds/correct.mp3';
import boopGaming from '../assets/sounds/game_on.mp3';
import boopWinner from '../assets/sounds/winner.mp3';
import boopWrong from '../assets/sounds/wrong.mp3';

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const start_sound = useSound(boopGaming);
    const correct_sound = useSound(boopCorrect);
    const wrong_sound = useSound(boopWrong);

    const start_game_sound = () => {
        const [play, {stop}] = start_sound
        return {play, stop}
    }

    const play_answered_sound = (is_correct) => {
       if(is_correct){
        const [play, {stop}] = correct_sound
        return {play, stop}
       }
       const [play, {stop}] = wrong_sound
       return {play, stop}
    }

    const [state, dispatch] = useReducer(reducer, store)
    const fetchCountries = async () => {
       try {
        const response = await fetch(`https://restcountries.eu/rest/v2/all`);
        const data = await response.json();
        dispatch({type: 'FETCH_DATA', payload: data})
       } catch (error) {
           throw new Error()
       }
      }
      
    //   useEffect(() => {
    //     if(!state.isAnswered){
    //         start_game_sound().play()
    //     }
    //   },[state.questionData])

    const nextQuestionHandler = () => {
        startQuiz()
    }
    const restartQuiz = () => {
        start_game_sound().play() 
       fetchCountries()
        // window.location.reload();
    }

    const optionClicked = (answer, id) => {
        start_game_sound().stop()
       if(!state.isAnswered){
        if(state.questionData.answer === answer){
            play_answered_sound(true).play()
        }else{
            play_answered_sound(false).play()
        }
       }
       dispatch({type: 'QUESTION_ANSWERED', payload: {answer, id}})
       
    }

    const randQuestion = () => {
        const options = [];
        const randNum = Math.floor(Math.random() * state.countries.length);
        const TYPE = ['capital', 'flag']
        const quesion_type = TYPE[Math.floor(Math.random() * TYPE.length)]
        const country = state.countries[randNum];
        const answer = state.countries[randNum].name;
        while(options.length < 3){
            let option = Math.floor(Math.random() * state.countries.length) + 1
            if(option === undefined){
                return
            }
            if(options.indexOf(option) === -1 && options.indexOf(randNum) === -1) options.push(state.countries[option].name)
        }
        options.push(answer)
        options.sort()
        const question = () => {
                switch (quesion_type) {
                    case 'capital':
                        return `${country.capital} is the capital of?`
                    case 'flag':
                        return `Which country does this flag belong to?`              
                    default:
                        break;
                }
            }
        const currentQuestion =  question()
        return {
            country,
            quesion_type,
            currentQuestion,
            options,
            answer,
            optionClicked,
            
        }
    }

    const startQuiz = () => {
        dispatch({type: 'START_QUIZ', payload: randQuestion()})
    }

      useEffect(() => {
        fetchCountries();
      },[])
      useEffect(() => {
        if(state.countries){
            dispatch({type: 'START_QUIZ', payload: randQuestion()})
        }
      },[state.countries])
    return (
        <AppContext.Provider value={{
            state,
            startQuiz,
            randQuestion,
            nextQuestionHandler,
            optionClicked,
            restartQuiz,
        }}>
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => useContext(AppContext) 

export {AppProvider, AppContext}