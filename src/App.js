import './assets/css/main.css';
import { useGlobalContext } from './provider/context';
import Question from './components/Question';
import Result from './components/Result';

function App() {
  const {state} = useGlobalContext()
  return (
    <div className="App">
      <main>
        <section className="quiz-wrapper">
          <h1>Country Quiz</h1>
          {
            state.counter !== state.answered ?  <Question/> : <Result />
          }
           
          {/* <Result /> */}
        </section>
      </main>
      <footer>created with 💕 by Odoh Friday - devChallenges.io</footer>
    </div>
  );
}

export default App;
