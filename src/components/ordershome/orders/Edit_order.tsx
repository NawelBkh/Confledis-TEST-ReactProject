import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
   [key: string]: any;
}

export interface IFormState {
   id: number,
   order: any;
   values: IValues[];
   submitSuccess: boolean;
   loading: boolean;
}

class Edit_order extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            order: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/orders/${this.state.id}`).then(res => {
            this.setState({ order: res.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/orders/${this.state.id}`, this.state.values).then(res => {
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
                {this.state.order &&
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit Order </h2>
                            <br />

                            {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    Order's details have been edited successfully!
                                </div>
                            )}

                            <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                <div className="form-group col-md-12">
                                    <label htmlFor="order_date"> Order Date </label>
                                    <input type="date" id="order_date" defaultValue={this.state.order.order_date} onChange={(e) => this.handleInputChanges(e)} name="order_date" className="form-control" placeholder="Enter order's date" />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="total_order_price"> Total order Price ($) </label>
                                    <input type="number" id="total_order_price" defaultValue={this.state.order.total_order_price} onChange={(e) => this.handleInputChanges(e)} name="total_order_price" className="form-control" placeholder="Enter order's total price" />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="amount_per_order_line"> Amount PER Order Line ($) </label>
                                    <input type="number" id="amount_per_order_line" defaultValue={this.state.order.amount_per_order_line} onChange={(e) => this.handleInputChanges(e)} name="amount_per_order_line" className="form-control" placeholder="Enter amount per order line" />
                                </div>

                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit">
                                        Update Order </button>
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
 export default Edit_order
 