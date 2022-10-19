import React from 'react';
import ReactDOM from 'react-dom'

import Axios from 'axios';
class Page1 extends React.Component {
    constructor(props) {
        super(props);
        // this.handleVisible = this.handleVisible.bind(this);
        this.state = {
            pickup: undefined,
            dropoff: undefined,
            createdAt: "",
            seat: 0,
            trainlist: [],
            visible: 1
        }
    }

    handleAddSourceLocation = (e) => {
        e.preventDefault();

        this.state.pickup = e.target.value;
        console.log(this.state.pickup)

    }


    handleAddDestLocation = (e) => {
        e.preventDefault()
        this.state.dropoff = e.target.value;
        console.log(this.state.dropoff)
    }
    onShowdetails = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                visible: !prevState.visible
            }
        })
        if (this.state.pickup === this.state.dropoff)
            alert('destination and source are same!!!')
        else if (!this.state.pickup || !this.state.dropoff)
            alert('source&destination cannot be empty')
        else if (this.state.seat <= 0)
            alert('Number of seat cannot be zero')
        else if (this.state.pickup == "BANGALORE" && this.state.dropoff == "CHENNAI") {
            Axios.get("http://localhost:3001/trainlistbc").then((response) => {
                this.setState({ trainlist: (response.data) })
            });
        }
        else if (this.state.pickup == "BANGALORE" && this.state.dropoff == "DELHI") {
            Axios.get("http://localhost:3001/trainlistbd").then((response) => {
                this.setState({ trainlist: (response.data) })
            });
        }
        else if (this.state.pickup == "CHENNAI" && this.state.dropoff == "BANGALORE") {
            Axios.get("http://localhost:3001/trainlistcb").then((response) => {
                this.setState({ trainlist: (response.data) })
            });
        }
        else if (this.state.pickup == "CHENNAI" && this.state.dropoff == "DELHI") {
            Axios.get("http://localhost:3001/trainlistcd").then((response) => {
                this.setState({ trainlist: (response.data) })
            });
        }
        else if (this.state.pickup == "DELHI" && this.state.dropoff == "CHENNAI") {
            Axios.get("http://localhost:3001/trainlistdc").then((response) => {
                this.setState({ trainlist: (response.data) })
            });
        }
        else if (this.state.pickup == "DELHI" && this.state.dropoff == "BANGALORE") {
            Axios.get("http://localhost:3001/trainlistdb").then((response) => {
                this.setState({ trainlist: (response.data) })
            });
        }
    }
    onDateChange = (e) => {
e.preventDefault();
            this.state.createdAt=e.target.value  
            console.log(this.state.createdAt)
    }

    

    confirmTrain = (e) => {
        e.preventDefault();
        if (this.state.pickup == "BANGALORE" && this.state.dropoff == "CHENNAI" && !(this.state.confirmedTrain == 2608 || this.state.confirmedTrain==6080)) 
                alert('invalid train no')        
        else if (this.state.pickup == "BANGALORE" && this.state.dropoff == "DELHI" && !(this.state.confirmedTrain == 2691 || this.state.confirmedTrain==6077)) 
            alert('invalid train no')    
        
        else if (this.state.pickup == "CHENNAI" && this.state.dropoff == "BANGALORE" && !(this.state.confirmedTrain == 2027 || this.state.confirmedTrain==3251)) 
            alert('invalid train no')    
        
        else if (this.state.pickup == "CHENNAI" && this.state.dropoff == "DELHI" && !(this.state.confirmedTrain == 2621 || this.state.confirmedTrain==6011)) 
            alert('invalid train no')    
        
        else if (this.state.pickup == "DELHI" && this.state.dropoff == "CHENNAI" && !(this.state.confirmedTrain == 2434 || this.state.confirmedTrain==6012)) 
            alert('invalid train no')    
        
        else if (this.state.pickup == "DELHI" && this.state.dropoff == "BANGALORE" && !(this.state.confirmedTrain == 2692 || this.state.confirmedTrain==6528)) 
            alert('invalid train no')    
        else{
            alert(this.state.confirmedTrain+' is confirmed')
        Axios.post("http://localhost:3001/traveldetails", {
            pickup: this.state.pickup,
            dropoff: this.state.dropoff,
            seat: this.state.seat,
            createdAt: this.state.createdAt,
            confirmedTrain: this.state.confirmedTrain,
        });
    }
    }
    trainno = (e) => {
        e.preventDefault();
        this.state.confirmedTrain = e.target.value;

    }
    handleseat = (e) => {
        e.preventDefault();
        this.state.seat = e.target.value;
    }
    render() {
        return (
            <div>
                <form className="p1form" >
                    <div className="p1div">
                        <select className="p1sSelect" onChange={this.handleAddSourceLocation}>
                            <option value="" disabled selected hidden>choose source</option>
                            <option value="BANGALORE">BANGALORE</option>
                            <option value="CHENNAI">CHENNAI</option>
                            <option value="DELHI">DELHI</option>

                        </select>

                        <select className="p1dSelect" onChange={this.handleAddDestLocation}>
                            <option value="" disabled selected hidden>choose destination</option>
                            <option value="BANGALORE">BANGALORE</option>
                            <option value="CHENNAI">CHENNAI</option>
                            <option value="DELHI">DELHI</option>
                        </select>
                    </div>
                    <div>
                        <h4>Number Of Seats:</h4>
                        <select className="p1Select" onChange={this.handleseat}>
                            <option value="" disabled selected hidden>choose no of seat</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option></select>
                    </div>
                    <div>
                        <h4>PickTravel Date</h4>
                        <input type="date" onChange={this.onDateChange} />
                    </div><p></p>
                    <button onClick={this.onShowdetails} className="p1Showdetails">
                        {this.state.visible ? 'SHOW TRAINS' : 'HIDE TRAINS'}
                    </button>     
                </form>
                {!this.state.visible && <div>{
                    this.state.trainlist.map((val, key) => {
                        return <div className="trainlist" key={val.trainno}><h4>TRAIN NO: {val.trainno}</h4>
                            <h4>TRAIN NAME: {val.name}</h4>
                            <h4>SOURCE: {val.source}</h4>
                            <h4>DESTINATON: {val.destination}</h4>
                            <h4>DEPARTURE TIME: {val.departure_time}</h4>
                            <h4>ARRIVAL TIME: {val.arrival_time}</h4>
                            <h4>DURATION: {val.duration}</h4>
                            <h4>TICKET PRICE: {val.price}</h4>
                        </div>
                    })

                }</div>
                }

                <input className="userTrain" placeholder="ENTER TRAIN NO" type="number" maxLength='4' onChange={this.trainno} ></input>
                <br /><br /><button className="bookbut" onClick={this.confirmTrain}>CONFIRM TRAIN</button>
                <br/><a href="/userdetails" >Submit</a>
                <br />
                    <a href="/">Go back</a>
            </div>

        )
    }
}

export default Page1

ReactDOM.render(<Page1/>,document.getElementById('app'));