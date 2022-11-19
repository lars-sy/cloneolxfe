import React, { useState, useEffect, useRef } from "react";
import { PageArea } from "./styled";
import { useParams } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { PageContainer, PageTitle } from "../../components/MainComponents";
import useApi from "../../helpers/OlxAPI";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Page = () => {
  const api = useApi();
  const fileField = useRef();

  const [adInfos, setAdInfos] = useState({});

  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [adsList, setAdsList] = useState([]);


  // Formulario USER
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [state, setStateLoc] = useState([]);
  const [stateUser, setStateUser] = useState("");
  const [stateUserEn, setStateUserEn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Formulario AD
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  // MODAL
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState([false, false]);
  const { id } = useParams();

  function openModal(id) {
    const array = modalIsOpen;
    array[id] = true;

    setIsOpen([...array]);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal(id) {
    const array = modalIsOpen;
    array[id] = false;
    setIsOpen([...array]);
  }
  // FIM MODAL

  //AD
  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      setAdInfos(json);
    }
    getAdInfo(id);
  }, [])

  //USER
  useEffect(() => {
    const getUsers = async () => {
      const json = await api.getUser();
      setAdsList(json.ads);
      setUser(json);
      setNameUser(json.name)
      setEmailUser(json.email)

    }
    getUsers()
  }, [])

  //ESTADO
  useEffect(() => {
    const getState = async () => {
      const json = await api.getState();
      setStateLoc(json);
    }
    getState()
  }, [])

  useEffect(() => {
    const getState = async () => {
      const json = await api.getState();
      setStateLoc(json);
    }
    getState()
  }, [])

  useEffect(() => {
    if (user) {
      state.map(function (i) {
        if (i.name === user.stateLoc) {
          setStateUser(i.id);
        }
      })
    }
  }, [user])

  return (
    <PageContainer>
      <PageTitle TextAlign={'center'} Margin={10 + 'px ' + 0}>Minha Conta</PageTitle>
      <PageArea>
          <div className="all">
            <div className="box">

              <div className="adUser">
                  <div className="box box--padding" onClick={() => {openModal(1)}} style={{cursor: 'pointer'}}>
                      <img src={adInfos.images || "http://www.themusicman.uk/wp-content/uploads/2021/09/piano2.jpg"} alt="profile" />
                      <p style={{marginTop: 10}}><b>{adInfos.title || "Vende-se piano"}</b></p>
                      <p>R$: {adInfos.price || "1.500,00"}</p>
                  </div>
                  <Modal
                        isOpen={modalIsOpen[1]}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={() => {closeModal(1)}}
                        style={customStyles}
                        contentLabel="modal"                    
                    >
                      <form style={{display: 'flex', flexDirection: 'column'}}>
                          
                          <label className="area" style={{ marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Titulo</div>
                            <div className="area--input">
                              <input type="text"
                                value={title || "Titulo AD TESTE"}
                                required
                                onChange={e => setTitle(e.target.value)}
                                disabled={disabled}
                              />
                            </div>
                          </label>

                          <label className="area areaSelectBox" style={{marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Categoria</div>
                            <div className="area--input">
                              <select disabled={disabled} value={category} onChange={e => setCategory(e.target.value)} required>
                                <option>TESTE</option>
                                {state.map((i, k) =>
                                  <option key={k} value={i.id}>{i.name}</option>
                                )}
                              </select>

                            </div>
                          </label>

                          <label className="area" style={{ marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Preço</div>
                            <div className="area--input">
                              <input type="number"
                                placeholder="R$ "
                                value={price || '00,00'}
                                required
                                onChange={e => setPrice(e.target.value)}
                                disabled={disabled}
                              />
                            </div>
                          </label>

                          <label className="area" style={{ marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Preço Negociavel</div>
                            <div className="area--input">
                              <input type="checkbox"
                                checked={priceNegotiable}
                                onChange={e => setPriceNegotiable(e.target.value)}
                                disabled={disabled}
                              />
                            </div>
                          </label>

                          <label className="area" style={{ marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Descrição</div>
                            <div className="area--input">
                              <textarea type="text"
                                value={description || 'Descrição TESTE'}
                                required
                                onChange={e => setDescription(e.target.value)}
                                disabled={disabled}
                              >
                              </textarea>
                            </div>
                          </label>

                          <label className="area" style={{ marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Imagem</div>
                            <div className="area--input">
                              <input type="file"
                                required
                                onChange={e => setImages(e.target.value)}
                                disabled={disabled}
                              />
                            </div>
                          </label>

                          <button style={{
                            marginBottom: 5,
                            width: '100%',
                            padding: 5,
                            border: 'none',
                            backgroundColor: '#04AA6D',
                            cursor: 'pointer',
                            fontSize: 16,
                            color: 'white'
                            }} type="submit">
                              Alterar cadastro
                          </button>
                        </form>
                    </Modal>
              </div>
              <div className="perfilInfo">
                
                  <img src="https://tinybop.com/img/loves/pingu/pingu-hero.jpg" alt="profile" />
                
                  <p>{user && user.name || "Nome TESTE"
                  }</p>
                  
                 
                        <p className="p1">E-mail</p>
                    
                        <p>{user && user.email || "larissy@gmail.com"}</p>

                        <p>Estado</p>
                        <p>{user && user.stateLoc || "Estado SP"}</p>
   
                  
                  <div className="editButton">
                      <button onClick={() => {openModal(0)}}>Editar</button>
                      <Modal
                        isOpen={modalIsOpen[0]}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={() => {closeModal(0)}}
                        style={customStyles}
                        contentLabel="Example Modal"                    
                      >
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                          
                          <label className="area" style={{ marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Nome</div>
                            <div className="area--input">
                              <input type="text"
                                value={nameUser || "Nome: Larissy"}
                                required
                                onChange={e => setNameUser(e.target.value)}
                                disabled={disabled}
                              />
                            </div>
                          </label>

                          <label className="area" style={{marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Email</div>
                            <div className="area--input">
                              <input type="email"
                                value={emailUser || "larissy@gmail.com"}
                                required
                                onChange={e => setEmailUser(e.target.value)}
                                disabled={disabled}
                              />
                            </div>
                          </label>

                          <label className="area areaSelectBox" style={{marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Estado</div>
                            <div className="area--input">
                              <select disabled={disabled} value={stateUser} onChange={e => setStateUser(e.target.value)} required>
                                <option>Estado TESTE</option>
                                {state.map((i, k) =>
                                  <option key={k} value={i.id}>{i.name}</option>
                                )}
                              </select>

                            </div>
                          </label>
                          
                          
                          <label className="area" style={{marginBottom: 15}}>
                            <div className="area--title" style={{marginBottom: 5}}>Nova senha :</div>
                            <div className="area--input">

                              <input type="password"
                                value={password || ""}
                                // required
                                onChange={e => setPassword(e.target.value)}
                                disabled={disabled}
                              />
                              <br />
                              <span style={{color: 'red'}}><b>Caso não informe, a senha continuará a mesma.</b></span>
                            </div>
                          </label>

                          <button style={{
                            marginBottom: 5,
                            width: '100%',
                            padding: 5,
                            border: 'none',
                            backgroundColor: '#04AA6D',
                            cursor: 'pointer',
                            fontSize: 16,
                            color: 'white'
                            }} type="submit">
                              Alterar cadastro
                          </button>
                        </form>
                      </Modal>
                  </div>
              </div>
            </div>
          </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;