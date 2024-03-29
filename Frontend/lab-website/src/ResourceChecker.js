import React from "react";
import "./ResourceChecker.css";
import { Link, Outlet } from "react-router-dom";
import CatalogItem from "./catalogItem";

// enum for categories
const CATEGORIES = {
    Hardware: "Hardware",
    Software: "Software",
    Service: "Service",
    Other: "Other"
};

const formatEuro = (value) => {
    let euro = Math.floor(value);
    let cent = Math.floor((value - euro) * 100);

    let euroStr = euro.toString();
    let centStr = cent.toString();
    if (cent < 10) {
        centStr = "0" + centStr;
    }
    // add thousands seperator
    let euroStrNew = "";
    for (let i = 0; i < euroStr.length; i++) {
        if (i > 0 && (euroStr.length - i) % 3 === 0) {
            euroStrNew += ".";
        }
        euroStrNew += euroStr[i];
    }

    if (cent === 0) {
        return euroStrNew + "€";
    } else {
        return euroStrNew + "," + centStr + "€";
    }
};


class TabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        };

        this.tabs = ["Übersicht", "Bestand", "Investitionsplan", "Katalog"];
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

    }

    render() {
        let title = "";
        if (this.props.title) {
            title = this.props.title;
        }
        return (
            <div className="resourceDialog">
                <div className="resourceDialogTop">
                    <div className="resourceDialogTopLeft">
                        <h3>{title}</h3>

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
            search: "",
            dialogElement: null
        };


        if (!this.props.buttons) {
            this.buttons = [];
        } else {
            this.buttons = this.props.buttons;
        }

        if (this.props.ignoreFirstColumn) {
            this.ignoreFirstColumn = true;
        } else {
            this.ignoreFirstColumn = true;
        }

        this.dialog = React.createRef();



    }

    componentDidMount() {
        //this.setTestData();
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

        var asItems = [
            new CatalogItem(0, "PC", CATEGORIES.Hardware, 1000, 0, "A PC", 10),
            new CatalogItem(1, "laptop", CATEGORIES.Hardware, 2000, 0, "A laptop", 5),
            new CatalogItem(2, "VR headset", CATEGORIES.Hardware, 500, 0, "A VR headset", 2),
            new CatalogItem(3, "monitor", CATEGORIES.Hardware, 200, 0, "A monitor", 20),
            new CatalogItem(4, "keyboard", CATEGORIES.Hardware, 50, 0, "A keyboard", 50),
            new CatalogItem(5, "mouse", CATEGORIES.Hardware, 20, 0, "A mouse", 100),
            new CatalogItem(6, "headphones", CATEGORIES.Hardware, 100, 0, "A headphones", 20),
            new CatalogItem(7, "3D printer", CATEGORIES.Hardware, 1000, 0, "A 3D printer", 1),
            new CatalogItem(8, "3D scanner", CATEGORIES.Hardware, 500, 0, "A 3D scanner", 1),
            new CatalogItem(9, "camera", CATEGORIES.Hardware, 500, 0, "A camera", 1),
            new CatalogItem(10, "Adobe Photoshop", CATEGORIES.Software, 100, 0, "A Adobe Photoshop", 10),
            new CatalogItem(11, "Adobe Illustrator", CATEGORIES.Software, 100, 0, "A Adobe Illustrator", 10),
            new CatalogItem(12, "Adobe Premiere", CATEGORIES.Software, 100, 0, "A Adobe Premiere", 10),
            new CatalogItem(13, "Adobe After Effects", CATEGORIES.Software, 100, 0, "A Adobe After Effects", 10),
            new CatalogItem(14, "Betreuung", CATEGORIES.Service, 100, 0, "A Betreuung", 10),
            new CatalogItem(15, "Beratung", CATEGORIES.Service, 100, 0, "A Beratung", 10),
            new CatalogItem(16, "Other 1", CATEGORIES.Other, 100, 0, "A Other 1", 10),
            new CatalogItem(17, "Other 2", CATEGORIES.Other, 100, 0, "A Other 2", 10),
            new CatalogItem(18, "Other 3", CATEGORIES.Other, 100, 0, "A Other 3", 10),
            new CatalogItem(19, "Other 4", CATEGORIES.Other, 100, 0, "A Other 4", 10)
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
        index += min;
        if (index < 0 || index >= this.props.header.length + min) {
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
        for (let i = 0; i < this.props.header.length; i++) {
            let v = this.props.header[i];
            v = v.toLowerCase();
            if (v === "kategorie" || v === "category") {
                categoryIndex = i;
                break;
            }
        }
        if (categoryIndex === -1) {
            return -1;
        }
        if (this.ignoreFirstColumn) {
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
                    if (item[i].toString().toLowerCase().includes(this.state.search.toLowerCase())) {
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
                {this.props.header.map((item, index) => (
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

        for (let i = 0; i < this.props.data.length; i++) {
            let v = this.props.data[i][categoryIndex];
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

    showDialog(element = null) {

        this.setState({ dialogElement: element });

        this.dialog.current.showModal();
    }

    hideDialog() {
        this.dialog.current.close();
    }

    render() {
        var data = this.props.data;
        data = this.filter(data);
        data = this.sort(data);


        return (
            <div className="resourceView">
                <dialog ref={this.dialog} className="resourceViewDialog">
                    <ResourceDialog view={this} onClose={() => { this.hideDialog(); }}>
                        {this.state.dialogElement}
                    </ResourceDialog>
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

        // gets the actual item object from the list
        if (this.props.item && this.props.getItem) {
            this.baseItem = this.props.getItem(this.props.item[0]);
        }

        this.buttons = [];
        if (this.props.buttons) {
            this.buttons = this.props.buttons;
        }



    }

    changeItem(newVal, field) {
        let item = this.state.item;
        if (!item) {
            item = this.baseItem;
        }

        if (field === "cost" || field === "monthlyCost") {
            newVal = parseFloat(newVal);
            if (isNaN(newVal)) {
                newVal = 0;
            }
        }

        if (field === "amount") {
            newVal = parseInt(newVal);
            if (isNaN(newVal)) {
                newVal = 0;
            }
        }

        item[field] = newVal;

        if (item.name !== this.baseItem.name || item.category !== this.baseItem.category || item.cost !== this.baseItem.cost || item.monthlyCost !== this.baseItem.monthlyCost) {
            item.id = -1;
        }

        this.setState({ item: item });
    }

    render() {

        if (this.props.item[0] !== this.baseItem.id) {
            this.baseItem = this.props.getItem(this.props.item[0]);
            this.state.item = this.baseItem;
        }

        let item = this.baseItem;

        if (this.state.item) {
            item = this.state.item;
        }

        return (
            <div className="editItemPanel">
                <div className="editItemPanelFields">
                    <div className="editItemPanelRow">
                        <p>Name</p>
                        <input onChange={(e) => this.changeItem(e.target.value, "name")}
                            type="text" placeholder="Name" className="editItemPanelInput editItemPanelInputName" value={item.name}></input>
                    </div>
                    <div className="editItemPanelRow">
                        <p>Kategorie</p>
                        <select defaultValue={item.category} onChange={(e) => this.changeItem(e.target.value, "category")}
                            className="editItemPanelSelect editItemPanelInput">
                            {Object.keys(CATEGORIES).map((citem, index) => (
                                <option key={index}>{citem}</option>
                            ))}
                        </select>
                    </div>

                    <div className="editItemPanelRow">
                        <p>mtl. Kosten</p>
                        <input onChange={(e) => this.changeItem(e.target.value, "monthlyCost")}
                            type="text" placeholder="Kosten/Monat" className="editItemPanelInput" value={item.monthlyCost}></input>
                    </div>
                    <div className="editItemPanelRow">
                        <p>Kosten</p>
                        <input onChange={(e) => this.changeItem(e.target.value, "cost")}
                            type="text" placeholder="Kosten" className="editItemPanelInput" value={item.cost}></input>
                    </div>
                    <div className="editItemPanelRow">
                        <p>Anzahl</p>
                        <input onChange={(e) => this.changeItem(e.target.value, "amount")}
                            type="text" placeholder="Anzahl" className="editItemPanelInput" value={item.amount}></input>
                    </div>
                    <div className="editItemPanelRow">
                        <p>Beschreibung</p>
                        <textarea onChange={(e) => this.changeItem(e.target.value, "description")} className="editItemPanelTextArea editItemPanelInput" value={item.description}></textarea>
                    </div>
                </div>
                <div className="editItemPanelControls editItemPanelRow">
                    {this.buttons.map((v, index) => (
                        <button key={index} className="editItemPanelButton" onClick={() => { v.onClick(item) }}>{v.text}</button>
                    ))}
                </div>
            </div>
        );
    }
}

class BaseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        // load data from server
        await this.loadData();
    }

    async loadData() {
        // load data from server
        // overwrite this function
        var items = [
            new CatalogItem(0, "PC", CATEGORIES.Hardware, 1000, 0, "A PC", 10),
            new CatalogItem(1, "laptop", CATEGORIES.Hardware, 2000, 0, "A laptop", 5),
            new CatalogItem(2, "VR headset", CATEGORIES.Hardware, 500, 0, "A VR headset", 2),
            new CatalogItem(3, "monitor", CATEGORIES.Hardware, 200, 0, "A monitor", 20),
            new CatalogItem(4, "keyboard", CATEGORIES.Hardware, 50, 0, "A keyboard", 50),
            new CatalogItem(5, "mouse", CATEGORIES.Hardware, 20, 0, "A mouse", 100),
            new CatalogItem(6, "headphones", CATEGORIES.Hardware, 100, 0, "A headphones", 20),
            new CatalogItem(7, "3D printer", CATEGORIES.Hardware, 1000, 0, "A 3D printer", 1),
            new CatalogItem(8, "3D scanner", CATEGORIES.Hardware, 500, 0, "A 3D scanner", 1),
            new CatalogItem(9, "camera", CATEGORIES.Hardware, 500, 0, "A camera", 1),
            new CatalogItem(10, "Adobe Photoshop", CATEGORIES.Software, 100, 0, "A Adobe Photoshop", 10),
            new CatalogItem(11, "Adobe Illustrator", CATEGORIES.Software, 100, 0, "A Adobe Illustrator", 10),
            new CatalogItem(12, "Adobe Premiere", CATEGORIES.Software, 100, 0, "A Adobe Premiere", 10),
            new CatalogItem(13, "Adobe After Effects", CATEGORIES.Software, 100, 0, "A Adobe After Effects", 10),
            new CatalogItem(14, "Betreuung", CATEGORIES.Service, 100, 0, "A Betreuung", 10),
            new CatalogItem(15, "Beratung", CATEGORIES.Service, 100, 0, "A Beratung", 10),
            new CatalogItem(16, "Other 1", CATEGORIES.Other, 100, 0, "A Other 1", 10),
            new CatalogItem(17, "Other 2", CATEGORIES.Other, 100, 0, "A Other 2", 10),
            new CatalogItem(18, "Other 3", CATEGORIES.Other, 100, 0, "A Other 3", 10),
            new CatalogItem(19, "Other 4", CATEGORIES.Other, 100, 0, "A Other 4", 10)
        ];


        this.setState({
            data: items
        });
    }

    getItemFromId(id) {
        // get item from id

        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].id === id) {
                return this.state.data[i];
            }
        }

        return null;
    }

    itemAsArray(item) {
        // convert item to array
        // overwrite this function
        return ["OVERWRITE THIS FUNCTION"];
    }

    convertData() {
        // convert data from server to data for ResourceView
        // array of arrays

        var data = [];
        for (var i = 0; i < this.state.data.length; i++) {
            data.push(this.itemAsArray(this.state.data[i]));
        }

        return data;
    }
}

class InventoryView extends BaseView {
    constructor(props) {
        super(props);

        this.view = React.createRef();
    }

    itemAsArray(item) {
        return [
            item.id,
            item.name,
            item.category,
            item.monthlyCost,
            item.amount
        ];
    }

    editItem(item) {
        // edit item
        // overwrite this function
        console.log("Edit item " + item);
    }

    removeItem(item) {
        // remove item
        // overwrite this function
        console.log("Remove item: " + item);
    }


    render() {

        let costMonthly = 0;
        let costTotal = 0;

        let budgetMonthly = 1000;


        for (let i = 0; i < this.state.data.length; i++) {
            costMonthly += this.state.data[i].monthlyCost * this.state.data[i].amount;
            costTotal += this.state.data[i].cost * this.state.data[i].amount;
        }

        // background color, 0%: green, 100%: red
        let hueStart = 120;
        let hueEnd = 0;
        let hue = hueStart + (hueEnd - hueStart) * Math.min(costMonthly / budgetMonthly, 1.0);
        let color = "hsl(" + hue + ", 80%, 60%, 0.6)";

        return (
            <div className="resourceContainer">
                <div className="resourceViewHeader">
                    {budgetMonthly > 0 ?
                        <div className="costMonthly" style={{ backgroundColor: color }}>
                            {formatEuro(costMonthly)} von {formatEuro(budgetMonthly)} mtl.
                        </div>
                        :
                        <div className="costMonthly">
                            {formatEuro(costMonthly)} mtl.
                        </div>
                    }
                    <div className="costTotal">
                        {formatEuro(costTotal)} Bestand
                    </div>
                </div>
                <ResourceView
                    ref={this.view}
                    header={["Name", "Kategorie", "Kosten/Monat", "Anzahl"]}
                    data={this.convertData()}
                    buttons={[{
                        text: "Bearbeiten",
                        onClick: (item) => {
                            this.view.current.showDialog(<EditItemPanel
                                title="Bearbeiten"
                                item={item}
                                getItem={this.getItemFromId.bind(this)}
                                buttons={[
                                    {
                                        text: "Abbrechen",
                                        onClick: (item) => { this.view.current.hideDialog(); }
                                    },
                                    {
                                        text: "Bestätigen",
                                        onClick: (item) => {
                                            this.editItem(item);
                                            this.view.current.hideDialog();
                                        }
                                    }
                                ]} />);
                        }
                    },
                    {
                        text: "Entfernen",
                        onClick: (item) => { this.removeItem(this.getItemFromId(item[0])); }
                    }
                    ]} />
            </div>
        );
    }
}

class PlannedView extends BaseView {
    constructor(props) {
        super(props);

        this.view = React.createRef();
    }

    itemAsArray(item) {
        return [
            item.id,
            item.name,
            item.category,
            item.cost,
            item.monthlyCost,
            item.amount
        ];
    }

    addItem(item) {
        // add item to inventory
        // overwrite this function with api call
        console.log("add item", item);
    }

    removeItem(item) {
        // remove item from planned items
        // overwrite this function with api call
        console.log("remove item", item);
    }

    editItem(item) {
        // edit item in planned items
        // overwrite this function with api call
        console.log("edit item", item);
    }



    render() {

        let costMonthly = 0;
        let costTotal = 0;

        let budgetMonthly = 1000;
        let budgetItems = 10000;


        for (let i = 0; i < this.state.data.length; i++) {
            costMonthly += this.state.data[i].monthlyCost * this.state.data[i].amount;
            costTotal += this.state.data[i].cost * this.state.data[i].amount;
        }

        budgetMonthly -= costMonthly;
        if (budgetMonthly < 0) {
            budgetMonthly = 0;
        }

        // background color, 0%: green, 100%: red
        let hueStart = 120;
        let hueEnd = 0;
        let hue = hueStart + (hueEnd - hueStart) * Math.min(budgetMonthly > 0 ? (costMonthly / budgetMonthly) : 1.0, 1.0);
        let color = "hsl(" + hue + ", 80%, 60%, 0.6)";

        let hue2 = hueStart + (hueEnd - hueStart) * Math.min(costTotal / budgetItems, 1.0);
        let color2 = "hsl(" + hue2 + ", 80%, 60%, 0.6)";


        return (
            <div className="resourceContainer">
                <div className="resourceViewHeader">
                    {budgetMonthly > 0 ?
                        <div className="costMonthly" style={{ backgroundColor: color }}>
                            {formatEuro(costMonthly)} von {formatEuro(budgetMonthly)} mtl.
                        </div>
                        :
                        <div className="costMonthly">
                            {formatEuro(costMonthly)} / Monat
                        </div>
                    }
                    <div className="costTotal" style={{ backgroundColor: color2 }}>
                        {formatEuro(costTotal)} von {formatEuro(budgetItems)} geplant
                    </div>
                </div>
                <ResourceView
                    ref={this.view}
                    header={["Name", "Kategorie", "Kosten", "Kosten/Monat", "Anzahl"]}
                    data={this.convertData()}
                    buttons={[
                        {
                            text: "Hinzufügen",
                            onClick: (item) => {
                                this.view.current.showDialog(<EditItemPanel
                                    title="Hinzufügen"
                                    item={item}
                                    getItem={this.getItemFromId.bind(this)}
                                    buttons={[
                                        {
                                            text: "Abbrechen",
                                            onClick: (item) => { this.view.current.hideDialog(); }
                                        },
                                        {
                                            text: "Bestätigen",
                                            onClick: (item) => {
                                                this.addItem(item);
                                                this.view.current.hideDialog();
                                            }
                                        }
                                    ]} />);
                            }
                        },
                        {
                            text: "Bearbeiten",
                            onClick: (item) => {
                                this.view.current.showDialog(<EditItemPanel
                                    title="Bearbeiten"
                                    item={item}
                                    getItem={this.getItemFromId.bind(this)}
                                    buttons={[
                                        {
                                            text: "Abbrechen",
                                            onClick: (item) => { this.view.current.hideDialog(); }
                                        },
                                        {
                                            text: "Bestätigen",
                                            onClick: (item) => {
                                                this.editItem(item);
                                                this.view.current.hideDialog();
                                            }
                                        }
                                    ]} />);
                            }
                        },
                        {
                            text: "Entfernen",
                            onClick: (item) => { this.removeItem(this.getItemFromId(item[0])); }
                        }
                    ]} />
            </div>
        );
    }
}

class CatalogView extends BaseView {
    constructor(props) {
        super(props);

        this.view = React.createRef();

        this.state.data = [
            new CatalogItem(1, "laptop", CATEGORIES.Hardware, 2000, 0, "A laptop", 5),
            new CatalogItem(2, "VR headset", CATEGORIES.Hardware, 500, 0, "A VR headset", 2)
        ];
    }


    itemAsArray(item) {
        return [item.id, item.name, item.category, item.cost, item.monthlyCost, item.amount];
    }

    planItem(item) {
        // api call for planning item
        console.log("plan item");
        console.log(item);
    }

    addItem(item) {
        // api call for adding item
        console.log("add item");
        console.log(item);
    }

    createItem(item) {
        // api call for creating item
        console.log("create item");
        console.log(item);
    }

    updateItem(item) {
        // api call for updating item
        console.log("update item");
        console.log(item);
    }

    deleteItem(item) {
        // api call for deleting item
        console.log("delete item");
        console.log(item);
    }

    getCreateItemButton() {
        return (
            <button className="createItemButton resourceViewButton" onClick={(e)=>{this.view.current.showDialog(
                <EditItemPanel
                    title="Neues Item erstellen"
                    item={[-1,0,0,0,0,0,0]}
                    getItem={(id) => { return new CatalogItem(-1, "", CATEGORIES.Hardware, 0, 0, "", 0);}}
                    buttons={[
                        {
                            text: "Abbrechen",
                            onClick: (item) => { this.view.current.hideDialog(); }
                        },
                        {
                            text: "Bestätigen",
                            onClick: (item) => {
                                this.createItem(item);
                                this.view.current.hideDialog();
                            }
                        }
                    ]} />
            )}}>Create New Item</button>
        );
    }

    getTableButtons(isAdmin) {

        let buttons = [
            {
                text: "Hinzufügen",
                onClick: (item) => {
                    this.view.current.showDialog(<EditItemPanel
                        title="Hinzufügen"
                        item={item}
                        getItem={this.getItemFromId.bind(this)}
                        buttons={[
                            {
                                text: "Abbrechen",
                                onClick: (item) => { this.view.current.hideDialog(); }
                            },
                            {
                                text: "Bestätigen",
                                onClick: (item) => {
                                    this.addItem(item);
                                    this.view.current.hideDialog();
                                }
                            }
                        ]} />);
                }
            },
            {
                text: "Planen",
                onClick: (item) => {
                    this.view.current.showDialog(<EditItemPanel
                        title="Planen"
                        item={item}
                        getItem={this.getItemFromId.bind(this)}
                        buttons={[
                            {
                                text: "Abbrechen",
                                onClick: (item) => { this.view.current.hideDialog(); }
                            },
                            {
                                text: "Bestätigen",
                                onClick: (item) => {
                                    this.planItem(item);
                                    this.view.current.hideDialog();
                                }
                            }]} />);
                }
            }

        ];

        if (isAdmin) {
            buttons.push({
                text: "Bearbeiten",
                onClick: (item) => {
                    this.view.current.showDialog(<EditItemPanel
                        title="Bearbeiten"
                        item={item}
                        getItem={this.getItemFromId.bind(this)}
                        buttons={[
                            {
                                text: "Abbrechen",
                                onClick: (item) => { this.view.current.hideDialog(); }
                            },
                            {
                                text: "Aktualisieren",
                                onClick: (item) => {
                                    this.updateItem(item);
                                    this.view.current.hideDialog();
                                }
                            },
                            {
                                text: "Löschen",
                                onClick: (item) => {
                                    this.deleteItem(this.getItemFromId(item[0]));
                                    this.view.current.hideDialog();
                                }
                            }
                        ]} />);
                }
            }
            );
        }

        return buttons;
    }




    render() {

        let isAdmin = true;

        return (
            <div className="resourceContainer">
                <div className="resourceViewHeader">
                    {isAdmin ? this.getCreateItemButton() : null}
                </div>
                <ResourceView
                    ref={this.view}
                    header={["Name", "Kategorie", "Kosten", "Kosten/Monat", "Anzahl"]}
                    data={this.convertData()}
                    buttons={this.getTableButtons(isAdmin)} />
            </div>
        );
    }
}

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let colorStart = "#aaaa00";
        let colorEnd = "#4422dd";

        // mix color based on progress
        let color = colorEnd;


        return (
            <div className="progressBar">
                <div className="progressBarFill" style={{ width: this.props.progress + "%", backgroundColor: color }}></div>
            </div>
        );
    }
}

class ProgressCircle extends React.Component {

    render() {
        let levels = this.props.levels;
        let level = 0;
        for (let i = 0; i < levels.length; i++) {
            if (this.props.progress >= levels[i]) {
                level = i + 1;
            }
        }
        // progress from current to next level
        let prog = this.props.progress;
        if (level > 0) {
            prog = (this.props.progress - levels[level - 1]) / (levels[level] - levels[level - 1]) * 100.0;
        } else {
            prog = this.props.progress / levels[level] * 100.0;
        }
        if (level >= levels.length) {
            prog = 100;
        }

        // color from red to blue
        let startHue = 0;
        let endHue = 240;

        let hue = startHue + (endHue - startHue) * prog / 100.0;

        let color = "hsl(" + hue + ", 80%, 60%, 1.0)";
        let bgColor = "hsl(" + hue + ", 30%, 60%, 0.2)";


        // create svg path of hollow circle
        const thickness = 4;

        let desc = "Nächstes Level: noch " + (levels[level] - this.props.progress) + " Elemente";

        return (
            <div className="progressCircle" title={desc}>
                <svg viewBox="0 0 36 36" >
                    <path className="progressCircleFill" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth={thickness} stroke={color} strokeDasharray={prog + " " + (100 - prog)} />

                    <circle className="progressCircleBackground" cx="18" cy="18" r="15.9155" fill="none" strokeWidth={thickness} stroke={bgColor} />


                </svg>
                <div className="progressCircleInnerText">
                    Level {level}
                </div>
                <div className="progressCircleText">
                    {this.props.name}
                </div>
            </div>
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

        const hardwareLevels = [10, 25, 50, 100];
        const softwareLevels = [10, 25, 50, 100];
        const serviceLevels = [10, 25, 50, 100];

        let hardwareCount = 27;
        let softwareCount = 3;
        let serviceCount = 12;


        return (
            <div className="overviewView">
                {/*<div className="mainProgress">
                    <ProgressBar progress={50} />
        </div>*/}
                <div className="overviewRow">
                    <div className="costOverview" title="Monatliche Kosten durch Bestand und monatliches Budged">
                        <div className="costOverviewText">
                            Monatliche Kosten
                        </div>
                        <div className="costOverviewValue">
                            {formatEuro(1000)} / {formatEuro(2000)}
                        </div>
                        <div className="costOverviewInfo">
                            Mtl. Kosten / Mtl. Budget
                        </div>
                    </div>
                    <div className="costOverview" title="Investitionskosten von geplanten Elementen und Investitionsbudget">
                        <div className="costOverviewText">
                            Einmalige Kosten
                        </div>
                        <div className="costOverviewValue">
                            {formatEuro(1500)} / {formatEuro(2000)}
                        </div>
                        <div className="costOverviewInfo">
                            Einm. Kosten / Einm. Budget
                        </div>
                    </div>
                </div>
                <div className="overviewRow">
                    <ProgressCircle progress={hardwareCount} name={"Hardware"} levels={hardwareLevels} />
                    <ProgressCircle progress={softwareCount} name={"Software"} levels={softwareLevels} />
                    <ProgressCircle progress={serviceCount} name={"Service"} levels={serviceLevels} />
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

