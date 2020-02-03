import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class EaseBookingsConfirmed extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'ease-bookings-confirmed'
      }
    };
  }
}

window.customElements.define('ease-bookings-confirmed', EaseBookingsConfirmed);
