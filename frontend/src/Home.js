import './Home.css';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {

  constructor(props) {
         super(props);
         this.state = {
            title: ''
         }
      }


  render() {
    return(

    <div class="home">

    <h1>Welcome to Grocery Prep!</h1>
    <p>Looking for a simple, healthy recipe? Want to try out something new? Look no further!</p>
    <p>Please check out some of my favorite, tried and true recipes below. I hope you enjoy!</p>
    <h2>Recipes</h2>

    <ul>
        <li><Link to= '/recipe/:Baked-Oatmeal'>Baked Oatmeal</Link></li>
        <li><Link to= '/recipe/:Summer-Pizza'>Summer Pizza </Link></li>
        <li><Link to= '/recipe/:Banana-Waffles'>Banana Waffles</Link></li>
        <li><Link to= '/recipe/:Veggie-Sushi'>Veggie Sushi </Link></li>
        <li><Link to= '/recipe/:Breakfast-Sweet-Potatoes'>Breakfast Sweet Potatoes</Link></li>
    </ul>

    <div>
        <img alt = "baked-oatmeal-pic" class="home_photo" src="https://lh3.googleusercontent.com/pw/ACtC-3dz8Afa2kI-F0T_6vl-nshBGfHA07bM88e2Uz520GNv_zxSKt5lMBGcUUxgMC4DO2bZeCgWurIztl3f8g-NnrG0_p4gK8ooh8ony3ug0MzQ02IjbqtgB44OrpGlLJEDpHqBlP7T6iZ9LVfMjOFOppze=w549-h684-no?authuser=0"/>
        <img alt="sushi-pic" class="home_photo" src="https://lh3.googleusercontent.com/pw/ACtC-3cUBQuTUCyxbrBoUgdpWKIgwHOttoKgTKYmso-h7FUuIal6Nt9gJE8r9eP40AdWB0f7IgO6KxTXIpL2do8sdHFWAO8YeVovRHwvcuZYr_9K2sgiuzUhXFdlcyt3Yj31tPBGreFaDXPjgTuIo3cr0xf7=w513-h684-no?authuser=0"/>
    </div>

    </div>

  )};
  };

export default Home;