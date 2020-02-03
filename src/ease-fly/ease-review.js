import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

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
        <span>{{flightDetails.flightName}}</span>
        <span>{{flightDetails.startTime}}</span>
        <span>{{flightDetails.endTime}}</span>
        <span>{{flightDetails.price}}</span>
      </div>
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
          <template is="dom-repeat" items={{travellers}}>
          <tr>
            <label for="name"></label>
            <td><h3 id="name">{{item.name}}</h3></td>
            <label for="age"></label>
            <td> <h3 id="age">{{item.age}}</h3></td>
            <label for="gender"></label>
            <td><paper-radio-group id="gender" selected={{item.gender}}>
              <paper-radio-button name="male">Male</paper-radio-button>
              <paper-radio-button name="female">female</paper-radio-button>
            </paper-radio-group></td>
            <label for="email"></label>
            <td> <h3 id="email">{{item.email}}</h3></td>
        </tr>
      </template>
    </tbody>
  </table>
      <paper-button raised on-click="_handleClick">BookNow</paper-button>
    `;
  }
  static get properties() {
    return {
    
    };
  }
}

window.customElements.define('ease-review', EaseReview);
