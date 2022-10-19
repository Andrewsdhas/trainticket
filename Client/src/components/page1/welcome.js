import React from 'react';
import ReactDOM from 'react-dom'


class App extends React.Component {

    render() {
        return (
            <div className="dashPage__div" >
                <h1 className="dashPage">Book a Train online</h1>
                <div className="entirePage">
                    <a href="/traveldetails">Proceed to book</a>
                </div>
            </div>
        );
    }
}

export default App

ReactDOM.render(<App />, document.getElementById('app'));
