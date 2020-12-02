"use strict";

function About() {
  return (
    <React.Fragment>
      <div className="container">
        <h1>About</h1>
        <div className="about-paragraph results" id="about">
          
          <p>This project is the capstone of my part-time Software Engineering Bootcamp, in which I dabble in the world of coding 
            and learn a new approach to problem solving. 
          </p>
          <p>As someone who believes in traveling and is frequently in awe of how beautiful life is, 
            I took up my friend's idea to build an application to search for destinations around the 
            world based on one's climate preferences at given time of the year.
          </p>
          <p>A heartfelt thank-you to my instructors, my fellow classmates, mentors, and friends who 
            motivated and helped me along the way to put this project in your hand.
          </p>
        </div>
     
        <div className="about-paragraph results">
          <h3>Climate Data</h3>
          <p>Climate data is based on long-term averages of historical weather observations over a 30-year period from 1960 to 1990. </p>
          <p>Source: <a href="https://meteostat.net/" target="_blank">Meteostat</a>. 
            Raw data provided by <a href="https://www.noaa.gov/" target="_blank">NOAA</a>, 
              <a href="https://www.dwd.de/" target="_blank"> DWD</a> and
              <a href="https://dev.meteostat.net/docs/sources.html" target="_blank"> others</a>.
          </p>
        </div>
        
        <div className="about-paragraph results">
          <h3>World Cities Database</h3>
          <p>The list of ~26,000 cities and their longtitudes and lattitudes are retrieved from <a href="https://simplemaps.com/data">SimpleMaps</a>.</p>
        </div>
        
        <div className="about-paragraph results">
          <h3>Country and Continent Database</h3>
          <p>Country and continent codes list is made available by 
            <a href="https://datahub.io/JohnSnowLabs/country-and-continent-codes-list#python"> DataHub.io </a>
            and <a href="https://www.freeformatter.com/iso-country-list-html-select.html">FreeFormatter</a>.
          </p>
        </div>

        <div className="about-paragraph results">
          <h3>Photography</h3>
          <p>It is my honor to showcase amazing nature photos taken by my kind & talented friend Natalie Wong.
            Check out <a href="https://nat0graphy.com/"> nat0graphy.com </a> for more of her work.
          </p>
        </div>
        
      </div>
    </React.Fragment>
  )
}