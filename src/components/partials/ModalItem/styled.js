import styled from "styled-components";

export const ModalItemAll = styled.div`
    @keyframes fadeIn {
        from {
            opacity: 0;
            margin-top: -10px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    
  
    .modal-item{
        width: 70%;
        height: 70%;
        background-color: #fff;
        position: relative;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        animation: fadeIn 0.5s; 
        border-radius: 10px;
        .modal-item-header{
            width: 100%;
            height: 50px;
            background-color: #DCDCDC;
            position: relative;
            border-radius: 10px 10px 0 0;
            .modal-item-title{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #ccc;
                box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 10px -5px;
              h1{
                font-size: 25px;
                font-weight: bold;
                font-family: 'Roboto', sans-serif;
              }
            }
            
            .modal-item-close{
                width: 35px;
                height: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                right: 0;
                top: 0;
                color: #000;
                margin: -20px -15px 0 0;
                font-size: 30px;
                cursor: pointer;
                background-color: #fff;
                border-radius: 100%;
            }
          }
          .modal-item-body{
            display: flex;
            height: 100%;
            width: 100%;
            justify-content: center;
            align-items: center;
            // background-color: red;
         
          }
         
       }
       
@media (max-width: 600px) {
  .modal-item{
    width: 80%;
    height: 80%;
  }
  .modal-item-body{
    overflow-y: scroll;
  }
}
`;