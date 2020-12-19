import './Recipe.css';
import React, { Component } from 'react';

class About extends Component {

  constructor(props) {
         super(props);
         this.state = {
            title: ''
         }
      }

  render() {
    return(

        <div class="about">
        <h1>About the Chef</h1>
        <p>Hello and welcome! If you are looking for a quick and simple recipe, this is the place to be.</p>
        <p>I have always been passionate about food. Whenever I visited my grandma when I was younger, she brought out her big red book full of collected recipes to find the perfect one. I loved flipping through the worn pages of the book and helping her cook for the family (especially her famous apple pie!). She inspired in me my first love of cooking and baking which has carried on to now. </p>
        <p>In high school, I joined the rowing team and with early morning wake-ups, I decided to meal-prep my lunches and snacks every week to ensure that I would be able to eat healthy and delicious foods. I learned the ins and outs of meal-prepping and loved the creativity of thinking of new recipes. I started a baking Instagram (@thspicybuysses) with my sister which has inspired me to try out new recipes like for sourdough cinnamon rolls and jam!</p>
        <p>Now, in college, I have missed my easy access to a kitchen. More than ever before, I've appreciated simple recipes that require a microwave at most. Please try out and enjoy these recipes just like I have!</p>
        <div class="about_photos">
            <img alt="rowing-pic" src="https://lh3.googleusercontent.com/pw/ACtC-3c0W0GUpUYuph2MJ7a-d4VBov_cAN2jTakM_MBji9WCx0zRckVSnegcL7Q4uGTG22kXObynN5qQu0SjEIwUBedrKLYSzs701TCqs0xAT6zl3HHyDbwcSigPhzUMpgd2fd-Qn6oHLvHz4mn0Ke5F0IuA=w1212-h684-no?authuser=0"/>
            <img alt="cinnamon-roll-pic" src="https://lh3.googleusercontent.com/pw/ACtC-3ei_4WR6OmigxcT-wbkw_uga2zSkeXp_i_rk5GcN2r16ARIcPVTj4l23XUpXb51sC7Rx0rbatQMVkIa7hjJQFkXYamEQ6oVBHj65zVWbV_JombUsjXmNYmKf-nLBSlhzjlhRvsMfzvk-0ddGLRWXBj_=w513-h684-no?authuser=0"/>
        </div>
        </div>
               )}
}


export default About;