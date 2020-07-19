import React, {useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Container, Col, Row} from 'react-grid-system'
import {FiBox} from 'react-icons/fi'
import Menu from '../Menu'
import api from '../../services/api'

interface Estoques{
  id:number;
  name:string;
  type:string;
}
const CreateProduto = () => {

  const [estoques,setEstoques] = useState<Estoques[]>([])
  const [selectedEstoque,setSelectedEstoque] = useState('0')
  const [formData, setFormData] = useState({
    name: '',
    expires: '',
    quantity: '',
    estoque: selectedEstoque,
  })
  const history = useHistory()

  useEffect(()=>{
    api.get('/estoques').then(response=>{
      setEstoques(response.data)
    })
  })


  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({...formData,[name]:value})
  }

  function handleSelectedEstoque(event:ChangeEvent<HTMLSelectElement>){
    const estoque = event.target.value
    setSelectedEstoque(estoque)
  }

  async function handleSubmit(event:FormEvent) {
    event.preventDefault()
    const { name, expires, quantity} = formData
    const data = {
      name,
      expires,
      quantity,
      estoque:selectedEstoque
    }
    await api.post('produtos',data)
    alert("Produto criado")
    history.push('/estoques')
  }
  
  return(
    <Container id="page-create-produtos">
      <Row className="main-row">
        <Col md={2}>
          <Menu></Menu>
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <Row>
              <Col className="titulo-pagina">
                <h1><FiBox></FiBox>Adicionar produto</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <form className="form-padrao" onSubmit={handleSubmit}> 
                  <div className="field">
                    <label htmlFor="name">Nome</label>
                    <div className="input-box">
                      <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="expires">Validade</label>
                    <div className="input-box">
                      <input type="text" name="expires" id="expires" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="quantity">Quantidade</label>
                    <div className="input-box">
                      <input type="text" name="quantity" id="quantity" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="type">Estoque</label>
                    <select name="type" id="type" value={selectedEstoque} onChange={handleSelectedEstoque}>
                      <option value="0">Selecione um estoque</option>
                      {estoques.map(estoque=>(
                        <option key={estoque.id} value={estoque.id}>{estoque.name} ({estoque.type})</option>
                      ))}
                    </select>
                  </div>
                  <div className="submit-button">
                    <button type="submit" className="button-roxo">Salvar</button>
                  </div>  
                </form>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateProduto