import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {Hasil,NavbarComponent , ListCategories, Menus} from "../Components/index.js";
import {API_URL} from "../utils/constant"
import axios from "axios";
import swal from 'sweetalert';


export default class Home extends Component{
  constructor(props){
    super(props)
    this.state={
      menus:[],
      categoriYangDipilih:"Makanan",
      keranjangs:[],
    }
  }
  componentDidMount(){
    axios.get(API_URL+"products?category.nama="+this.state.categoriYangDipilih)
    .then(res=>{
      console.log("response :", res.data)
      const menus = res.data;
      this.setState({menus});      
    })
    .catch(erroe=>{
      console.log("error");
    })
    axios.get(API_URL+"keranjangs")
    .then(res=>{
      console.log("response :", res.data)
      const keranjangs = res.data;
      this.setState({keranjangs});      
    })
    .catch(erroe=>{
      console.log("error");
    })

  }
  componentDidUpdate(prevState){
    if(this.state.keranjangs!== prevState.keranjangs){
      axios.get(API_URL+"keranjangs")
      .then(res=>{
        console.log("response :", res.data)
        const keranjangs = res.data;
        this.setState({keranjangs});      
      })
      .catch(erroe=>{
        console.log("error");
      })
    }
    
  }
  changeCategory=(value)=>{
    this.setState({categoriYangDipilih:value,
      menus:[]
    })
    axios.get(API_URL+"products?category.nama="+value)
    .then(res=>{
      console.log("response :", res.data)
      const menus = res.data;
      this.setState({menus});      
    })
    .catch(erroe=>{
      console.log("error");
    })
    
  }
  masukKeranjang=(value)=>{

    axios.get(API_URL+"keranjangs?product.id="+value.id)
    .then(res=>{
      if(res.data.length=== 0){
        const keranjang={
          jumlah:1,
          total_harga: value.harga,
          product:value 
        }
        axios.post(API_URL+"keranjangs", keranjang)
        .then(res=>{
          swal({
            title: "Sukses Masuk Keranjang!",
            text: "Sukses Masuk Keranjang!"+keranjang.product.nama,
            icon: "success",
            button: false,
            timer: 1000,
          });     
        })
        .catch(erroe=>{
          console.log("error");
        })
      } else{
        const keranjang={
          jumlah:res.data[0].jumlah+1,
          total_harga: res.data[0].total_harga+value.harga,
          product:value 
        }
        axios.put(API_URL+"keranjangs/"+res.data[0].id,keranjang)
        .then(res=>{
          if(res.data.length=== 0){
            const keranjang={
              jumlah:1,
              total_harga: value.harga,
              product:value 
            }
            axios.post(API_URL+"keranjangs", keranjang)
            .then(res=>{
              swal({
                title: "Sukeses Masuk Keranjang!",
                text: "Sukeses Masuk Keranjang!"+keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });     
            })
            .catch(error=>{
              console.log("error");
            })
        
          }
        })
        .catch(error=>{
          console.log("error");
        })
      }
    })
    
  }  
  render(){
  
    const {menus, categoriYangDipilih, keranjangs}=this.state

    return (
     
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
            <Col>
              <h4><strong>Daftar Produk</strong></h4>
              <hr/>
              <Row className="overflow-auto menu">
                {menus && menus.map((menu)=>(
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                )

                )}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props}/>
          </Row>
        </Container>
      </div>
     
    );
  }
}

