import { Component } from "react";
import "./orders.css"
import OrderTest from "../../Test_jsons/Orders.json"
import Order from "./Order"
import axios from "axios";


class Orders extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,  //zmienić na true
            orders:[], //test
        }
    }
      async componentDidMount(){         // GET API
      const url = "http://localhost:5232/api/Order/GetOrderHistory";
      axios.defaults.withCredentials=true;
       await axios.get(url,{
                        headers: {
                          'Content-Type': 'application/json',                        
                        },                    
                    }
                )
                .then(res => {
                    console.log(`Success`);           
                    this.setState({
                      orders:res.data,
                      loading: false
                    })
              
                })
                .catch(err => {
                    console.log(err);
                })

     }      
    render(){
    return (       
      <div>
        <h1>This is the Orders page</h1>
        {this.state.loading ? (
            <div>Loading...</div>
        ):
        <div className="Shop">
          <div className="Items"> 
            {this.state.orders.map((val,key) => {
		              return <Order key={key} klucz={key} {...val} />})}
       
          </div>
          
       </div>}
       
      </div>
    );
  }}
  
  export default Orders;