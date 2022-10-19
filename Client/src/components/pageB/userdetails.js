import React from 'react'
import ReactDOM from 'react-dom'

import 'react-dates/lib/css/_datepicker.css';
import Axios from 'axios';

class UserDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Fname: "",
            Lname: "",
            mail: "",
            number: 0,
            address: "",
            gender: "",
            auth: 0,
            dob:undefined

           
        }
    }

    onFNameChange = (e) => {
        e.preventDefault();
        this.state.Fname = e.target.value
        console.log(this.state.Fname)
    }

    onLNameChange = (e) => {
        e.preventDefault();
        this.state.Lname = e.target.value
        console.log(this.state.Lname)
    }

    onMailChange = (e) => {
        this.state.mail = e.target.value
        console.log(this.state.mail)
    }

    onNumChange = (e) => {
        e.preventDefault();
        this.state.number = e.target.value
        console.log(this.state.number)
    }

    onAddressChange = (e) => {
        e.preventDefault();
        this.state.address = e.target.value
        console.log(this.state.address)
    }
    handleUsersex = (e) => {
        e.preventDefault();
        this.state.gender = e.target.value;
        console.log(this.state.gender)
    }
    handleUserauth = (e) => {
        e.preventDefault();
        this.state.auth = e.target.value
        console.log(this.state.auth)
    }
    onDateChange = (e) => {
        e.preventDefault();
        this.state.dob = e.target.value
        console.log(this.state.dob)
        }
    

    handleSubmit= (e) => {
        e.preventDefault();
    
            {
                Axios.post("http://localhost:3001/create", { 
                    Fname: this.state.Fname, 
                    Lname: this.state.Lname, 
                    address:this.state.address,
                    mail:this.state.mail ,
                    number:this.state.number,
                    gender:this.state.gender,
                    dob:this.state.dob,
                    auth:this.state.auth
                    }); 
                    
            }
        

    }
    render() {
        return (
            <div><h4>USER DETAILS</h4>
                <form className="userForm" onSubmit={this.handleSubmit}>

                    <label className="userNlabel">Enter your name:</label>
                    
                        <input type="text" className="userFirst" placeholder="first name" onChange={this.onFNameChange}></input>
                        <input type="text" className="userLast" placeholder="last name" onChange={this.onLNameChange}></input>
                    <br/>
                    <label className="userAlabel">Enter your address:</label>
                    
                        <input type="text" className="userAdd" placeholder="enter your address" onChange={this.onAddressChange}></input>
                    <br/>
                    <label className="userCond">Contact Details:</label>
                    
                        <input type="text" className="userEmail" placeholder="Enter your email address" onChange={this.onMailChange}></input>
                        <input type="number" className="userPhno" maxLength='10' placeholder="Enter your mobile no." onChange={this.onNumChange} />
                    
                    <br/>
                    Sex:
                        <select className="userSex" onChange={this.handleUsersex}>
                            <option value="" disabled selected hidden>choose sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option></select>
                    <br/>
                    DateOfBirth:
                    <input type="date" className="dob" onChange={this.onDateChange}></input>
                    <br/>
                    AADHAR ID:
                        <input type="number" placeholder="enter aadhar id" maxLength='12' onChange={this.handleUserauth} className="userAuth" ></input>
                    
                        <br/>
                       <button className="cpay">CONTINUE PAYMENT</button>
                </form>
                <a href="/paymentdetails">CONTINUE PAYMENT</a>
                <br />
                    <a href="/traveldetails">Go back</a>
                </div>
        
        )
    }
}
export default UserDetails

ReactDOM.render(<UserDetails/>,document.getElementById('app'))
