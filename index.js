const express = require("express"); 
const hbs = require("express-handlebars");
const path = require("path"); 
const app = express(); 
const getAPI = require("./lib/getAPI");
const bodyParser = require("body-parser");

require("dotenv").config(); 

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", async (req, res) => {
  let flight = req.body.flight
  let data = await getAPI.getUpcomingLaunch(flight);

  
  let FlightNo = data.flight_number
  let Mission = data.mission_name
  let Launch = data.launch_year
  let Name = data.rocket.rocket_name
  let Type = data.rocket.rocket_type
  let ID = data.rocket.second_stage.payloads[0].payload_id
  let Customer = data.rocket.second_stage.payloads[0].customers
  let Nationality = data.rocket.second_stage.payloads[0].nationality
  let Manufacturer = data.rocket.second_stage.payloads[0].manufacturer
  let Payload = data.rocket.second_stage.payloads[0].payload_type
  let Launchsite = data.launch_site.site_name_long
  let Success = data.launch_success
  let Description = data.details
  

  res.render("index", {
    data: {
      Mission,
      FlightNo,
      Launch,
      Name,
      Type,
      Customer,
      ID,
      Nationality,
      Manufacturer,
      Payload,
      Launchsite,
      Success,
      Description
    }
    
  }); 
});

app.use(( req, res, next) => {
  if(res.status(404)){
    res.render("404")
    return
  }
  next();
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
