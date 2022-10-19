import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios';

class Generate extends React.Component {
    state = {
        ticketno: 0,
        trainlist: []
    }
    showTicket = (e) => {
        e.preventDefault();
        var string = '0123456789';
        var len = string.length;
        for (let i = 0; i < 6; i++) {
            this.state.ticketno += string[Math.floor(Math.random() * len)];
        }

        alert(" ticket no is : " + this.state.ticketno);
        Axios.get("http://localhost:3001/ticketlist").then((response) => {
            this.setState({ trainlist: (response.data) })
        });
        alert('ticket generrated')
    }

    render() {
        return (

            <div >

                <h1> Ticket </h1>

                <div>

                    <button className="pddd" onClick={this.showTicket} > Show ticket</button>
                    {this.state.trainlist.map((val, key) => {
                        return <div className="showingllist" key={val.trainno}>
                            <h3>Ticket no :{this.state.ticketno}   </h3>
                            <h3>NAME: {val.Fname}  {val.Lname}</h3>
                            <h3>GENDER: {val.gender}  </h3>
                            <h3>DOB: {val.dob}  </h3>
                            <h3>PH NO: {val.number} </h3>
                            <h3>Train no :{val.trainno}        </h3>
                            <h3>Train Name:{val.name} </h3>
                            <h3>FROM :{val.source}        </h3>
                            <h3>TO :{val.destination}        </h3>
                            <h3>Number of seats:{val.seat} </h3>
                            <h3>DATE:{val.traveldate}            </h3>
                            <h3>DEPARTURE TIME:{val.departure_time}</h3>
                            <h3>PRICE:{val.price * val.seat}</h3>

                        </div>
                    })
                    }
                    <br/><a href="/">GO HOME</a>
                    <br />
                    <a href="/paymentDetails">Go back</a>
                </div>
            </div>
        )
    }
}
export default Generate

ReactDOM.render(<Generate />, document.getElementById('app'))
