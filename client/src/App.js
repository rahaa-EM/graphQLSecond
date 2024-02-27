import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import Title from './components/Title';
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import PersonCard from './components/People';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Detail from './pages/Detail';
// ==========================================

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});
const App = () => {

  return (
    <Router>
    <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:personId" element={<Detail />} />
          </Routes>
    </div>
    </ApolloProvider>
    </Router>
  );
}

export default App;
