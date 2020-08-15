import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-grid-system';
import { FiBox } from 'react-icons/fi';
import ReactExport from 'react-export-excel';
import Menu from '../Menu';
import api from '../../services/api';
import Loader from '../../components/Loader';

interface Desperdicio {
  id: number;
  name: string;
  date: Date;
  formattedDate: Date;
  amount: number;
}

const Desperdicios: React.FC = () => {
  const [loadStatus, setLoadStatus] = useState<boolean>(true);
  const { ExcelFile } = ReactExport;
  const { ExcelSheet } = ReactExport.ExcelFile;
  const { ExcelColumn } = ReactExport.ExcelFile;

  const [desperdicios, setDesperdicios] = useState<Desperdicio[]>([]);

  useEffect(() => {
    setLoadStatus(true);
    async function loadDesperdicios(): Promise<void> {
      const response = await api.get('desperdicios');
      const formattedDesperdicios = response.data.map(
        (desperdicio: Desperdicio) => {
          const { id, name, date, amount } = desperdicio;
          const formattedDate = new Date(date).toLocaleDateString('pt-br');
          return { id, name, date, formattedDate, amount };
        },
      );
      setDesperdicios(formattedDesperdicios);
      setLoadStatus(false);
    }
    loadDesperdicios();
  }, []);
  return (
    <Container id="page">
      <Row className="main-row">
        <Col md={2}>
          <Menu />
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <header>
              <Row>
                <Col className="titulo-pagina">
                  <h1>
                    <FiBox />
                    Desperdícios
                  </h1>
                </Col>
              </Row>
            </header>
            {loadStatus && <Loader />}
            {!loadStatus && (
              <>
                <Row>
                  <Col>
                    <table className="lista-tabela-padrao">
                      <thead>
                        <tr>
                          <th className="cell-name">Produto</th>
                          <th>Quantidade</th>
                          <th>Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {desperdicios.map(desperdicio => (
                          <tr
                            className="linha-desperdicio"
                            key={desperdicio.id}
                          >
                            <td className="cell-name">{desperdicio.name}</td>
                            <td className="cell-amount">
                              {desperdicio.amount}
                            </td>
                            <td className="cell-amount">
                              {desperdicio.formattedDate}
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
                      <ExcelSheet data={desperdicios} name="Desperdícios">
                        <ExcelColumn label="Produto" value="name" />
                        <ExcelColumn label="Quantidade" value="amount" />
                        <ExcelColumn label="Data" value="formattedDate" />
                      </ExcelSheet>
                    </ExcelFile>
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
export default Desperdicios;
