import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
/**
 * @customElement
 * @polymer
 */
class EaseReview extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div>
        <h3>Flight Details</h3>
        <span>FlightName : {{flightDetails.flightName}}</span>
        <span>Departure Time : {{flightDetails.startTime}}</span>
        <span>Arrival Time : {{flightDetails.endTime}}</span>
        <span>Price : {{flightDetails.price}}</span>
      </div>
      <h3>Travellers Details</h3>
      <table>
      <thead id="tableHead">
         <tr>
          <td>Name</td>
          <td>Age</td>
          <td>Gender</td>
          <td>Email</td>
      </tr>
      </thead>
        <tbody>
          <template is="dom-repeat" items={{travelDetail}}>
          <tr>
            <td>{{item.name}}</td>
            <td>{{item.age}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.email}}</td>
        </tr>
      </template>
    </tbody>
  </table>
  <label for="total">Total:</label><span>{{totalPrice}}</span>
      <paper-button raised on-click="_handleClick">BookNow</paper-button>
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
    },
    totalPrice:{
      type:Number,
      value:0
    }
    };
  }
  connectedCallback(){
    super.connectedCallback();
    this.travelDetail=JSON.parse(sessionStorage.getItem('travelDetail'));
    this.flightDetails=JSON.parse(sessionStorage.getItem('flightDetails'))
    this.totalPrice=parseFloat(this.travelDetail.length,10)*parseFloat(this.flightDetails.price,10)
  }
}

window.customElements.define('ease-review', EaseReview);