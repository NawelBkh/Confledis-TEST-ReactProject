import * as React from 'react';
import 'C:/Users/DELL/my-app/src/App.css';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';


interface IState {
    orders: any[];
}


export default class ListOfOrders extends React.Component<RouteComponentProps, IState> {
   constructor(props: RouteComponentProps) {
       super(props);
       this.state = { orders: []}
   }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/orders`).then(res => {
            this.setState({ orders: res.data })
        })
    }
   
    public Delete_order(id: number) {
        axios.delete(`http://localhost:5000/orders/${id}`).then(data => {
            const index = this.state.orders.findIndex(order => order.id === id);
            this.state.orders.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const orders = this.state.orders;
        return (
            <div>
                <div>
                    {orders.length === 0 && (
                        <div className="text-center">
                            <br />
                            <br />
                            <h2> There is NO Order for now! </h2>
                        </div>
                    )}
 
                    <div className="container">
                        <div className="row">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Order Date</th>
                                        <th scope="col">Total order Price ($)</th>
                                        <th scope="col">Amount PER Order Line</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.map(order =>
                                        <tr key={order.id}>
                                            <td>{order.order_date}</td>
                                            <td>{order.total_order_price}</td>
                                            <td>{order.amount_per_order_line}</td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                        <Link to={`edit/${order.id}`} className="btn btn-sm btn-outline-secondary"> Edit Product </Link>
                                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => this.Delete_order(order.id)}> Delete Order </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <br />                            
                <ul>
                    <li>
                        <Link to={'/orders/create'}> Order NOW! </Link>
                    </li>           
                </ul>

            </div>    
        )
    }
}