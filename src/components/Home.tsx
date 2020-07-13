import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
   products: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
   constructor(props: RouteComponentProps) {
       super(props);
       this.state = { products: [] }
   }
   public componentDidMount(): void {
       axios.get(`http://localhost:5000/products`).then(res => {
           this.setState({ products: res.data })
       })

   }
   public Delete_product(id: number) {
       axios.delete(`http://localhost:5000/products/${id}`).then(data => {
           const index = this.state.products.findIndex(product => product.id === id);
           this.state.products.splice(index, 1);
           this.props.history.push('/');
       })
   }

   public render() {
       const products = this.state.products;
       return (
        <div>
            {products.length === 0 && (
                <div className="text-center">
                    <br />
                    <br />
                    <h2> There is NO product for now! </h2>
                </div>
            )}

            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map(product =>
                                <tr key={product.id}>
                                    <td>{product.product_name}</td>
                                    <td>{product.unit_price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                <Link to={`edit/${product.id}`} className="btn btn-sm btn-outline-secondary"> Edit Product </Link>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => this.Delete_product(product.id)}> Delete Product </button>
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
      )
    }
}
