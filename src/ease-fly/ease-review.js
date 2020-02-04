import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class EaseReview extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .details
        {
            font-size:1.2em;
            font-family:sans-serif;
            margin:2px;
        }
        button
        {
          cursor:pointer;
        }
      </style>
      <app-location route="{{route}}"></app-location>
      <button on-click="_handleBack"><iron-icon icon="icons:arrow-back"></iron-icon></button>
      <div>
        <h3>Flight Details</h3>
        <ul class="details">
        <li>Flight Name : {{flightDetails.flightName}}</li>
        <li>Departure Time : {{flightDetails.startTime}}</li>
        <li>Arrival Time : {{flightDetails.endTime}}</li>
        <li>Price : {{flightDetails.price}}</li>
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
          <template is="dom-repeat" items="{{travelDetail}}" >
          <tr>
            <td>{{item.travellerName}}</td>
            <td>{{item.age}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.emailId}}</td>
        </tr>
      </template>
    </tbody>
  </table>
  <label for="total">Total:</label><span>{{totalPrice}}</span>
      <paper-button raised on-click="_handleClick">Proceed to pay</paper-button>
    `;
  }
  static get properties() {
    return {
      travelDetail: {
        type: Array,
        value: []
      },
      flightDetails: {
        type: Object,
        //default value???
      },
      totalPrice: {
        type: Number,
        value: 0
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.travelDetail = JSON.parse(sessionStorage.getItem('travelDetail'));
    this.flightDetails = JSON.parse(sessionStorage.getItem('flightDetails'))
    this.totalPrice = parseFloat(this.travelDetail.length, 10) * parseFloat(this.flightDetails.price, 10)
  }
  /**
   * @description: _handleBack() is fired when back button is clicked
   */
  _handleBack() {
    this.set('route.path', '/book')
  }
  //_handleClick() is fired when proceed to pay button is clicked
  _handleClick() {
    this.set('route.path', '/payments')
  }
}

window.customElements.define('ease-review', EaseReview);