import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';
import { FiBox } from 'react-icons/fi';
import DatePicker, { registerLocale } from 'react-datepicker';

import ptBR from 'date-fns/locale/pt-BR';
import api from '../../services/api';
import Menu from '../Menu';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

interface EditProductsParams {
  produto: string;
}
interface Produto {
  id: number;
  name: string;
  expires: Date;
  amount: number;
}
interface EditProdutoDTO {
  amount: number;
}
const EditProduto: React.FC = () => {
  const { params } = useRouteMatch<EditProductsParams>();
  const [produto, setProduto] = useState<Produto>();
  const [formData, setFormData] = useState<EditProdutoDTO>({
    amount: 0,
  });
  const history = useHistory();

  useEffect(() => {
    api.get(`produtos/${params.produto}`).then(response => {
      setProduto(response.data.produtos);
      setFormData({ amount: response.data.produtos.amount.toString() });
    });
  }, [params.produto]);

  async function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const { value } = event.target;
    setFormData({ amount: Number(value) });
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    if (formData) {
      const { amount } = formData;
      const data = {
        amount,
      };
      await api.post(`produtos/${params.produto}`, data);
      history.push('/estoques');
    }
  }
  return (
    <Container id="page">
      <Row className="main-row">
        <Col md={2}>
          <Menu />
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <Row>
              <Col className="titulo-pagina">
                <h1>
                  <FiBox />
                  Consumir produto
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <form className="form-padrao" onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="amount">
                      Quantidade
                      <div className="input-box">
                        <input
                          value={formData?.amount}
                          type="number"
                          name="amount"
                          id="amount"
                          onChange={handleInputChange}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="submit-button">
                    <button type="submit" className="button-roxo">
                      Salvar
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduto;
