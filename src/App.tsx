import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import Edit_product from './components/products/Edit_product';
import Create_product from './components/products/Create_product';
import Edit_order from './components/ordershome/orders/Edit_order';
import ListOfOrders from './components/ordershome/ListOfOrders';
import Create_order_by_admin from './components/ordershome/orders/Create_order_by_admin';

class App extends React.Component<RouteComponentProps<any>> {
 public render() {
   return (
     <div>
       <br />
       <nav>
         <ul>
           <li>
             <Link to={'/'}> Home </Link>
           </li>

           <li>
             <Link to={'/create'}> Create Product </Link>
           </li>

           <li>
             <Link to={'/orders'}> List of Orders </Link>
           </li>           
         </ul>
       </nav>
       
       <Switch>
         <Route path={'/'} exact component={Home} />
         <Route path={'/create'} exact component={Create_product} />
         <Route path={'/edit:id'} exact component={Edit_product} />
         <Route path={'/orders'} exact component={ListOfOrders} />
         <Route path={'/orders/edit:id'} exact component={Edit_order} />
         <Route path={'/orders/create'} exact component={Create_order_by_admin} />
       </Switch>
     </div>
   );
 }
}
export default withRouter(App)
