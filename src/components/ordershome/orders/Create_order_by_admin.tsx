import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


interface IState {
    orders: any[];
}

class Create_order_by_admin extends React.Component<RouteComponentProps, IState> {


    public render() {

        return (
            <div className="text-center">
            <br />
            <br />
                <h2> Order is allowed for customer ONLY! </h2>
            </div>
        )    
    }
}
export default Create_order_by_admin

/* Assuming there is another actor: the user who do orders (out of the test scope). In this case the admin could only delete the order or edit it after an agreement with the customer permission */