import React, {useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Container, Col, Row} from 'react-grid-system'
import './estoques.css'
import {FiBox} from 'react-icons/fi'
import Menu from '../Menu'
import api from '../../services/api'

interface TiposEstoque{
  id:number;
  name:string;
}
const CreateEstoque = () => {

  const [tiposEstoque,setTiposEstoque] = useState<TiposEstoque[]>([])
  const [selectedTipoEstoque,setSelectedTipoEstoque] = useState('0')
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  })
  const history = useHistory()

  useEffect(()=>{
    api.get('/tipos-estoques').then(response=>{
      setTiposEstoque(response.data)
    })
  },[])


  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({...formData,[name]:value})
  }

  function handleSelectedTipoEstoque(event:ChangeEvent<HTMLSelectElement>){
    const tipoEstoque = event.target.value
    setSelectedTipoEstoque(tipoEstoque)
  }

  async function handleSubmit(event:FormEvent) {
    event.preventDefault()
    const { name } = formData
    console.log(name,selectedTipoEstoque)
    const data = {
      name,
      type:selectedTipoEstoque
    }
    await api.post('estoques',data)
    alert("estoque criado")
    history.push('/estoques')
  }
  
  return(
<Container id="page-estoques">
      <Row className="main-row">
        <Col md={2}>
          <Menu></Menu>
        </Col>

        <Col className="content-page" md={10}>
          <div className="main-padding">
            <Row>
              <Col className="titulo-pagina">
                <h1><FiBox></FiBox>Adicionar estoque</h1>
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
                    <label htmlFor="type">Tipo</label>
                    <select name="type" id="type" value={selectedTipoEstoque} onChange={handleSelectedTipoEstoque}>
                      <option value="0">Selecione um tipo de estoque</option>
                      {tiposEstoque.map(tipoEstoque=>(
                        <option key={tipoEstoque.id} value={tipoEstoque.id}>{tipoEstoque.name}</option>
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

export default CreateEstoque