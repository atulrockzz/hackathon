import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './ajax-call.js';
import './shared-styles.js';
import '@polymer/paper-button/paper-button.js';

/**
 * @customElement
 * @polymer
 */
class EaseBookingsConfirmed extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <ajax-call id="ajax"></ajax-call>
      <app-location route="{{route}}"></app-location>
      <button on-click="_handleBack"><iron-icon icon="icons:arrow-back"></iron-icon></button>
      <div>
        <h3>Booking Details</h3>
        <ul class="details">
        <li>Flight Id : {{flightDetails.booking.bookingId}}</li>
        <li>No. of Passangers : {{flightDetails.booking.noOfSeats}}</li>
        <li>Total Price : {{flightDetails.booking.totalPrice}}</li>
        <li>TravelDate : {{flightDetails.booking.travelDate}}</li>
        </ul>
      </div>
      <h3>Travellers Details</h3>
      <table>
      <thead id="tableHead">
         <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Email</th>
      </tr>
      </thead>
        <tbody>
          <template is="dom-repeat" items={{flightDetails.travellerList}}>
          <tr>
            <td>{{item.travellerId}}</td>
            <td>{{item.travellerName}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.emailId}}</td>
        </tr>
      </template>
    </tbody>
  </table>
  <paper-button on-click="_handleCancel" raised>Cancel</paper-button>
    `;
  }
  static get properties() {
    return {
    travelDetail:{
      type:Array,
      value:[]
    },
    flightDetails:{
      type:Object,
      value:{}
    },
    totalPrice:{
      type:Number,
      value:0
    }
    };
  }
  ready() {
    //listening custom events sent as a response by makeAjaxCall 
    super.ready();
    this.addEventListener('myBookings', (e) => this._myBookings(e))
}
  connectedCallback()
  {
    super.connectedCallback();
    this.$.ajax._makeAjaxCall("get", `http://10.117.189.208:8085/easefly/flights/bookings/${sessionStorage.getItem('myBookingId')}`,null,'myBookings')
  }
  _myBookings(event){
    this.flightDetails=event.detail.data
  }
  _handleCancel(event){
    this.$.ajax._makeAjaxCall("post", `http://10.117.189.208:8085/easefly/bookingCancel?bookingId=${sessionStorage.getItem('myBookingId')}`,null,'')
    // alert('your Booking has been cancelled');
  }
  _handleBack(){
    this.set('route.path','/home')
  }
}

window.customElements.define('ease-bookings-confirmed', EaseBookingsConfirmed);
