import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-icon/iron-icon';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { setRootPath } from '@polymer/polymer/lib/utils/settings.js';
/**
 * @customElement
 * @polymer
 */
setRootPath(MyAppGlobals.rootPath);
class EaseFly extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --my-home-theme:{
          background-color:pink;
        }
        --my-card-content:{
          text-transform: capitalize;
        }
        }
        app-toolbar {
          background-color: #dcdcdc;
          display:flex;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #333;
        }
        
        li {
          float: left;
          border-right:1px solid #bbb;
        }
        
        li:last-child {
          border-right: none;
        }
        
        li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }
        
        li a:hover:not(.active) {
          background-color: #111;
        }
        
        .active {
          background-color: blueviolet;
        }
        [hidden] {
          display: none !important;
        }
      </style>
      <app-location id="location" route="{{route}}"></app-location>
    <app-route route="{{route}}" data="{{routeData}}" pattern="[[rootPath]]:page" tail="{{subRoute}}"></app-route>
    <app-drawer-layout force-narrow>
      <app-drawer id="drawer" slot="drawer">
        <app-toolbar></app-toolbar>
        <!-- Nav on mobile: side nav menu -->
        <paper-listbox selected="[[page]]" attr-for-selected="name">
          <template is="dom-repeat" items="{{items}}">
          <a href="[[rootPath]]{{item.route}}" class="link">
            <paper-item name$="{{item.route}}">{{item.label}}</paper-item>
            </a>
          </template>
        </paper-listbox>
      </app-drawer>
      <app-header-layout has-scrolling-region>
        <app-header class="main-header" slot="header">
          <app-toolbar>
            <paper-icon-button class="menu-button" icon="menu" drawer-toggle hidden$="{{wideLayout}}">
            </paper-icon-button>
            <p>Ease Fly</p>
          </app-toolbar>
          <app-toolbar class="tabs-bar" hidden$="{{!wideLayout}}">
            <!-- Nav on desktop: tabs -->
              <template is="dom-repeat" items="{{items}}">
              <ul>
  <li><a href="[[rootPath]]{{item.route}}" class="link">{{item.label}}</a></li>
</ul>
              </template>
          </app-toolbar>
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main" fallback-selection="error404">
            <ease-home id="home" name="home"></ease-home>
            <ease-login name="login"></ease-login>
            <ease-bookings-confirmed name="confirmed"></ease-bookings-confirmed>
            <ease-bookings-cancelled name="cancelled"></ease-bookings-cancelled>
            <ease-book-now name="book"></ease-book-now>
            <ease-payments name="payments"></ease-payments>
            <ease-review name="review"></ease-review>
            <error-view name="error404"></error-view>
          </iron-pages> 
        </app-header>
      </app-header-layout>
    </app-drawer-layout>
    <iron-media-query query="min-width: 600px" query-matches="{{wideLayout}}"></iron-media-query>
    `;
  }
  constructor()
  {
    super();
    setPassiveTouchGestures(true);
  }
  ready() {
    super.ready();
    //adding active class to the clicked tab on nav-bar
    afterNextRender(this, () => {
      let navs = this.shadowRoot.querySelectorAll('ul li')
      for (let i = 0; i < navs.length; i++) {
        navs[i].addEventListener('click', (event) => {
          for (let nav of navs) {
            nav.classList.remove('active')
          }
          navs[i].classList.add('active')
        })
      }
    });
  }
  static get properties() {
    return {
      page: {
        type: String,
        observer: '_pageChanged'
      },
      wideLayout: {
        type: Boolean,
        value: false,
        observer: 'onLayoutChange',
      },
      items: {
        type: Array,
        value: function () {
          return [{ label: 'Home', route: 'home'},{ label: 'login', route: 'login'},{ label: 'payment', route: 'payment'}]
        }
      }
    };

  }
  /**
  *simple observer which is triggered when page property is changed
  *@param {String} newPage value of changed page 
  **/
  _pageChanged(newPage) {
    console.log(newPage)
    //Depending upon the changed page it lazy-imports the url
    switch (newPage) {
      case 'home': import('./ease-home.js')
        break;
      case 'login': import('./ease-login.js')
        break;
      case 'book': import('./ease-book-now.js')
        break;
      case 'payments': import('./ease-payments.js')
        break;
      case 'review': import('./ease-review.js')
        break;
      case 'confirmed': import('./ease-bookings-confirmed.js')
        break;
      case 'cancelled': import('./ease-bookings-cancelled.js')
        break;
      default: import('./error-view.js')
        break;
    }
  }
  /**A simple observer triggers only any changes happens to the properties defined. 
  * Hence a complex observer is required to trigger any changes happens to app (including page load).
  * Hence complex triggers is required to define to observe changes on first time page load.
  **/
  static get observers() {
    return ['_routerChanged(routeData.page)']
  }
  /**
   * @author: Abhinav
   *@param {String} page Value of new page
  **/
  _routerChanged(page) {
    console.log(page)
    this.page = page || 'login';
  }
  /**
   *onLayoutChange() is a simple observer which is triggered when wideLayout Property is changed.
   It closes the drawer if the layout is wider than 600px
   *@param {Boolean} wide tells that layout is wide or not? it's a value in true or false
  **/
  onLayoutChange(wide) {
    var drawer = this.$.drawer;

    if (wide && drawer.opened) {
      drawer.opened = false;
    }
  }
}

window.customElements.define('ease-fly', EaseFly);
