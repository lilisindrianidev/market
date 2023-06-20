import React from "react";
import { Badge, Col, Row, Button, Modal, Form } from "react-bootstrap";
import numberWithCommas from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({showModal, handleClose, keranjangDetail, 
  jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga
  ,hapusPesanan}) => {
  if(keranjangDetail){
    return (
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {keranjangDetail.product.nama}
              <strong> (Rp. {numberWithCommas(keranjangDetail.product.harga)})</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total harga
                <strong> Rp. {numberWithCommas(totalHarga)}</strong>
               
              </Form.Label>
             
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah
                <Button varian="primary" size="sm" onClick={()=>kurang()}>
                  <FontAwesomeIcon icon={faMinus}/>
                </Button>
                <strong> {jumlah} </strong>
                <Button varian="primary" size="sm" onClick={()=>tambah()}>
                  <FontAwesomeIcon icon={faPlus}/>
                </Button>
              </Form.Label>
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control 
                as="textarea" rows={3} 
                name="keterangan" 
                placeholder="Contoh: Pedas, Nasi setengah"
                value={keterangan} 
                onChange={(event)=>changeHandler(event)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={()=>hapusPesanan(keranjangDetail.id)}>
              
              <FontAwesomeIcon icon={faTrash}/>Hapus pesanans
            </Button>
           
          </Modal.Footer>
        </Modal>
  
      </div>
    )
  }else{
    return (
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Kosonh
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>kosong</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
  
      </div>
    )
  }
  
}
export default ModalKeranjang;