import React from 'react';
import { Link } from 'react-router-dom';

import './RateNetworks.css';


// placeholder for networks
class NetworkActor {
    constructor(name, id, address) {
        this.name = name;
        this.id = id;
        this.address = address;

        this.networkRating = {};
    }


}

class NetworkRater extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentNetwork: -1,
            networks: []
        };

        // value of connection between two network actors
        this.ratingValues = [
            "Keine",
            "Schwach",
            "Mittel",
            "Stark",
            "Sehr stark"
        ];

    }

    componentDidMount() {
        // get the networks from the database ?
        // this.setState({networks: networks});

        // for now, just create some dummy networks
        let networks = [];
        networks.push(new NetworkActor("Network 1", 1, "Streetname 1, 12345 City"));
        networks.push(new NetworkActor("Network 2", 2, "Streetname 2, 12345 City"));
        networks.push(new NetworkActor("Network 3", 3, "Streetname 3, 12345 City"));
        networks.push(new NetworkActor("Network 4", 4, "Streetname 4, 12345 City"));
        networks.push(new NetworkActor("Network 5", 5, "Streetname 5, 12345 City"));
        networks.push(new NetworkActor("Network 6", 6, "Streetname 6, 12345 City"));

        this.setState({ networks: networks });
    }

    handleRatingChange(event) {
        // get the rating value
        const rating = event.target.value;

        // get the name of the network that was rated
        const networkName = event.target.name;

        // get the current network
        const currentNetwork = this.state.networks[this.state.currentNetwork];

        // update the rating
        currentNetwork.networkRating[networkName] = rating;

        // update reverse connection
        let keyName = currentNetwork.name;
        // remove spaces and special characters
        keyName = keyName.replace(/[^a-zA-Z0-9]/g, '');

        // get the network that was rated
        let network = null;
        for (let i = 0; i < this.state.networks.length; i++) {
            if (this.state.networks[i].keyName === networkName) {
                network = this.state.networks[i];
                break;
            }
        }

        // update the rating
        if (network) {
            network.networkRating[keyName] = rating;
        }


        // update the state
        this.setState({ currentNetwork: this.state.currentNetwork });
    }

    getRatingTable() {
        // get the rating table for the current network
        if (this.state.currentNetwork === -1 || this.state.networks.length <= this.state.currentNetwork) {
            return null;
        }

        let table = [];

        const currentNetwork = this.state.networks[this.state.currentNetwork];

        for (let i = 0; i < this.state.networks.length; i++) {
            if (this.state.networks[i].name === currentNetwork.name) {
                continue;
            }

            let keyName = this.state.networks[i].name;
            // remove spaces and special characters
            keyName = keyName.replace(/[^a-zA-Z0-9]/g, '');

            // save keyName to find the network later
            this.state.networks[i].keyName = keyName;


            // check if there is already a rating for this network
            let rating = 0;
            if (currentNetwork.networkRating.hasOwnProperty(keyName)) {
                rating = currentNetwork.networkRating[keyName];
            } else {
                currentNetwork.networkRating[keyName] = 0;
            }

            table.push(
                <tr key={i} className='networkRaterTableRow'>
                    <td className='networkRaterTableNames'>{this.state.networks[i].name}</td>
                    <td className='networkRaterTableRatings'>
                        {this.ratingValues.map((value, index) => {
                            return (
                                <input className="networkRaterRadio" type="radio" key={index} name={keyName} value={index} checked={rating == index} onChange={this.handleRatingChange.bind(this)} />
                            );
                        })}
                    </td>
                </tr>
            );

        }

        return (
            <div className="networkRaterTableContainer">
                <h2>{currentNetwork.name}</h2>
                <p>Bitte bewerten Sie die Verbindung zwischen {currentNetwork.name} und den anderen Akteuren.</p>
                <table className="networkRaterTable">
                    <thead>
                        <tr>
                            <th className='networkRaterTableName'>Akteur</th>
                            <th className='networkRaterTableRating'>Bewertung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </table>
                <div className="networkRaterTableControls">
                    <button className='continue' onClick={() => { this.setState({ currentNetwork: this.state.currentNetwork - 1 }) }}>Zurück</button>
                    <button className="back" onClick={() => { this.setState({ currentNetwork: this.state.currentNetwork + 1 }) }}>Weiter</button>
                </div>
            </div>
        );
    }

    getStartView() {
        return (
            <div className="networkRaterStart">
                <h2>Bitte bewerten Sie die Verbindungen ihres Netzwerkes</h2>
                <p>Um über die Verbindungen zwischen den Akteuren in Ihrem Netzwerk einen Überblick zu bekommen, bitten wir Sie, diese zu bewerten.</p>
                <p>Die Bewertung erfolgt auf einer Skala von 1 (links) bis 5 (rechts), wobei 1 für "Keine Verbindung" und 5 für "Sehr starke Verbindung" steht.</p>
                <p>Falls keine Verbindung zwischen zwei Akteuren besteht, können Sie die Bewertung auf 1 belassen und können auf der nächsten Seite fortfahren.</p>
                <button onClick={() => { this.setState({ currentNetwork: 0 }) }}>Start</button>
            </div>
        );
    }

    getEndView() {
        return (
            <div className="networkRaterEnd">
                <h2>Vielen Dank für Ihre Bewertung!</h2>
                <Link to="/"><button>Zurück zur Startseite</button></Link>
            </div>
        );
    }

    getRatingView() {
        if (this.state.currentNetwork === -1) {
            return this.getStartView();
        } else if (this.state.networks.length <= this.state.currentNetwork) {
            return this.getEndView();
        }

        return this.getRatingTable();
    }

    render() {
        return (
            <div className='networkRater'>
                {
                    this.getRatingView()
                }
            </div>
        );
    }
}

export default NetworkRater;