import React from "react";
import { ModalItemAll } from "./styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

function ModalItem(props) {
  function handleClick(e) {
    e.preventDefault();
    props.setVisibleModal(!props.visibleModal);
  }
  return (
    <ModalItemAll>
      <div className="modal-item">
        <div className="modal-item-header">
          <div className="modal-item-title">
            <div className="modal-item-close" onClick={handleClick}>
              <FontAwesomeIcon icon={faTimesCircle} />
              <i class="fab faAmazon"></i>
            </div>
            <h1>{props.title}</h1>
          </div>
        </div>

        <div className="modal-item-body">
          {props.children}
        </div>

      </div>
    </ModalItemAll>
  );
}

export default ModalItem;