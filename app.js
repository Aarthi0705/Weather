const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  console.log(req.body.cityName);


  const place = req.body.cityName;
  const unit = "metric";
  const appId="8e6e9fbc7a3e8b51ab65b0b23d8d932e";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&units="+unit+"&appid="+appId;

  https.get(url,function(response){
    console.log(response.statusCode);

  response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    // const img = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<p>The weather is curently "+desc+"<p>");
    res.write("<h1>The temperature in "+ place+ " is "+ temp + " degree Celcius.</h1>");
    // res.write("<img src =" + imageURL + ">");
    res.send();
  })
});
});

app.listen(3000,function(){
  console.log("Server is running on port 3000")
});
