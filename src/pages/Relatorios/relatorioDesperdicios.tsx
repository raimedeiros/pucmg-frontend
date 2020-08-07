import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-grid-system';
import { FiBarChart2 } from 'react-icons/fi';

import { SimpleBarChart } from '@carbon/charts-react';
import api from '../../services/api';
import Menu from '../Menu';
import '@carbon/charts/styles.css';
import Loader from '../../components/Loader';

interface Desperdicio {
  id: number;
  name: string;
  amount: string;
  reason: string;
  date: Date;
}

interface ChartData {
  group: string;
  value: number;
}

const RelatorioDesperdicios: React.FC = () => {
  const [loadStatus, setLoadStatus] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartData[]>([
    {
      group: 'Janeiro',
      value: 0,
    },
    {
      group: 'Fevereiro',
      value: 0,
    },
    {
      group: 'Março',
      value: 0,
    },
    {
      group: 'Abril',
      value: 0,
    },
    {
      group: 'Maio',
      value: 0,
    },
    {
      group: 'Junho',
      value: 0,
    },
    {
      group: 'Julho',
      value: 0,
    },
    {
      group: 'Agosto',
      value: 0,
    },
    {
      group: 'Setembro',
      value: 0,
    },
    {
      group: 'Outubro',
      value: 0,
    },
    {
      group: 'Novembro',
      value: 0,
    },
    {
      group: 'Dezembro',
      value: 0,
    },
  ]);

  const chartOptions = {
    title: 'Relatório de desperdícios por mês',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels',
      },
    },
    height: '400px',
  };

  useEffect(() => {
    setLoadStatus(true);
    async function loadChartData(): Promise<void> {
      const response = await api.get('desperdicios');
      const updateChartData = chartData;
      response.data.map((desperdicio: Desperdicio) => {
        const month = new Date(desperdicio.date).getMonth();

        updateChartData[month].value += 1;

        setChartData([...updateChartData]);

        setLoadStatus(false);
        return desperdicio;
      });
    }
    loadChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <FiBarChart2 />
                  Relatório de desperdícios
                </h1>
              </Col>
            </Row>

            {loadStatus && <Loader />}

            {!loadStatus && (
              <Row>
                <Col>
                  <SimpleBarChart data={chartData} options={chartOptions} />
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default RelatorioDesperdicios;
