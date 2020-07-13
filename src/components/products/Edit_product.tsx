import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
   [key: string]: any;
}

export interface IFormState {
   id: number,
   product: any;
   values: IValues[];
   submitSuccess: boolean;
   loading: boolean;
}

class Edit_product extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            product: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/products/${this.state.id}`).then(res => {
            this.setState({ product: res.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/products/${this.state.id}`, this.state.values).then(res => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.product &&
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit Product </h2>
                            <br />

                            {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    Product's details have been edited successfully!
                                </div>
                            )}

                            <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                <div className="form-group col-md-12">
                                    <label htmlFor="product_name"> Product Name </label>
                                    <input type="text" id="product_name" defaultValue={this.state.product.product_name} onChange={(e) => this.handleInputChanges(e)} name="product_name" className="form-control" placeholder="Enter product's name" />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="unit_price"> Unit Price ($) </label>
                                    <input type="number" id="unit_price" defaultValue={this.state.product.unit_price} onChange={(e) => this.handleInputChanges(e)} name="unit_price" className="form-control" placeholder="Enter product's unit price" />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="quantity"> Quantity </label>
                                    <input type="number" id="quantity" defaultValue={this.state.product.quantity} onChange={(e) => this.handleInputChanges(e)} name="quantity" className="form-control" placeholder="Enter product's quantity" />
                                </div>

                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit">
                                        Update Product </button>
                                    {loading &&
                                        <span className="fa fa-circle-o-notch fa-spin" />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        )
    }


}
 export default Edit_product
 