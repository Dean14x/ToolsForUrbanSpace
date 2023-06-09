import React from "react";
import "./ResourceChecker.css";
import { Link, Outlet } from "react-router-dom";


class TabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        };

        this.tabs = ["Übersicht", "Inventar", "Geplant", "Katalog"];
        this.links = ["/resources", "/resources/inventory", "/resources/planned", "/resources/catalog"];

    }

    clickHandler(index) {
        this.setState({ activeTab: index });
    }

    render() {
        console.log(this.tabs);
        return (
            <div className="tabView">
                <div className="tabViewHeader">
                    
                    {this.tabs.map((tab, index) => 
                        (
                            
                            <Link className={"tabViewHeaderItem" + (this.state.activeTab === index ? " tabViewHeaderItemActive" : "")} to={this.links[index]} onClick={() => this.clickHandler(index)}>
                                {tab}
                            </Link>
                        )
                    )}
                </div>
                <div className="tabViewContent">
                    <Outlet />
                </div>
            </div>
        );
    }
}

// displays a table of resources
// props:
// header: array of strings
// data: array of arrays of strings
// buttons: array of objects with properties "text" and "onClick" and optional property "className"
// ignoreFirstColumn: boolean - used to ignore id column
class ResourceView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [],
            data: [],
            sortRow: 0,
            sortDirection: 1,
            filter: null
        };

        if (this.props.header) {
            this.state.header = this.props.header;
        }
        if (this.props.data) {
            this.state.data = this.props.data;
        }
        if (!this.props.buttons) {
            this.buttons = [];
        } else {
            this.buttons = this.props.buttons;
        }

        if (this.props.ignoreFirstColumn) {
            this.ignoreFirstColumn = true;
        } else {
            this.ignoreFirstColumn = false;
        }



    }

    componentDidMount() {
        this.setTestData();
    }

    setTestData() {
        // test data
        var headerNew = ["Name", "Kategorie", "Kosten", "Anzahl"];
        var dataNew = [
            ["PC", "Hardware", "1000", "10"],
            ["laptop", "Hardware", "2000", "5"],
            ["VR headset", "Hardware", "500", "2"],
            ["monitor", "Hardware", "200", "20"],
            ["keyboard", "Hardware", "50", "50"],
            ["mouse", "Hardware", "20", "100"],
            ["headphones", "Hardware", "100", "20"],
            ["3D printer", "Hardware", "1000", "1"],
            ["3D scanner", "Hardware", "500", "1"],
            ["camera", "Hardware", "500", "1"],
            ["Adobe Photoshop", "Software", "100", "10"],
            ["Adobe Illustrator", "Software", "100", "10"],
            ["Adobe Premiere", "Software", "100", "10"],
            ["Adobe After Effects", "Software", "100", "10"],
            ["Betreuung", "Service", "100", "10"],
            ["Beratung", "Service", "100", "10"],
            ["Other 1", "Other", "100", "10"],
            ["Other 2", "Other", "100", "10"],
            ["Other 3", "Other", "100", "10"],
            ["Other 4", "Other", "100", "10"]
        ];


        this.setState({ header: headerNew, data: dataNew });

    }

    compare(a, b) {
        // compares two cells in the table
        // compare as number if string is a number
        // compare as string otherwise
        if (isNaN(a) || isNaN(b)) {
            return a.localeCompare(b);
        }
        else {
            return a - b;
        }
    }


    setSort(index) {
        // ignore if button header is clicked
        let min = this.ignoreFirstColumn ? 1 : 0;
        if (index < min || index >= this.state.header.length + min) {
            return;
        }


        let sortDirection = this.state.sortDirection;
        if (this.state.sortRow === index) {
            sortDirection = sortDirection * -1;
        }
        this.setState({ sortRow: index, sortDirection: sortDirection });
    }

    sort(data) {
        // sort the data
        let sortRow = this.state.sortRow;
        let sortDirection = this.state.sortDirection;

        data.sort((a, b) => { return this.compare(a[sortRow], b[sortRow]) * sortDirection; });

        return data;
    }

    filter(data) {
        if (this.state.filter === null) {
            return data;
        }
        return data;
    }

    generateRow(item, index) {
        var buttons = [];
        let start = this.ignoreFirstColumn ? 1 : 0;
        for (let i = 0; i < this.buttons.length; i++) {
            let cName = "resourceViewButton"
            if (this.buttons[i].className) {
                cName = cName + " " + this.buttons[i].className;
            }
            buttons.push(<button key={i} className={cName} onClick={() => this.buttons[i].onClick(item)}>
                {this.buttons[i].text}
            </button>);
        }
        return (
            <tr key={index}>
                {item.map((item2, index2) => (
                    index2 >= start ? <td key={index2}>{item2}</td> : null
                ))}
                {this.buttons.length > 0 ? <td>{buttons}</td> : null
                }
            </tr>
        );
    }

    generateHeader() {
        return (
            <tr>
                {this.state.header.map((item, index) => (
                    <th key={index} onClick={() => this.setSort(index)}>{item}</th>
                ))}
                {this.buttons.length > 0 ? <th></th> : null}
            </tr>
        );
    }

    render() {
        var data = this.state.data;
        data = this.filter(data);
        data = this.sort(data);

        return (
            <div className="resourceView">
                <h1>TODO: filter and search</h1>
                <table>
                    <thead>
                        {this.generateHeader()}
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            this.generateRow(item, index)
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

class InventoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        // load data from server
    }

    convertData() {
        // convert data from server to data for ResourceView
        // array of arrays
        return this.state.data;
    }

    render() {
        return (
            <ResourceView
                header={["Name", "Kategorie", "Kosten/Monat", "Anzahl"]}
                data={this.convertData()}
                buttons={[{
                    text: "Bearbeiten",
                    onClick: (item) => { console.log(item); }
                },
                {
                    text: "Entfernen",
                    onClick: (item) => { console.log(item); }
                }
                ]} />
        );
    }
}

class PlannedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        // load data from server
    }

    convertData() {
        // convert data from server to data for ResourceView
        // array of arrays
        return this.state.data;
    }

    render() {
        return (
            <ResourceView
                header={["Name", "Kategorie", "Kosten", "Kosten/Monat", "Anzahl"]}
                data={this.convertData()}
                buttons={[
                    {
                        text: "Hinzufügen",
                        onClick: (item) => { console.log(item); }
                    },
                    {
                        text: "Bearbeiten",
                        onClick: (item) => { console.log(item); }
                    },
                    {
                        text: "Entfernen",
                        onClick: (item) => { console.log(item); }
                    }
                ]} />
        );
    }
}

class CatalogView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        // load data from server
    }

    convertData() {
        // convert data from server to data for ResourceView
        // array of arrays
        return this.state.data;
    }

    render() {
        return (
            <ResourceView
                header={["Name", "Kategorie", "Kosten", "Kosten/Monat", "Anzahl"]}
                data={this.convertData()}
                buttons={[
                    {
                        text: "Hinzufügen",
                        onClick: (item) => { console.log(item); }
                    },
                    {
                        text: "Planen",
                        onClick: (item) => { console.log(item); }
                    }

                ]} />
        );
    }
}

class OverviewView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="overviewView">
                <h1>TODO: overview</h1>
                <div>
                    <h2>Hardware progress</h2>
                    <h2>Software progress</h2>
                    <h2>Service progress</h2>
                    <h2>Costs per month</h2>
                    <h2>Remaining budget</h2>
                    <h2>Planned cost</h2>

                </div>


            </div>
        );
    }
}



// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class ResourceChecker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            session: ""
        };
    }

    setPage(page) {
        this.setState({ page: page });
    }

    render() {
        return (
            <div className="resourceChecker">
                <TabView />
            </div>
        );
    }
}

export { ResourceChecker, OverviewView, InventoryView, PlannedView, CatalogView }

