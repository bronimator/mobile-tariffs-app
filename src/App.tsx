import './App.css';
import Home from './pages/Home';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7a5cfa',
        },
      }}
    >
      <div className="App">
        <Home />
      </div>
    </ConfigProvider>
  );
}

export default App;
