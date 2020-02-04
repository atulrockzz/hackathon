import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js'
/**
 * @customElement
 * @polymer
 */
class AjaxCall extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
    <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type="application/json"> </iron-ajax>
    `;
    }
    static get properties() {
        return {
           
        };
    }
    _makeAjaxCall(method, url, obj, action) {
        const ajax = this.$.ajax
        this.action = action
        ajax.body = obj ? JSON.stringify(obj) : undefined;
        ajax.method = method;
        ajax.url = url;
        ajax.generateRequest();
    }
    _handleResponse(event) {
      const data=event.detail.response
        switch (this.action) {
          case 'search': this.dispatchEvent(new CustomEvent('search-flights',{bubbles:true,composed:true,detail:{data}}))
            break;
          case 'filter': this.dispatchEvent(new CustomEvent('filter-flights',{bubbles:true,composed:true,detail:{data}}))
            break;
          default:
       
        }
    } 
}
window.customElements.define('ajax-call', AjaxCall);
