import { Component } from "react";
import "./shop.css"
import Product from "./Components/shopComponents/Product"
import { Pagination,Form } from "react-bootstrap";
import axios from "axios";

class Shop extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,  //zmienić na true
            products:[], //test
            page:1,
            Categories:[],
            category:""
        }
    }
   async componentDidMount(){// GET API
     var prod=[]
     var cate=[]
     var error = false    
     const url = "http://localhost:5232/api/Product/Products";
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
        if(this.props.page){
            this.setState({
              page:this.props.page,
              products:prod,
              Categories: cate
              })}    
        else{
              this.setState({
                products:prod,
                Categories: cate
                    })
                  }      
      window.scrollTo(0, 0)
                }
    else{
      console.log("Unexpected error")
    }
      
     }
     componentDidUpdate(){
      window.scrollTo(0, 0)
      if((this.props.page!== this.state.page)&&(this.props.page)){
          this.setState({
            page:this.props.page
          })
      }
  }

  async getProducts(categoryId){
    const url = "http://localhost:5232/api/Product/GetSelectedCategoryProduct";
    await axios.get(url,{
      headers: {
        'Content-Type': 'application/json',                        
      },
      params:{
        categoryId:categoryId
      }                 
  }
          )
          .then(res => {
            this.setState({
              products:res.data
            })
          })
          .catch(err => {
            console.log(err);
          })
     this.setState({
       category:categoryId
     })
    }
  
 async sortProducts(event){
    if(event.target.value===""){
    const url = "http://localhost:5232/api/Product/Products";
     await axios.get(url,{
                        headers: {
                          'Content-Type': 'application/json',                        
                        },
                        params:{
                          categoryId:this.state.category
                        }                   
                    }
                )
                .then(res => {
                  
                    this.setState({
                      products:res.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
    }
    else{
    const url2 = "http://localhost:5232/api/Product/SortProducts?sort="+event.target.value+"&categoryId="+this.state.category;
    await axios.get(url2,{
      headers: {
        'Content-Type': 'application/json',                        
      },                   
  }
          )
          .then(res => {
            this.setState({
              products:res.data
            })
          })
          .catch(err => {
            console.log(err);
          })
    }}
    
  

    listPages = (pages)=>{
      var list=[];

      for(let i=1;i<=pages;i++){
        list.push(<Pagination.Item  onClick={()=>this.setPage(i)} active={i == this.state.page}>
          {i}
        </Pagination.Item>,);}
        return list}

    setPage=(i)=>{
          this.setState({page:i})
          this.props.changePage("/Shop/"+i,{replace:true})
    }

    render(){
    return (       
      <div>
        {this.state.loading ? (
            <div>Loading...</div>
        ):
        <div className="Shop">
          <div className="sidePanel">
             <div className="sort"><h2 className="categoryHead">Sort:</h2>
              <Form.Select onChange={this.sortProducts.bind(this)}>
                <option value="">Sortuj</option>
                <option value="0">Cena od najniższej</option>
                <option value="1">Cena od najwyższej</option>
              </Form.Select>
             </div>
             <div>
              <h2 className="categoryHead">Kategorie:</h2>
              {this.state.Categories.map((val,key)=>{
               return <p className="category" key={key} >
                 <span onClick={()=>this.getProducts(val.id)} className="categoryName">{val.name}</span>
                 <span className="amount">{val.amount}</span></p>
             })} 
             </div>
             </div>
          <div className="Products"> 
            {this.state.products.map((val,i) => {
		              return <Product key={i} isAuth={this.props.isAuth} {...val} />})}
          </div>
          
       </div>}
       
      </div>
    );
  }}
  
  export default Shop;