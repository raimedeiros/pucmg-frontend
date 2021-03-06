import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { FiShoppingBag, FiPlusCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import './produtos.css';
import { Link } from 'react-router-dom';
import ReactExport from 'react-export-excel';
import api from '../../services/api';
import Loader from '../../components/Loader';

type ProdutoProps = {
  estoqueSelecionado: number;
};
interface Produto {
  id: number;
  name: string;
  expires: Date;
  formattedExpires: string;
  amount: number;
  expireStatus: 'green' | 'yellow' | 'red';
}
interface AlertaProdutos {
  vencidos: number;
  proximoVencimento: number;
}
// ({ estoqueSelecionado }: ProdutoProps)
const Produtos: React.FC<ProdutoProps> = ({
  estoqueSelecionado,
}: ProdutoProps) => {
  const [loadStatus, setLoadStatus] = useState<boolean>(true);
  const { ExcelFile } = ReactExport;
  const { ExcelSheet } = ReactExport.ExcelFile;
  const { ExcelColumn } = ReactExport.ExcelFile;

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [alertaProdutos, setAlertaProdutos] = useState<AlertaProdutos>(
    {} as AlertaProdutos,
  );

  useEffect(() => {
    setLoadStatus(true);
    async function loadProducts(): Promise<void> {
      const response = await api.get(`produtos?estoque=${estoqueSelecionado}`);
      let vencidos = 0;
      let proximoVencimento = 0;

      const formattedProducts = response.data.map((product: Produto) => {
        const today = new Date().getTime();
        const expiringDate = new Date(product.expires).getTime();

        const daysToExpire = (expiringDate - today) / (1000 * 60 * 60 * 24);

        let expireStatus = 'green';

        if (daysToExpire < 30 && daysToExpire > 0) {
          expireStatus = 'yellow';
          proximoVencimento += 1;
        }

        if (daysToExpire < 0) {
          expireStatus = 'red';
          vencidos += 1;
        }

        const formattedExpires = new Date(product.expires).toLocaleDateString(
          'pt-br',
        );
        return {
          ...product,
          formattedExpires,
          expireStatus,
        };
      });
      setAlertaProdutos({
        vencidos,
        proximoVencimento,
      });
      setProdutos(formattedProducts);
      setLoadStatus(false);
    }
    loadProducts();
  }, [estoqueSelecionado]);

  return (
    <div id="page-produtos">
      <Row>
        <Col className="titulo-pagina" sm={12} md={6}>
          <h1>
            <FiShoppingBag />
            Produtos
          </h1>
        </Col>
        <Col className="adicionar-item" sm={12} md={6}>
          <Link to={`produtos/create/${estoqueSelecionado}`}>
            <button type="button" className="button-roxo">
              <FiPlusCircle />
              Adicionar produto
            </button>
          </Link>
        </Col>
      </Row>
      {loadStatus && <Loader />}
      {!loadStatus && (
        <>
          <Row className="alerta-produtos">
            <Col md={12}>
              {alertaProdutos.proximoVencimento > 0 && (
                <p className="alerta-amarelo">
                  {`${alertaProdutos.proximoVencimento} itens próximos ao vencimento`}
                </p>
              )}
            </Col>
            <Col md={12}>
              {alertaProdutos.vencidos > 0 && (
                <p className="alerta-vermelho">
                  {`${alertaProdutos.vencidos} itens vencidos`}
                </p>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <table className="lista-tabela-padrao">
                <thead>
                  <tr>
                    <th className="cell-name">Produto</th>
                    <th>Validade</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map(produto => (
                    <tr className="linha-produto" key={produto.id}>
                      <td className="cell-name">{produto.name}</td>
                      <td className={`cell-expires ${produto.expireStatus}`}>
                        {produto.formattedExpires}
                      </td>
                      <td className="cell-amount">{produto.amount}</td>
                      <td className="cell-actions">
                        <Link to={`produtos/edit/${produto.id}`}>
                          <FiEdit />
                        </Link>
                        <Link to={`desperdicios/create/${produto.id}`}>
                          <FiTrash2 />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <Col className="baixar-dados">
              <ExcelFile
                filename="planilha-de-dados"
                element={
                  <button type="button" className="button-download">
                    Exportar dados
                  </button>
                }
              >
                <ExcelSheet data={produtos} name="Produtos">
                  <ExcelColumn label="Produto" value="name" />
                  <ExcelColumn label="Validade" value="formattedExpires" />
                  <ExcelColumn label="Quantidade" value="amount" />
                </ExcelSheet>
              </ExcelFile>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
export default Produtos;
