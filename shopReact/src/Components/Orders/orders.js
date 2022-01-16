import { Component } from "react";
import "./orders.css"
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
        {this.state.loading ? (
            <div>Loading...</div>
        ):
        <div className="Shop">
          <div className="Items">
            <h2 className="center">Twoje zamówienia</h2><hr/>
            {this.state.orders.length==0?<p>You have no order history</p>:<div>
            {this.state.orders.map((val,key) => {
		              return <Order key={key} klucz={key} {...val} />})}
       </div> }
          </div>
          
       </div>}
       
      </div>
    );
  }}
  
  export default Orders;