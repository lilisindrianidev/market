import { Component } from "react";
import { Badge, Col, Row, Card} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import numberWithCommas from "../utils/utils";
import TotalBayar from "./TotalHarga";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import { API_URL } from "../utils/constant";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan:'',
      totalHarga:0
    }
  }
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan:menuKeranjang.keterangan,
      totalHarga:menuKeranjang.total_harga
    })
  }
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  tambah=()=>{
    this.setState({
      jumlah:this.state.jumlah+1,
      totalHarga:this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
    })
  }
  kurang=()=>{
    
      if(this.state.jumlah !==1){
        this.setState({
          jumlah:this.state.jumlah-1,
          totalHarga:this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
        })
        
      }
      
  }
  changeHandler=(event)=>{
    this.setState({
      keterangan:event.target.value
    })
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    this.handleClose()
    const data={
      jumlah:this.state.jumlah,
      total_harga: this.state.totalHarga,
      product:this.state.keranjangDetail.product,
      keterangan:this.state.keterangan
    }
    axios.put(API_URL+"keranjangs/"+this.state.keranjangDetail.id, data)
    .then(res=>{
      swal({
        title: "sukses update pesanan!",
        text: "Sukses update pesanana!"+data.product.nama,
        icon: "success",
        button: false,
        timer: 1500,
      });     
    })
    .catch(erroe=>{
      console.log("error");
    })
  }
  hapusPesanan=(id)=>{
   
    this.handleClose()
    
    axios.delete(API_URL+"keranjangs/"+id)
    .then(res=>{
      swal({
        title: "sukses hapus pesanan!",
        text: "Sukses hapus pesanana!"+this.state.keranjangDetail.product.nama,
        icon: "error",
        button: false,
        timer: 1500,
      });     
    })
    .catch(erroe=>{
      console.log("error");
    })
  }
  render() {

    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4><strong>Hasil</strong></h4>
        <hr />
        {keranjangs.length !== 0 && (
           <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.map((keranjang) => (
             
                <ListGroup.Item key={keranjang.id} onClick={()=>this.handleShow(keranjang)}>
                  <Row >
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success" >
                          {keranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{keranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">Rp. {numberWithCommas(keranjang.total_harga)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
            

              
              ))}
          <ModalKeranjang 
            handleClose={this.handleClose}
            {...this.state} 
            tambah={this.tambah} 
            kurang={this.kurang} 
            changeHandler={this.changeHandler}
            handleSubmit={this.handleSubmit}
            hapusPesanan={this.hapusPesanan}
          />
          </ListGroup>
          </Card>

        )}
        <TotalBayar keranjangs={keranjangs} {...this.props}/>
        
      </Col>
    );
    
  }
}