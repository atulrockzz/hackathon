import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-card/paper-card.js'
import '@polymer/app-route/app-location.js';
import '@polymer/iron-icon/iron-icon.js'

/**
 * @customElement
 * @polymer
 */
class EaseBookNow extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #tableHead{
          font-size: 18px;
         text-align: center;
        }
        #name,#age,#gender,#email{
          margin-left: 20px;
        }
        #gender{
          margin-top:26px;
        }
        button
        {
            cursor:pointer;
        }
      </style>
      <app-location route="{{route}}"></app-location>
      <button on-click="_handleBack"><iron-icon icon="icons:arrow-back"></iron-icon></button>
    <h2>Enter your Details</h2>
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
          <td><paper-input class="name" > </paper-input></td>
          <td> <paper-input class="age" > </paper-input></td>
          <td><paper-radio-group class="gender">
            <paper-radio-button name="male">Male</paper-radio-button>
            <paper-radio-button name="female">Female</paper-radio-button>
          </paper-radio-group></td>
          <td> <paper-input class="email"> </paper-input></td>
      </tr>
    </template>
  </tbody>
</table>
    <paper-button raised on-click="_handleClick">Confirm Booking</paper-button>
    `;
  }
  static get properties() {
    return {
     travellers:{
       type:Array,
       value:[]
     },
     travellerDetails:{
      type:Array,
      value:[]
    }
    };
  }
  /*getting the no. of travellers from session storage 
  *displaying no. of properties to get the data of travellers accordingly
  */ 
  connectedCallback(){
    super.connectedCallback();
    this.travellers=JSON.parse(sessionStorage.getItem('travellerDetails'));
  }
  /*getting the details of travellers on clicking Book Now button 
  *creating a object of all the travellers and pushing it to session storage
  */ 
  _handleClick(){
    sessionStorage.removeItem('travelDetail');
    let name=this.shadowRoot.querySelectorAll('.name');
    let age=this.shadowRoot.querySelectorAll('.age');
    let gender=this.shadowRoot.querySelectorAll('.gender');
    let email=this.shadowRoot.querySelectorAll('.email');
    let primaryTravellerFlag;
     for(let i=0;i<this.travellers.length;i++){
       if(i==0)
       {
        primaryTravellerFlag=true
       }
       else{
        primaryTravellerFlag=false
       }
     let obj={travellerName:name[i].value,gender:gender[i].selected,age:parseInt(age[i].value),emailId:email[i].value,primaryTravellerFlag};
      this.travellerDetails.push(obj);
   }
   sessionStorage.setItem('travelDetail',JSON.stringify(this.travellerDetails));
   this.set('route.path','/review')
  }
  _handleBack(){
    this.set('route.path','/home')
  }
}

window.customElements.define('ease-book-now', EaseBookNow);