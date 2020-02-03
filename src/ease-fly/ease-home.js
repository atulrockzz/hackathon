import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';
import '@polymer/app-route/app-location.js';
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
    paper-dropdown-menu
    {
        position:absolute;
        top:0%;
        width: 120px;
        background:white;
        height:auto;
        padding-left:10px;
    }
    .wrapper {
        background: blueviolet;
        height: 100px;
    }

    ul {
        display: inline-flex;
        list-style: none;
        align-items: flex-start;
        position: relative;
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
</style>
<app-location route="{{route}}"></app-location>
<paper-radio-group selected="oneWay" id="tripType">
    <paper-radio-button name="oneWay">One Way</paper-radio-button>
    <paper-radio-button name="roundTrip">Round Trip</paper-radio-button>
</paper-radio-group>
<div class="wrapper">
    <ul>
        <li><input id="from" type="text" placeholder="From"/></li>
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
</div>
<div id="search">
<paper-button on-click="_handleSearch" raised>Search</paper-button>
</div>
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
static get properties() {
return {
prop1: {
type: String,
value: 'ease-home'
},
flightsList:{
    type:Array,
    value:[{flightName:"abc",startTime:"856",endTime:"sdfsd",price:"400"},{flightName:"abc",startTime:"856",endTime:"sdfsd",price:"400"}]
},
data:{
    type:Object,
    value:{}
}
};
}
//_handleSearch will be invoked when user clicks on search button
_handleSearch()
{
sessionStorage.clear();
const finalDate=this.getDate()
console.log(finalDate)
const from=this.$.from.value;
const destination=this.$.destination.value;
const noOfTraveller=this.$.noOfTraveller.value;
console.log(noOfTraveller,destination,from)
let travellerDetails=[]
this.data={from,destination,finalDate}
for(let i=0;i<noOfTraveller;i++)
{
    let obj={name:"",gender:"",email:"",age:""};
    travellerDetails.push(obj);
    console.log(obj)
}
console.log(travellerDetails)
sessionStorage.setItem('travellerDetails',JSON.stringify(travellerDetails));
}
//return the date in required format
getDate()
{
    const goingDate=this.$.goingDate.value
    const goDate=new Date(goingDate);
    const goYear=goDate.getFullYear();
    const goMonth=goDate.getMonth();
    const goDay=goDate.getDate();
    return `${goYear}-${goMonth}-${goDay}`;
}
_handleBook(event)
{
this.data.flightName=event.model.item.flightName
this.data.startTime=event.model.item.startTime
this.data.endTime=event.model.item.endTime
this.data.price=event.model.item.price
sessionStorage.setItem('flightDetails',JSON.stringify(this.data))
this.set('route.path','/book')
}
}

window.customElements.define('ease-home', EaseFly);