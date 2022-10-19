import React from 'react'
import ReactDOM from 'react-dom'
import 'react-dates/lib/css/_datepicker.css';
import Axios from 'axios';
class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            cardno: 0,
            validdate: '',
            cardType: undefined,
            cardCvv: 0,
            transactionid: ''
        }
    }

    handleCardno = (e) => {
        e.preventDefault();
        this.state.cardno = e.target.value
        console.log(this.state.cardno)
    }

    handleUsercardtype = (e) => {
        e.preventDefault();

        this.state.cardType = e.target.value;
        console.log(this.state.cardType)

    }

    handleCardcvv = (e) => {
        e.preventDefault();
        this.state.cardCvv = e.target.value;
        console.log(this.state.cardCvv)

    }
    handleSubmit = (e) => {
        e.preventDefault();
        var string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var len = string.length;
        for (let i = 0; i < 12; i++) {
            this.state.transactionid += string[Math.floor(Math.random() * len)];
        }

        alert(" Transaction ID is : " + this.state.transactionid+"  payment sucessfull");

        Axios.post("http://localhost:3001/paymentdetails", {
            transactionid:this.state.transactionid,
            cardno: this.state.cardno,
            cardType: this.state.cardType,
            validdate: this.state.validdate,
            cardCvv: this.state.cardCvv,
            
        });


    }
    handleCardvaliddate=(e)=>{
        e.preventDefault();
        this.state.validdate = e.target.value;
        console.log(this.state.validdate)
    }
    render() {
        return (
            <div><h4>PAYMENT</h4>
                <form className="payform" onSubmit={this.handleSubmit}>

                    ENTER CARD DETAILS:
                <input type="text" className="ccFormatMonitor" placeholder="Card Number" maxLength='16' onChange={this.handleCardno} />
                    <br /> choose card type:
                <select className="userCtype" onChange={this.handleUsercardtype}>
                        <option value="" disabled selected hidden>choose card type</option>
                        <option value="VISA">VISA</option>
                        <option value="RUPAY">RUPAY</option>
                        <option value="Others">Others</option></select>
                    <br />Valid Date:
            <input
                        type="text"
                        id="inputExpDate"
                        placeholder="MM / YY"
                        maxLength='5' onChange={this.handleCardvaliddate} className="cardvalid" />

                    <br />
         Enter CVV Number:
            <input type="password" className="cvv" placeholder="CVV" maxLength='3' onChange={this.handleCardcvv} />

                    <br /> <button className="gtic">GENERATE TICKET</button>
                </form>
                <a href="/confirmpage">GET TICKET</a>
                <br />
                    <a href="/userdetails">Go back</a>
            </div>
        )
    }
}

export default Payment

ReactDOM.render(<Payment />,document.getElementById('app'))
