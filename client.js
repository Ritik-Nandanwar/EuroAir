// Q1 replace the ????? so that this event listener handles click events on
// the 'search for flight' button
document.getElementById("btnFlightSearch").addEventListener("click", () => {
  // Q2 complete these statements to read destination and date from form
  const city = document.getElementById("theDest");
  const date = document.getElementById("theDate");
  const bookFilghtBtn = document.getElementById("bookFlight");
  const fNumber = document.getElementById("fNumber");
  const destCity = document.getElementById("destCity");
  const theDate2 = document.getElementById("theDate2");
  const departTime = document.getElementById("departTime");
  const arriveTime = document.getElementById("arriveTime");
  const price = document.getElementById("price");
  const numSeats = document.getElementById("numSeats");
  const btnFlightAdd = document.getElementById("btnFlightSearch");

  btnFlightAdd.addEventListener("click", () => {
    console.log("added");
  });

  // Q3 complete the fetch API call to send the user's chosen city and
  // date to the 'flight search' route in server.js. You will need to look
  // at the server.js code to complete this successfully.
  // http://127.0.0.1:5500/search/Paris/010621
  //   fetch(`http://127.0.0.1:3000/search/${city.value}/${date.value}`)
  //     .then((response) => {
  //       console.log(response.json());
  //     })

  fetch(`http://127.0.0.1:3000/search/${city.value}/${date.value}`)
    .then((response) => response.json())
    .then((data) => {
      const actualData = data;
      //   console.log(data);
      // Q6 complete so that it parses the JSON returned and outputs the
      // data to the searchResults <div> in the format shown on the paper.
      const searchResultsDiv = document.getElementById("searchResults");
      const dataToOp = actualData.map(
        (data) => `
        <span>Flight number</span> - ${data.fnumber} <br/>
        <span>Destinaton</span> - ${data.endcity} <br/>
        <span>Date</span> - ${data.date} <br/>
        <span>Departure</span> - ${data.depart} <br/>
        <span>Arrival</span> - ${data.arrive} <br/>
        <span>Price</span> - ${data.price} <br/>
        <span>Number of seats</span> - ${data.nseats} <br/>
        //  Q8 update with a book button - see question paper
        <form method="POST" action=http://localhost:3000/flightbook/${data.fnumber}><button id="bookFlight" onclick= "console.log('bookedd')";
        >Book</button></form>
        
        <hr/>
        `
      );
      searchResultsDiv.innerHTML = dataToOp;
    });
  bookFilghtBtn.addEventListener("click", () => {
    console.log("BOOKED");
  });
});

// Q9 replace the ????? so that this event listener handles click events on
// the 'add flight' button
// Note the event listener has been setup to be an async function - this may help you
document.getElementById("btnFlightAdd").addEventListener("click", async (e) => {
  // 	// Q9 complete these statements to read flight details from the form
  e.preventDefault();
  const number = document.getElementById("fNumber")
  const dest = document.getElementById("destCity");
  const date = document.getElementById("theDate2");
  const deptime = document.getElementById("departTime");
  const arrtime = document.getElementById("arriveTime");
  const thePrice = document.getElementById("price");

  var formData = {
    number : number.value,
    dest: dest.value ,
    date: date.value ,
    deptime : deptime.value ,
    arrtime: arrtime.value,
    thePrice: thePrice.value ,
  };
  console.log(JSON.stringify(formData) );
  // 	// Q9 complete the fetch API call to send the data to the 'add flight'
  // 	// route on the server as a POST request...
  // async function postData(
  //   url = "",
  //   data = {  }
  // ) {
  // Default options are marked with *
  //     const response = await fetch(url, {
  //       method: "POST", // *GET, POST, PUT,
  //       body: JSON.stringify(data), // body data type must match "Content-Type" header
  //       headers: {"Content-type": "application/json; charset=UTF-8"}
  // }).then(response => response.json())
  // .then(json => console.log(json));

  const options = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  };
  await fetch("http://127.0.0.1:3000/flightadd", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });

  //   postData('http://127.0.0.1:3000/flightadd', { number, dest, date, deptime, arrtime, thePrice })
  //   .then(data => {
  //     console.log(data); // JSON data parsed by `data.json()` call
  //   });

  // 	// Q12 modify Q9 answer to handle non-200 status codes. Ensure that
  // 	// user-friendly error messages are displayed to the user in the
  // 	// 'flightAddStatus' <div>.
  // });

  // // Q13 replace the ????? so that this event listener handles click events on
  // // the login button
  // // Note the event listener has been setup to be an async function - this may help you
  // document.getElementById('?????').addEventListener('click', async() => {

  // 	// Q13 complete these statements to read login details from the form
  // 	const u = ?????;
  // 	const p = ?????;

  // 	// Q13 complete the fetch API call to send the data to the login
  // 	// route on the server as a POST request...

  // 	// Q14 modify Q13 answer so that if the user did not log in correctly,
  // 	// a user-friendly error message is displayed to the user in the
  // 	// 'loginStatus' <div>.
  // });
});
