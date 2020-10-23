"use strict";

// search_filter is the id of the search form
$('#search_filter').on('submit', (evt) => {
    // alert("keep trying"); // Debug line to make sure function (evt) is working
    
    // Prevent the form submission from the default behavior of reloading a new page
    evt.preventDefault(); 

    // Collect the parameters from the form to pass through the route
    // /results.json later
    let formData = {
        month: $('#month').val(),
        tavg: $('#tavg').val(),
        tmin: $('#tmin').val(),
        tmax: $('#tmax').val()
    };

    // console.log(formData); // Debug line to verify the data being captured in the formData variable

    const displayResults = (response) => {
        
        const listOfCities = response.city;

        const container = $('#search_results');

        container.empty()

        for (const city of listOfCities) {
            container.append(`
                <li> ${city.city_name} (${city.country}): ${city.tavg} (${city.month})</li>`
                );
        }
    }
    
    $.get('/results.json', formData, displayResults)
       // $.get('/results.json', formData, (results) => {
    //     $('#search_results').text(results.city[0].city_name);
    // })
});