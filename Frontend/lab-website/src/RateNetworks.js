import React from 'react';
import { Link } from 'react-router-dom';

import { GoogleMap, LoadScript, Circle, Marker, Polyline } from '@react-google-maps/api';

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

function filterNetwork(network, maxActorCount) {
    // reduce the network to the maxActorCount most important actors

    if (network.length <= maxActorCount) {
        maxActorCount = network.length;
    }

    const minConnectionValue = 1;
    const maxConnectionValue = 2;
    const getConnectionValues = (start, checkedActors) => {
        // get the connection value for start actor
        checkedActors.push(start.name);
        let connectionValue = 0;
        for (const [key, value] of Object.entries(start.networkRating)) {
            if (value >= 1) {
                connectionValue += minConnectionValue + (maxConnectionValue - minConnectionValue) * value / 4;
            }
        }

        // get the connection value for all other actors
        for (const otherActor of network) {
            if (checkedActors.includes(otherActor.name)) {
                continue;
            }
            // check if network is connected
            if (start.networkRating[otherActor.name.replace(/[^a-zA-Z0-9]/g, '')] >= 1) {
                connectionValue += 0.4 * getConnectionValues(otherActor, checkedActors);
            }
        }

        return connectionValue;
    }

    // get the connection values for all actors
    let connectionValues = [];
    for (const actor of network) {
        connectionValues.push({
            actor: actor,
            value: getConnectionValues(actor, [])
        });
    }

    // sort the actors by connection value
    connectionValues.sort((a, b) => {
        return b.value - a.value;
    });


    // return the maxActorCount most important actors
    let mostImportantActors = [];
    for (let i = 0; i < maxActorCount; i++) {
        mostImportantActors.push(connectionValues[i].actor);
    }

    return mostImportantActors;

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
        networks.push(new NetworkActor("HS Bremen", 1, "Flughafenallee 10, 28199 Bremen, Germany"));
        networks.push(new NetworkActor("Bremen Hbf", 2, "Bremen Hbf, Bahnhofsplatz 15, 28195 Bremen"));
        networks.push(new NetworkActor("Digital Impact Lab Gröpelingen", 3, "Liegnitzstraße 52A - 54, 28237 Bremen"));
        networks.push(new NetworkActor("Vegesack", 4, "Vegesacker Bahnhofsplatz 34 (Gebäude) 5, 28757 Bremen"));
        networks.push(new NetworkActor("Universität Bremen", 5, "Bibliothekstraße 1, 28359 Bremen, Germany"));
        networks.push(new NetworkActor("Actor 6", 6, "Senator-Blase-Straße 23, 28197 Bremen, Deutschland"));
        networks.push(new NetworkActor("Actor 7", 7, "Waller Heerstraße 293a, 28219 Bremen, Deutschland"));
        networks.push(new NetworkActor("Actor 8", 8, "Bremer Str. 107, 28816 Stuhr, Deutschland"));
        networks.push(new NetworkActor("Actor 9", 9, "Schwachhauser Heerstraße 240, 28213 Bremen, Deutschland"));

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
                <button className="networkRaterStartButton" onClick={() => { this.setState({ currentNetwork: 0 }) }}>Start</button>
            </div>
        );
    }

    getEndView() {

        // log most important actors
        let mostImportantActors = filterNetwork(this.state.networks, 5);
        console.log("Most important actors:");
        for (let i = 0; i < mostImportantActors.length; i++) {
            console.log(mostImportantActors[i].name);
        }

        // save networks to local storage
        localStorage.setItem('networks', JSON.stringify(this.state.networks));

        return (
            <div className="networkRaterEnd">
                <h2>Übersicht</h2>
                <p>Die Bewertung wurde erfolgreich abgeschlossen.</p>
                <p>Anhand der Bewertungen wurden die wichtigsten Akteure in Ihrem Netzwerk ermittelt.</p>
                <div className="networkRaterEndMostImportantActors">
                    <h3>Wichtigste Akteure:</h3>
                    <ul>
                        {mostImportantActors.map((actor, index) => {
                            return (
                                <li key={index}>{actor.name}</li>
                            );
                        })}
                    </ul>
                </div>
                <div className="networkRaterEndTableContainer">
                    <Link className='networkRaterEndButton' to="/networkMap">Auf Karte anzeigen</Link>
                    <Link className='networkRaterEndButton' to="/network">Zurück zur Netzwerkübersicht</Link>
                    <Link className='networkRaterEndButton' to="/">Zurück zur Startseite</Link>
                </div>
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


const mapsApiKey = "AIzaSyAMLNvjPviuINaY8Z8N2QoMpLHuI7yjevM";

async function getGeoLocation(address) {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + mapsApiKey;

    let response = await fetch(url);
    let data = await response.json();

    if (data.status !== "OK") {
        return null;
    }

    return data.results[0].geometry.location;
}


class MapView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            networks: [],
            center: {
                lat: 37.7749, // Latitude of the center of the map
                lng: -122.4194 // Longitude of the center of the map
            },
            filterCount: -1
        };
    }

    async componentDidMount() {

        // try to load networks from local storage
        let networks = JSON.parse(localStorage.getItem('networks'));

        if (networks === null) {

            // for now, just create some dummy networks
            networks = [];
            networks.push(new NetworkActor("HS Bremen", 1, "Flughafenallee 10, 28199 Bremen, Germany"));
            networks.push(new NetworkActor("Bremen Hbf", 2, "Bremen Hbf, Bahnhofsplatz 15, 28195 Bremen"));
            networks.push(new NetworkActor("Digital Impact Lab Gröpelingen", 3, "Liegnitzstraße 52A - 54, 28237 Bremen"));
            networks.push(new NetworkActor("Vegesack", 4, "Vegesacker Bahnhofsplatz 34 (Gebäude) 5, 28757 Bremen"));
            networks.push(new NetworkActor("Universität Bremen", 5, "Bibliothekstraße 1, 28359 Bremen, Germany"));
        }

        // load the geocodes for the networks

        let i = 0;
        let center = { lat: 0, lng: 0 };

        for (let network of networks) {
            network.location = await getGeoLocation(network.address);
            console.log(network.location);
            center.lat += network.location.lat;
            center.lng += network.location.lng;
            i++;
        }

        center.lat /= i;
        center.lng /= i;



        this.setState({
            networks: networks,
            center: center
        });



    }

    getMapMarkers(networks) {
        let markers = [];

        for (let network of networks) {
            if (network.location === null) {
                continue;
            }

            markers.push(<Circle
                key={network.name}
                center={network.location}
                radius={300}
                options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.0,
                    strokeWeight: 0,
                    fillColor: "#8822DD",
                    fillOpacity: 0.8
                }}
            />);
        }

        // draw line between all networks
        let checked = [];
        for (let i = 0; i < networks.length; i++) {
            checked.push(i);
            for (let j = i + 1; j < networks.length; j++) {
                if (checked.includes(j)) continue;
                if (networks[i].location === null || networks[j].location === null) {
                    continue;
                }
                if (i === j) continue;

                // check if networkRating is defined
                if (networks[i].networkRating === undefined || networks[j].networkRating === undefined) {
                    continue;
                }

                let network1 = networks[i];
                let network2 = networks[j];

                const minWeight = 1.0;
                const maxWeight = 6.0;

                const minOpacity = 0.1;
                const maxOpacity = 0.8;

                let rating = network1.networkRating[network2.keyName];
                if (rating === undefined || rating === null || rating === 0) {
                    continue;

                }

                let weight = minWeight + (maxWeight - minWeight) * rating / 4.0;
                let opacity = minOpacity + (maxOpacity - minOpacity) * rating / 4.0;

                markers.push(<Polyline
                    key={network1.keyName + network2.keyName}
                    path={[network1.location, network2.location]}
                    options={{
                        strokeColor: "#0000FF",
                        strokeOpacity: opacity,
                        strokeWeight: weight
                    }}
                />);
            }
        }



        return markers;
    }

    render() {

        const containerStyle = {
            width: '1200px',
            height: '800px'
        };

        const center = this.state.center;

        const options = {
            zoom: 11, // Initial zoom level
            mapTypeId: 'roadmap' // Type of map (roadmap, satellite, hybrid, terrain)
        };

        let len = this.state.networks.length;
        if (this.state.filterCount !== -1) {
            len = this.state.filterCount;
        }
        const networks = filterNetwork(this.state.networks, len);
        const maxFilterCount = "" + this.state.networks.length;

        let networkRated = false;
        for (let network of networks) {
            if (network.networkRating !== undefined) {
                networkRated = true;
                break;
            }
        }


        return (
            <div className='networkMapContainer'>
                <div className="networkMapSplitView">
                    <LoadScript googleMapsApiKey={mapsApiKey}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            className="networkMap"
                            center={center}
                            options={options}
                        >
                            {/* You can add additional components like markers, info windows, etc. here */}
                            {this.getMapMarkers(networks)}
                        </GoogleMap>
                    </LoadScript>
                    <div className="networkMapList">
                        <h2>Netzwerk</h2>
                        {networkRated ? null :
                            <div>
                                <p>Bitte bewerten Sie die Akteure, um die Verbindungen zu sehen.</p>
                                <Link to="/rateNetworks" className='networkRaterEndButton'>Bewerten</Link>
                            </div>}
                        <ul>
                            {
                                networks.map(network => {
                                    return <li key={network.keyName}>{network.name}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="mapSliderContainer">
                    <label>Akteure: {len}</label>
                    <input className="mapSlider" type="range" min="1" max={maxFilterCount} value={"" + len} onChange={(e) => {
                        this.setState({
                            filterCount: Math.round(e.target.value)
                        });
                    }} />
                </div>
            </div>
        );
    }

}

export { NetworkRater, MapView };