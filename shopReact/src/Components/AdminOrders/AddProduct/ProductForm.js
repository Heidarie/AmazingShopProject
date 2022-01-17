import { Component } from "react";
import { Form,Button } from "react-bootstrap";
import "./ProductForm.css"
import axios from "axios";

 class ProductForm extends Component{
        constructor(props){
            super(props);
            this.state={
                products:[],
                categories:[],
                type:'New',
                productId:'',
                categoryId:'',
                amount: '',
                name:'',
                description:'',
                price:'',
                photo:null,
            }
        }
       async componentDidMount(){
        var prod=[]
        var cate=[]
        var error = false    
        const url = "http://localhost:5232/api/Product/GetProductsNamesList";         // GET API
          await axios.get(url,{
            headers: {
              'Content-Type': 'application/json',                        
            },                    
        }
    )
    .then(res => {      
        prod=res.data
    })
    .catch(err => {
        console.log(err);
        error = true
    })
const urlCat = "http://localhost:5232/api/Product/GetCategories";
await axios.get(urlCat,{
            headers: {
              'Content-Type': 'application/json',                        
            },                    
        }
    )
    .then(res => {
        cate = res.data
    })
    .catch(err => {
        console.log(err);
        error = true
    })      

if(!error){
  this.setState({
    products:prod,
    categories: cate
        })
      }      

      
    }
     validateForm() { 
      return true
    }
  
     handleSubmit(event) {
    
      event.preventDefault();
      if(this.state.type=="New"){
        const url = "http://localhost:5232/api/Product/AddProduct";
    
        const formData = new FormData()
        formData.append('name',this.state.name)
        formData.append('price',this.state.price)
        formData.append('description',this.state.description)
        formData.append('stockAmount',this.state.amount)
        formData.append('category',this.state.categoryId)
        formData.append('file',this.state.photo)
        axios.defaults.withCredentials=true;
        axios.post(url,formData,{
                          headers: {
                            'Content-Type': 'multipart/form-data',                        
                          },                    
                      }
                  )
                  .then(res => {
                      this.props.navigate("/",{replace:true})         
                  })
                  .catch(err => {
                      console.log(err);
                  })




      }else{
        const url = "http://localhost:5232/api/Product/AddProductAmount?id="+this.state.productId+"&amount="+this.state.amount;
                axios.defaults.withCredentials=true;
                axios.post(url,{
                                  headers: {
                                    'Content-Type': 'application/json',                        
                                  },                        
                              }
                          )
                          .then(res => {
                              this.props.navigate("/",{replace:true})        
      
                          })
                          .catch(err => {
                              console.log(err);
                          })
      }
    }


    
    handleChange = (e) => {
        this.setState({...this.state,
             [e.target.id]: e.target.value });
             
             
      }
      handleChangePhoto = (event) => {
          this.setState({
            photo: event.target.files[0]
          })
    }

  render(){
    return (
      <div className="ProductBox">
      <div className="ProductForm">
        <h2>Dodaj przedmiot/stan magazynu</h2>
          <Form.Group>
            <Form.Label>Typ przedmiotu</Form.Label>
        <Form.Select id="type" onChange={this.handleChange.bind(this)}>
          <option value="New">Nowy</option>
          <option value="Exsisting">Istniejący</option>
        </Form.Select>
        </Form.Group>
        <Form onSubmit={this.handleSubmit.bind(this)}>
        {(this.state.type==="New")?(
          <>
        
           <Form.Group size="lg" >
            <Form.Label>Nazwa</Form.Label>
            <Form.Control
              id="name"
              required
              type="text"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Opis</Form.Label>
            <Form.Control
            required
              id="description"
              type="text"
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Price</Form.Label>
            <Form.Control
            required
              id="price"
              type="number"
              min="1"
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group size="lg" >
                <Form.Label>Ilość</Form.Label>
                <Form.Control
                  required
                  id="amount"
                  type="number"
                  min="1"
                  onChange={this.handleChange.bind(this)}
                />
            </Form.Group>
            <Form.Group size="lg" >
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  required
                  id="photo"
                  type="file"
                  required accept=".jpg"
                  onChange={this.handleChangePhoto.bind(this)}
                />
            </Form.Group>
              <Form.Group size="lg" >
                <Form.Label>Kategoria</Form.Label>
                <Form.Control
                  required
                  id="categoryId"
                  type="text"
                  list="optionsList"
                  onChange={this.handleChange.bind(this)}
                />
                  <datalist id="optionsList" >
                  {this.state.categories.map((x,i)=><option key={i} value={x.name}>{x.name}</option>)}
                  </datalist>
                </Form.Group>
                <Button  size="lg" className="submit" type="submit">
                      Dodaj
                  </Button>
               
                </>)
          
          
          
          :(
            <div>
              <Form.Label>Wybierz produkt</Form.Label>
              <Form.Select id="productId" onChange={this.handleChange.bind(this)}>
                <option>Wybierz produkt</option>
                {this.state.products.map((x)=><option key={x.value} value={x.value}>{x.key}</option>)}
              </Form.Select>
              <Form.Group size="lg" >
                <Form.Label>Ilość</Form.Label>
                <Form.Control
                  id="amount"
                  type="number"
                  min="1"
                  onChange={this.handleChange.bind(this)}
                />
            </Form.Group>
            <Button  size="lg" className="submit" type="submit" >
            Dodaj
          </Button>
            </div>
          )}
          </Form>
          
          
        
      </div></div>
    );
  }}

  export default ProductForm