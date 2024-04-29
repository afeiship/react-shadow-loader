import React from'react';
import ReactShadowLoader from '@jswork/react-shadow-loader/src';
import './index.css';
import '@jswork/react-shadow-loader/src/style.scss';

function App() {
  const [visible, setVisible] = React.useState(true);
  const handleShow = () => setVisible(true);
  const handleHide = () => setVisible(false);
  return (
    <div className="relative h-[1000px] overflow-hidden debug-red">
      <h1>react-shadow-loader</h1>
      <ReactShadowLoader visible={visible} onClose={handleHide} />

      <nav className="absolute top-40 left-0 right-0 p-4 bg-gray-100 x-4 z-10 *:p-2 *:bg-gray-200">
        <button onClick={handleShow}>Show</button>
        <button onClick={handleHide}>hide</button>
      </nav>
    </div>
  );
}

export default App;
