import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';
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
      <app-location route="{{route}}" ></app-location>
    <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type="application/json"> </iron-ajax>
    <paper-toast id="toast" text={{message}} ></paper-toast>
    `;
    }
    static get properties() {
        return {
           
        };
    }
    ajaxCall(method, url, obj, action) {
        const ajax = this.$.ajax
        this.action = action
        ajax.body = obj ? JSON.stringify(obj) : undefined;
        ajax.method = method;
        ajax.url = url;
        ajax.generateRequest();
    }
    _handleResponse(event) {
        switch (this.action) {
       
        }
    }
    openToast(message){
        this.message=message;
        this.$.toast.open();
    }   
}
window.customElements.define('ajax-call', AjaxCall);
