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
        return (
            <div className="tabView">
                <div className="tabViewHeader">

                    {this.tabs.map((tab, index) =>
                    (

                        <Link key={index} className={"tabViewHeaderItem" + (this.state.activeTab === index ? " tabViewHeaderItemActive" : "")} to={this.links[index]} onClick={() => this.clickHandler(index)}>
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


// a dialog for the resource view
// can be used to add, edit or delete resources
class ResourceDialog extends React.Component {
    constructor(props) {
        super(props);

        this.title = "Title";
        if(this.props.title){
            this.title = this.props.title;
        }
    }

    render() {
        return (
            <div className="resourceDialog">
                <div className="resourceDialogTop">
                    <div className="resourceDialogTopLeft">
                        <h3>{this.title}</h3>

                    </div>
                    <div className="resourceDialogTopRight">
                        <button className="resourceDialogTopRightButton" onClick={this.props.onClose}>X</button>
                    </div>
                </div>
                <div className="resourceDialogContent">
                    {this.props.children}
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
            filter: null,
            search: ""
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

        this.dialog = React.createRef();



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

    getCategoryIndex() {
        // returns the index of the category column
        var categoryIndex = -1;
        for (let i = 0; i < this.state.header.length; i++) {
            let v = this.state.header[i];
            v = v.toLowerCase();
            if (v === "kategorie" || v === "category") {
                categoryIndex = i;
                break;
            }
        }
        if (categoryIndex === -1) {
            return -1;
        }
        if (this.props.ignoreFirstColumn) {
            categoryIndex++;
        }
        return categoryIndex;
    }


    filter(data) {
        if (this.state.filter !== null) {

            var categoryIndex = this.getCategoryIndex();
            if (categoryIndex !== -1) {
                data = data.filter((item) => {
                    return item[categoryIndex] === this.state.filter;
                });
            }

        }

        if (this.state.search !== null && this.state.search !== "") {
            data = data.filter((item) => {
                for (let i = 0; i < item.length; i++) {
                    if (item[i].toLowerCase().includes(this.state.search.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
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

    generateFilterButtons() {
        var buttons = [];
        var categories = [];
        var categoryIndex = this.getCategoryIndex();
        if (categoryIndex === -1) {
            return null;
        }

        for (let i = 0; i < this.state.data.length; i++) {
            let v = this.state.data[i][categoryIndex];
            if (categories.indexOf(v) === -1) {
                categories.push(v);
            }
        }

        // sort categories
        categories.sort((a, b) => { return a.localeCompare(b); });

        for (let i = 0; i < categories.length; i++) {
            let cName = "filterButton";
            if (this.state.filter === categories[i]) {
                cName = cName + " activeFilter";
            }
            buttons.push(<button className={cName} key={i} onClick={() => this.setFilter(categories[i])}>{categories[i]}</button>);
        }

        return buttons;

    }

    setFilter(filter) {
        this.setState({ filter: filter });
    }

    setSearch(e) {
        let search = e.target.value;
        this.setState({ search: search });
    }

    showDialog() {
        this.dialog.current.showModal();
    }

    hideDialog() {
        this.dialog.current.close();
    }

    render() {
        var data = this.state.data;
        data = this.filter(data);
        data = this.sort(data);

        return (
            <div className="resourceView">
                <dialog ref={this.dialog} className="resourceViewDialog">
                    <ResourceDialog view={this} onClose={() => { this.hideDialog(); }} />
                </dialog>

                <div className="filterBar">
                    <div className="filterButtons">

                        {this.generateFilterButtons()}

                        <button key={999} className="filterButton" onClick={() => { this.setFilter(null); }}>Reset</button>
                    </div>
                    <div className="filterInput">
                        <input className="filterInputField" value={this.props.search} type="text" placeholder="Filter" onChange={(e) => { this.setSearch(e); }} />
                    </div>
                </div>
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

class EditItemPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };

        if(this.props.item) {
            this.state.item = this.props.item;
        }
    }

    render() {
        if(this.state.item === null) {
            return null;
        }

        return (
            <div className="editItemPanel">
                <div className="editItemPanelFields">
                    <input type="text" placeholder="Name" className="editItemPanelInput"></input>
                    <input type="text" placeholder="Kategorie" className="editItemPanelInput"></input>
                    <input type="text" placeholder="Kosten/Monat" className="editItemPanelInput"></input>
                    <input type="text" placeholder="Kosten" className="editItemPanelInput"></input>
                    <input type="text" placeholder="Anzahl" className="editItemPanelInput"></input>
                </div>
                <div className="editItemPanelControls">
                    {this.props.children}
                </div>
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

        this.view = React.createRef();
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
                ref={this.view}
                header={["Name", "Kategorie", "Kosten", "Kosten/Monat", "Anzahl"]}
                data={this.convertData()}
                buttons={[
                    {
                        text: "Hinzufügen",
                        onClick: (item) => {
                            this.view.current.showDialog();
                            console.log(item);
                        }
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

