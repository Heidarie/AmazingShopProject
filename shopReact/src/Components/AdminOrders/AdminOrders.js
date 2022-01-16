import { Component } from "react";
import "./adminOrders.css"
import AdminOrder from "./AdminOrder"
import axios from "axios";


class AdminOrders extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,  //zmienić na true
            orders:[], //test
        }
    }
    async componentDidMount(){         // GET API
      const url = "http://localhost:5232/api/Order/GetAllOrderedProducts";
      axios.defaults.withCredentials=true;
      await axios.get(url,{
                        headers: {
                          'Content-Type': 'application/json',                        
                        },                    
                    }
                )
                .then(res => {
                     
                    this.setState({
                    
                      orders:res.data,
                      loading:false
                    })
              
                })
                .catch(err => {
                    console.log(err);
                })

     }
    forceReload=()=>{
     this.componentDidMount()
    }
    
    render(){
    return (       
      <div>
        
        {this.state.loading ? (
            <div>You are not admin!</div>
        ):
        <div className="Shop">
          
          <div className="Items"> 
          <h1>Wszystkie zamówienia</h1>
          <hr/>
            {this.state.orders.map((val,key) => {
		              return <AdminOrder forceReload ={this.forceReload} key={key} klucz={key} {...val} />})}
       
          </div>
          
       </div>}
       
      </div>
    );
  }}
  
  export default AdminOrders;