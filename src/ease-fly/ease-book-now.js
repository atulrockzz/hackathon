import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-card/paper-card.js'
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
      </style>
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
          <td><paper-input id="name" > </paper-input></td>
          <td> <paper-input id="age" > </paper-input></td>
          <td><paper-radio-group id="gender">
            <paper-radio-button name="male">Male</paper-radio-button>
            <paper-radio-button name="female">female</paper-radio-button>
          </paper-radio-group></td>
          <td> <paper-input id="email"> </paper-input></td>
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
       value:[{name:'1',age:'2',gender:'3',email:'4'},{name:'1',age:'2',gender:'3',email:'4'},{name:'1',age:'2',gender:'3',email:'4'}]
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
  // connectedCallback(){
  //   this.travellers.push(sessionStorage.getItem('travellers'));
  // }
  /*getting the details of travellers on clicking Book Now button 
  *creating a object of all the travellers and pushing it to session storage
  */ 
  _handleClick(){
    console.log(this.travellers)
     for(let i=0;i<this.travellers.length;i++){
     const name=this.travellers[i].name;
     const age=  this.travellers[i].age;
     const gender=this.travellers[i].gender;
     const email= this.travellers[i].email;
     let obj={name,age,gender,email};
      this.travellerDetails.push(obj);
   }
   sessionStorage.setItem('travellerDetails',JSON.stringify(this.travellerDetails));
   console.log(this.travellerDetails)
  }
}

window.customElements.define('ease-book-now', EaseBookNow);
