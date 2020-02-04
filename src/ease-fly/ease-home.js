import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';
import '@polymer/app-route/app-location.js';
import './ajax-call.js';
import '@polymer/paper-checkbox/paper-checkbox.js'
/**
* @customElement
* @polymer
*/
class EaseFly extends PolymerElement {
    static get template() {
        return html`
<style include="shared-styles">
    :host {
        display: block;
        margin:0px;
        padding:0px;
        box-sizing: border-box;
        font-size: 1.2em;
    }
    #myBookings
    {
    height:40px;
    font-size: 1em;
    border:2px solid gray;
    padding-left:5px;
    }
    #myBookings,#booking-btn
    {
        float:right;
    }
    #noOfTraveller
    {
        top:0%;
        width: 120px;
        background:white;
        height:auto;
        padding-left:10px;
    }
    .wrapper {
        background: blueviolet;
        width:100%;
        height: auto;
    }

    ul {
        display: inline-flex;
        list-style: none;
        align-items: flex-start;
        
    }
    ul li 
    {
        padding:15px;
        margin-right: 10px;
    }
    ul li input
    {
        height:40px;
        font-size: 1em;
    }
    #from
    {
        width:110px;
    }
    #destination
    {
        width:110px;
    }
    #search
    {
        margin-top:20px;
        display: flex;
        justify-content: center;
    }
    #sortBy
    {
        margin-left:10px;
        width: 120px;
    }
</style>
<paper-button on-click="_handleMyBookings" id="booking-btn" raised>Check Your Bookings</paper-button>
<input id="myBookings" type="text" placeholder="Enter ReferenceID" />
<ajax-call id="ajax"></ajax-call>
<app-location route="{{route}}"></app-location>
<paper-radio-group selected="oneWay" id="tripType">
    <paper-radio-button name="oneWay">One Way</paper-radio-button>
    <paper-radio-button name="roundTrip">Round Trip</paper-radio-button>
</paper-radio-group>

<!--Test doc's -->
<nav class="wrapper">
    <ul>
        <li><input id="from" type="text" placeholder="From"/></li>
        <li><iron-icon icon=icons:compare-arrows></iron-icon></li>
        <li><input id="destination" type="text" placeholder="To" /></li>
        <li><input id="goingDate" type="date" /></li>
        <li><input id="returnDate" type="date" /></li>
        <li><label for="noOfTraveller">No. of travellers</label></li>
        <li>
            <paper-dropdown-menu id="noOfTraveller" name="noOfTraveller" vertical-offset="60">
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected=0>
                    <paper-item>1</paper-item>
                    <paper-item>2</paper-item>
                    <paper-item>3</paper-item>
                    <paper-item>4</paper-item>
                    <paper-item>5</paper-item>
                    <paper-item>6</paper-item>
                </paper-listbox>
            </paper-dropdown-menu>
        </li>
    </ul>
</nav>
<div id="search">
<paper-button on-click="_handleSearch" raised>Search</paper-button>
</div>
<paper-checkbox on-click="_handleFilter" id="indigo">Indigo</paper-checkbox>
<paper-checkbox on-click="_handleFilter" id="spiceJet">Spicejet</paper-checkbox>
<paper-dropdown-menu id="sortBy" name="sortBy" vertical-offset="60" on-change="_filterFlights">
                <paper-listbox slot="dropdown-content" id="sortBy" class="dropdown-content" selected=0>
                    <paper-item>Asc</paper-item>
                    <paper-item>Dsc</paper-item>
                </paper-listbox>
            </paper-dropdown-menu>
<table class="table">
    <thead>
        <tr>
            <th>Flight Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Price</th>
            <th>Book Now</th>
        </tr>
    </thead>
    <template is="dom-repeat" items={{flightsList}}>
    <tbody class="Data">
                <td>{{item.flightName}}</td>
                <td>{{item.startTime}}</td>
                <td>{{item.endTime }}</td>
                <td>{{item.price}}</td>
                <td><paper-button on-click="_handleBook" raised>Book Now</paper-button></td>
                </tbody>
                </template>
        </table>
`;
    }
    ready() {
        //listening custom events sent as a response by makeAjaxCall 
        super.ready();
        this.addEventListener('search-flights', (e) => this._searchFlights(e))
        this.addEventListener('filter-flights', (e) => this._filterFlights(e))
    }
    static get properties() {
        return {
            flightsList: {
                type: Array,
                value: []
            },
            data: {
                type: Object,
                value: {}
            },
            finalDate: String,
            from: String,
            destination: String,
            noOfTraveller: Number,
        };
    }
    //_handleFilter is used to filter the list of flights on the basis of flight name
    _handleFilter() {
        let j = 0, flightName = [];
        let filter = this.shadowRoot.querySelectorAll('paper-checkbox')
        for (let i = 0; i < filter.length; i++) {
            if (filter[i].checked) {
                console.log(filter[i].innerText)
                flightName[j] = filter[i].innerText;
                j++;

            }
            //creating object
            const postObj = {
                sourceName: this.from,
                destinationName: this.destination,
                date: this.finalDate,
                noOfTraveller: this.noOfTraveller
            }
            let sortBy = this.$.sortBy.value;
            this.$.ajax._makeAjaxCall('post', `http://10.117.189.208:8085/easefly/flights?flightName=${flightName[0]}&sortBy=${sortBy}`, postObj, 'filter')
        }
    }
    //_handleSearch is invoked when user clicks on search button
    _handleSearch() {
        sessionStorage.clear();
        this.finalDate = this.getDate()
        this.from = this.$.from.value;
        this.destination = this.$.destination.value;
        this.noOfTraveller = parseInt(this.$.noOfTraveller.value, 10);
        let travellerDetails = []
        this.data = { from: this.from, destination: this.destination, finalDate: this.finalDate }
        for (let i = 0; i < this.noOfTraveller; i++) {
            let obj = { name: "", gender: "", email: "", age: "" };
            travellerDetails.push(obj);
        }
        sessionStorage.setItem('travellerDetails', JSON.stringify(travellerDetails));
        this.$.ajax._makeAjaxCall("get", `http://10.117.189.208:8085/easefly/flights?date=${this.finalDate}&destinationName=${this.destination}&noOfTraveller=${this.noOfTraveller}&sourceName=${this.from}
`, null, 'search')
    }
    //getDate() returns the date in required format
    getDate() {
        const goingDate = this.$.goingDate.value
        let goDate = new Date(goingDate);
        const goYear = goDate.getFullYear();
        const goMonth = goDate.getMonth() + 1;
        const goDay = goDate.getDate();
        let formattedMonth = (goMonth.toString().length == 1) ? `0${goMonth}` : goMonth; //this.formatMonth(goMonth)
        let formattedDay = this.formatDay(goDay)
        this.formatDay(goDay)
        let dateString = `${goYear}-${formattedMonth}-${formattedDay}`;
        console.log(`${goYear}-${formattedMonth}-${formattedDay}`)
        return `${dateString}`;
    }
   
    /**
     * 
     * @param {*} event 
     */
    _handleBook(event) {
        sessionStorage.removeItem('flightDetails')
        this.data.flightName = event.model.item.flightName
        this.data.startTime = event.model.item.startTime
        this.data.endTime = event.model.item.endTime
        this.data.price = event.model.item.price
        this.data.flightId = event.model.item.flightId
        console.log(this.data.flightId)
        console.log(event.model.item.flightId)
        sessionStorage.setItem('flightDetails', JSON.stringify(this.data))
        this.set('route.path', '/book')
    }
    /**
     * @description: _searchFlights populates the list of available flights
     * @param {*} event 
     */
    _searchFlights(event) {
        this.flightsList = event.detail.data;
    }
    //
    /**
     * @description: _filterFlights filters the list of available flights
     * @author: Abhinav
     * @param {*} event 
     */
    _filterFlights(event) {
        this.flightsList = event.detail.data.flightList;
        console.log(this.flightsList)
    }
    /**
     * @deprecated
     * @param {*} month 
     */
    formatMonth(month)
    {
        console.log(month.toString().length)
        if(month.toString().length==1)
        {
            return `0${month}`
        }
        else{
            return `${month}`
        }
    }
    /**
     * 
     * @param {*} day 
     */
    formatDay(day) {
        if (day.toString().length == 1) {
            return `0${day}`
        }
        else {
            return `${day}`
        }
    }
    /**
     * 
     */
    _handleMyBookings() {
        let myBookingId = this.$.myBookings.value;
        sessionStorage.setItem('myBookingId', myBookingId);
        this.set('route.path', './confirmed')
    }
}

window.customElements.define('ease-home', EaseFly);