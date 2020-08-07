import React from 'react';
import './loader.css';
import { Row, Col } from 'react-grid-system';

const Loader: React.FC = () => {
  return (
    <Row>
      <Col>
        <div className="loader-component">
          <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
          <p>Carregando dados</p>
        </div>
      </Col>
    </Row>
  );
};
export default Loader;
