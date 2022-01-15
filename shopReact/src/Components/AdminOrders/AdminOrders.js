import { Component } from "react";
import "./adminOrders.css"
import OrderTest from "../../Test_jsons/Orders.json"
import AdminOrder from "./AdminOrder"
import axios from "axios";


class AdminOrders extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,  //zmienić na true
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
                    console.log(`Success` + res.data+"asdddddddddd");           
                    this.setState({
                      orders:res.data
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
		              return <AdminOrder key={key} klucz={key} {...val} />})}
       
          </div>
          
       </div>}
       
      </div>
    );
  }}
  
  export default AdminOrders;