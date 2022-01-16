import { Component } from "react";
import Order from "./order"
import { Form,Button } from "react-bootstrap";
import "./basket.css"
import Item from "./Item"
import axios from "axios";


class Basket extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,  
            products:[], 
            checkedItems:[],
            countChecked:'',
            checkAll:true,
            display:false,
            empty:true
           
        }
    }
   async componentDidMount(){         // GET API
     var responseData
      window.scrollTo(0, 0)
      let checked = []
      const url = "http://localhost:5232/api/Order/GetOrderedProducts";
      axios.defaults.withCredentials=true;
       await axios.get(url,{
                        headers: {
                          'Content-Type': 'application/json',                        
                        },                    
                    }
                )
                .then(res => {
                         
                    responseData=res.data
              
                })
                .catch(err => {
                    console.log(err);
                })
      if(responseData!="") {
        responseData.products.map((x,key)=>{
          checked.push({id: x.id,checked:true})
                
                })
      if(responseData.products.length!=0)
      {     
      this.setState({
        products:responseData,
        checkedItems: checked,
        countChecked:checked.length,
        loading:false,
        empty:false
      
                })}
                else{this.setState({empty:true,
                loading:false})}
      
     }}

    checkboxChange=(i,checked)=>{
       let updatedChecked = [...this.state.checkedItems]
       let index = this.state.checkedItems.findIndex(x=>x.id===i)
       updatedChecked[index] = {id: i, checked: checked}
       let items = updatedChecked.filter(x=>x.checked === true)
       this.setState({countChecked:items.length,
                      checkedItems: updatedChecked
                      })  
    }
  
  sortProducts=(event)=>{
      
  }

  checkAll = ()=>{
    let checkedAll = [...this.state.checkedItems];
    if(this.state.checkedAll){
      checkedAll.map(x=>x.checked=true)
    }
    else{
      checkedAll.map(x=>x.checked=false)
    }
    let items = checkedAll.filter(x=>x.checked === true)
    this.setState({
      checkedItems: checkedAll,
      checkedAll: !this.state.checkedAll,
      countChecked: items.length
    })
  }

  getTotalPrice=()=>{
    if(this.state.empty){
      return 0
    }
    let price = 0;
    this.state.products.products.filter((y)=>this.state.checkedItems.find(item=>item.id==y.id).checked==true).map((x)=>price += x.price * x.amount)
    return price
  }
  getCheckedItems=()=>{
    if(this.state.empty){
      return []
    }
    var checkedItems = []
    this.state.products.products.map((x)=>{if(this.state.checkedItems.find(y=>y.id === x.id).checked){
      checkedItems.push(x.id)
    }})
    return checkedItems
  }
  setDisplay=(x)=>{
    this.setState({
      display:x
    })
  }
  deleteChecked=()=>{
    var items = this.getCheckedItems();
    const url = "http://localhost:5232/api/Order/DeleteProductsFromBasket";
    axios.defaults.withCredentials=true;
    axios.post(url,items,{
                      headers: {
                        'Content-Type': 'application/json',                        
                      },                    
                  }
              )
              .then(res => {
                 
                  this.props.navigate("/Shop", { replace: true });           
              })
              .catch(err => {
                  console.log(err);
              })
  }
    render(){
    
    return (       
      
      <div>
        <Order navigate={this.props.navigate}  checked = {this.getCheckedItems} trigger={this.state.display}  setTrigger={this.setDisplay}/>
       
        {this.state.loading ? (
            <div>Loading...</div>
        ):
        <div>
          
        <div className="Basket">
          <div className="summary">
             <h2 className="header">Twój koszyk</h2>
             <hr/>
             <div>
               <p><Button onClick={this.checkAll} > Zaznacz/Odznacz wszystko </Button></p>
              Zaznaczone produkty: {this.state.countChecked}
              <p>Cena razem: {this.getTotalPrice()}</p>
              <p><Button disabled = {this.getCheckedItems().length==0} onClick={this.deleteChecked}> Usuń zaznaczone </Button></p>
              <p><Button disabled={this.state.empty} onClick={()=>this.setDisplay(true)}> Zamów </Button></p>
            </div>
          </div>
          <div className="Products"> 
          <h1>Twój koszyk</h1><hr/>
           {this.state.empty?(<div>Your basket is empty!</div>):(<div>
          
            {this.state.products.products.map((val,key) => {
		              return <Item key={key} klucz={key} isChecked = {this.state.checkedItems.find(x=>x.id==val.id).checked} handleChecked={this.checkboxChange} {...val} />})}
          </div>)}</div>
          
       </div></div>}
       
      </div>
    );
  }}
  
  export default Basket;