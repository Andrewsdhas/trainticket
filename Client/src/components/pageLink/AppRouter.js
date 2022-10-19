import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import App from '../page1/welcome'
import Page1 from '../pageA/travaldetails'
import UserDetails from '../pageB/userdetails'
import Payment from '../pageC/paymentdetails'
import ConfirmPage from '../pageD/ticketdetails'


const AppRouter = () => (
    <BrowserRouter>
        <div className="routes">
            <Switch>
                <Route path='/' component={App} exact={true} />
                <Route path='/traveldetails' component={Page1} />
                <Route path='/userdetails' component={UserDetails} />
                <Route path='/paymentdetails' component={Payment} />
                <Route path='/confirmpage' component={ConfirmPage} />
            </Switch>

        </div>
    </BrowserRouter>
)
export default AppRouter


// import entirePage from '../page1/entirePage'
// import location from '../pageA/location'
// import cabDetails from '../pageB/cabDetails'
// import userDetails from "../pageC/userDetails";
// <Header />
// const AppRouter =()=>(
//     <BrowserRouter>
//         <div>
//             <Header />
//             <Switch>
                // <Route path='/' component={entirePage} exact={true} />
//                 <Route path='/Dashboard' component={location} />
//                 <Route path='/' component={cabDetails} />
//                 <Route path='/help' component={userDetails} />
//                 <Route component={notFoundPage} />
//             </Switch>
//         </div>
//     </BrowserRouter>
// );

//export default AppRouter;