import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
  return (
    <div className="loader-component">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
      <p>Carregando dados</p>
    </div>
  );
};
export default Loader;
