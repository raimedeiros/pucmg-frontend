import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Hidden } from 'react-grid-system';
import './estoques.css';
import { FiBox, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import api from '../../services/api';
import Produtos from '../Produtos';
import Loader from '../../components/Loader';

interface Estoque {
  id: number;
  name: string;
  type: string;
  quantidade_produtos: number;
}
interface Produto {
  id: number;
  name: string;
}
const Estoques: React.FC = () => {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [estoqueSelecionado, setEstoqueSelecionado] = useState(0);
  const [loadStatus, setLoadStatus] = useState<boolean>(true);

  useEffect(() => {
    setLoadStatus(true);
    api.get('estoques').then(response => {
      setEstoques(response.data);
      setLoadStatus(false);
    });
  }, []);

  async function handleEstoqueSelecionado(estoque: number): Promise<void> {
    setEstoqueSelecionado(estoque);
  }

  return (
    <Container id="page" className="page-estoques">
      <Row className="main-row">
        <Col md={2}>
          <Menu />
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <header>
              <Row>
                <Col className="titulo-pagina" sm={12} md={6}>
                  <h1>
                    <FiBox />
                    Estoques
                  </h1>
                </Col>
                <Col className="adicionar-item" sm={12} md={6}>
                  <Link to="/estoques/create">
                    <button type="button" className="button-roxo">
                      <FiPlusCircle />
                      Adicionar estoque
                    </button>
                  </Link>
                </Col>
              </Row>
            </header>
            {loadStatus && <Loader />}
            {!loadStatus && (
              <>
                <Row>
                  {estoques.map(estoque => (
                    <Col md={4} key={estoque.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => handleEstoqueSelecionado(estoque.id)}
                        className="card-estoque"
                        onClick={() => handleEstoqueSelecionado(estoque.id)}
                      >
                        <div className="head-estoque">
                          <div className="icon-estoque">
                            <span>
                              <FiBox />
                            </span>
                          </div>
                          <div className="box-titulo-estoque">
                            <div className="titulo-estoque">{estoque.name}</div>
                            <div className="tipo-estoque">{estoque.type}</div>
                          </div>
                        </div>
                        <Hidden xs sm>
                          <div className="body-estoque">
                            <div className="quantidade-itens">
                              {estoque.quantidade_produtos}
                              <span>
                                {estoque.quantidade_produtos > 1
                                  ? 'itens'
                                  : 'item'}
                              </span>
                            </div>
                          </div>
                        </Hidden>
                      </div>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col>
                    {estoqueSelecionado > 0 ? (
                      <Produtos estoqueSelecionado={estoqueSelecionado} />
                    ) : (
                      ''
                    )}
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Estoques;
