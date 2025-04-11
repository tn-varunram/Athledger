import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Body from './Components/body/Body'
const App = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <Body />
    <Footer />
  </div>
);

export default App;
