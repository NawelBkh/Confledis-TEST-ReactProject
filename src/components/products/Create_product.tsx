import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

export interface IValues {
   product_name: string,
   unit_price: number,
   quantity: number,
}
export interface IFormState {
   [key: string]: any;
   values: IValues[];
   submitSuccess: boolean;
   loading: boolean;
}

class Create_product extends React.Component<RouteComponentProps, IFormState> {
   constructor(props: RouteComponentProps) {
       super(props);
       this.state = {
           product_name: '',
           unit_price: 0,
           quantity: 0,
           values: [],
           loading: false,
           submitSuccess: false,
       }
   }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            product_name: this.state.product_name,
            unit_price: this.state.unit_price,
            quantity: this.state.quantity,
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:5000/products`, formData).then(res => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <br />
                    <h2> Create Product </h2>
                    <br />
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Insert your new product
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Your new product has been successfully added!
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="product_name"> Product Name </label>
                            <input type="text" id="product_name" onChange={(e) => this.handleInputChanges(e)} name="product_name" className="form-control" placeholder="Enter product's name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="unit_price"> Unit Price ($) </label>
                            <input type="number" id="unit_price" onChange={(e) => this.handleInputChanges(e)} name="unit_price" className="form-control" placeholder="Enter product's unit price" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="quantity"> Quantity </label>
                            <input type="number" id="quantity" onChange={(e) => this.handleInputChanges(e)} name="quantity" className="form-control" placeholder="Enter product's quantity" />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Add new product
                            </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
export default Create_product

