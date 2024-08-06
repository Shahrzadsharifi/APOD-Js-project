
let arrFav = [];
localStorage.setItem("arrFav", arrFav);
// console.log(arrFav);

document.getElementById("submit-form").addEventListener("click", (e) => {
  e.preventDefault();

  let apiDate = $('#date').val();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  // console.log(localStorage.getItem("arrFav"));
  // console.log(apiDate);
  // console.log(today);

  let getApiDate = new Date(apiDate).getTime();
  let GetToday = new Date(today).getTime();

  // console.log({ getApiDate });
  // console.log({ GetToday });

  if (GetToday > getApiDate) {
    apiDate = apiDate;
  } else {
    apiDate = today;
  }

  // console.log('you: ', apiDate);

  let apiKey = "api_key=GUsRG9S0tXoh3SFQGHFKxaTwBZ9NqczLvOQXXUjB";
  let apiUrl = "https://api.nasa.gov/planetary/apod?" + apiKey;
  let apiDateUrl = "https://api.nasa.gov/planetary/apod?"

  const fetchNASAData = async () => {
    try {
      // const response = await fetch(`${url}${api_key}`)
      const response = await fetch(apiDateUrl + "date=" + apiDate + "&" + apiKey)
      const data = await response.json()
      // console.log('NASA APOD data', data)
      document.getElementById("id-container").style.display = "block";
      displayData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const displayData = data => {
    document.getElementById('api-title').textContent = data.title;
    document.getElementById('api-date').textContent = data.date;
    document.getElementById('api-img').src = data.hdurl;
    document.getElementById('explanation').textContent = data.explanation;
    document.getElementById('btnDate').value = data.date;
    // document.getElementById("api-btn").innerHTML +=
    //   // '<button class="btn btn-primary favbtn" id="btnDate" click=' +
    //   '<button class="btn btn-primary favbtn" id="btnDate" value="' +
    //   data.date +
    //   '" onClick="addItem(this)" >Save to Favorites</button>';
  }

  fetchNASAData()

})



function addItem(elmt) {
  alert(elmt.value);
  // let arrFav = localStorage.getItem("arrFav");
  // console.log(localStorage.getItem("arrFav"));
  if ( !arrFav.includes(elmt.value) ) {
    arrFav.push(elmt.value);
    localStorage.setItem("arrFav", arrFav);
    console.log(arrFav);
  }
}