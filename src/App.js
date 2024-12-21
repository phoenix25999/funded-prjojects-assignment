import style from "./App.module.scss"
import Table from './components/Table/Table';

function App() {
  return (
    <div className={style.container}>
        <h1>Kickstarter Projects</h1>
        <Table />
      </div>
  );
}

export default App;
