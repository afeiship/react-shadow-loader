import React from 'react';
import ReactShadowLoader from '@jswork/react-shadow-loader/src';
import './index.css';
import '@jswork/react-shadow-loader/src/style.scss';

function App() {
  const [visible, setVisible] = React.useState(false);
  const [isDefault, setIsDefault] = React.useState(true);
  const handleShow = () => setVisible(true);
  const handleHide = () => setVisible(false);
  return (
    <div className="relative h-[1000px] overflow-hidden">
      <h1>react-shadow-loader</h1>
      <ReactShadowLoader loader={isDefault ? undefined : <img src="/logo-spin.gif" alt="logo" />} visible={visible} />

      <nav className="absolute top-40 left-0 right-0 p-4 bg-gray-100 x-4 z-10 *:p-2 *:bg-gray-200">
        <button onClick={handleShow}>Show</button>
        <button onClick={handleHide}>hide</button>
      </nav>

      <div className="actions x-5 *:bg-slate-100 *:p-2 *:rounded-md">
        <button className="hover:bg-slate-200" onClick={() => setIsDefault(false)}>Set Custom Loader</button>
        <button className="hover:bg-slate-200" onClick={() => setIsDefault(true)}>Set Standard Loader</button>
        <span className="!bg-slate-500 text-white !hover:bg-slate-600">isDefault: {isDefault.toString()}</span>
      </div>
    </div>
  );
}

export default App;
