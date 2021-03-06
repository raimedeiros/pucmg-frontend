import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FiLogIn, FiPlusCircle, FiUser, FiKey } from 'react-icons/fi';
import { Container, Row, Col } from 'react-grid-system';
import FacebookLogin from 'react-facebook-login';

import { useAuth } from '../../context/auth.js';
import api from '../../services/api';
import './login.css';
import Loader from '../../components/Loader';

interface FacebookUser {
  name: string;
  email: string;
  password: string;
  accessToken: string;
}
interface DataBaseUser {
  id: number;
  name: string;
  email: string;
  type: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loadStatus, setLoadStatus] = useState<boolean>(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  // Usuario do facebook
  const [facebookUser, setFacebookUser] = useState<FacebookUser>();

  // Usuario do banco
  const [databaseUser, setDataBaseUser] = useState<DataBaseUser>();

  const responseFacebook = async (response: any): Promise<void> => {
    if (response.accessToken) {
      const password = response.accessToken;
      setFacebookUser({
        name: response.name,
        email: response.email,
        password: password.substr(1, 8),
        accessToken: response.accessToken,
      });
    }
  };

  useEffect(() => {
    if (databaseUser) {
      api
        .post('sessionsFacebook', {
          dbUser: databaseUser,
          accessToken: facebookUser?.accessToken,
        })
        .then(credentials => {
          if (credentials.status === 200) {
            setAuthTokens(credentials.data);
            setLoggedIn(true);
          } else {
            setIsError(true);
            setLoggedIn(false);
          }
        })
        .catch(e => {
          setIsError(true);
          setLoggedIn(false);
        });
      setLoadStatus(false);
    }
  }, [databaseUser]);

  useEffect(() => {
    if (facebookUser) {
      api
        .get(`funcionarios/?email=${facebookUser.email}`)
        .then(dbUser => {
          if (dbUser.data) {
            setDataBaseUser(dbUser.data);
          }
        })
        .catch(e => {
          api
            .post('funcionarios', {
              name: facebookUser.name,
              email: facebookUser.email,
              password: facebookUser.password,
            })
            .then(funcionario => {
              setDataBaseUser(funcionario.data);
            });
        });
    }
  }, [facebookUser]);

  async function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setLoadStatus(true);
    api
      .post('sessions', formData)
      .then(response => {
        if (response.status === 200) {
          setAuthTokens(response.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
          setLoggedIn(false);
        }
      })
      .catch(e => {
        setIsError(true);
        setLoggedIn(false);
      });
    setLoadStatus(false);
  }

  if (isLoggedIn) {
    return <Redirect to="/estoques" />;
  }

  return (
    <Container fluid id="page-login">
      <Row className="content">
        <Col className="logo" xs={12} offset={{ md: 4 }} md={4}>
          Despensa
        </Col>
        <Col xs={12} md={4} offset={{ md: 4 }}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">
                E-mail
                <div className="input-box">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                  />
                  <span className="dcr-input">
                    <FiUser />
                  </span>
                </div>
              </label>
            </div>
            <div className="field">
              <label htmlFor="password">
                Senha
                <div className="input-box">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleInputChange}
                  />
                  <span className="dcr-input">
                    <FiKey />
                  </span>
                </div>
              </label>
            </div>
            {loadStatus && <Loader />}

            {isError && (
              <div className="info-login-error">
                <span>O usuário ou senha estão incorretos.</span>
              </div>
            )}

            <div className="submit-button">
              <button type="submit" className="button-roxo">
                <FiLogIn />
                Entrar
              </button>
            </div>
          </form>
          <div className="novo-usuario">
            <Link to="/register">
              <FiPlusCircle />
              Criar novo usuário
            </Link>
          </div>
          <div className="login-facebook">
            <FacebookLogin
              appId="1546719762173713"
              fields="name,email"
              autoLoad={false}
              callback={responseFacebook}
              textButton="Entrar com facebook"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
