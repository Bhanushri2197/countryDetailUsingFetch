let bodyContainer = document.createElement("div");
bodyContainer.classList.add("bodyContainer");
bodyContainer.style.cssText="background:#042d2f"
let container = document.createElement("div");
container.classList.add("container");
let cardsBlock = document.createElement("div");
cardsBlock.classList.add("card-group")
let cardsrow = document.createElement("div");
cardsrow.classList.add("row");
container.appendChild(cardsBlock);
bodyContainer.appendChild(container);
document.body.appendChild(bodyContainer);




fetch("https://restcountries.com/v3.1/all",{
    method : "GET"
})
.then((data) => {
  let resultJ= data.json();

  return resultJ;
})
.then((output) => {
    console.log(output)
   output.forEach(element => {
    let column = document.createElement("div");
    column.classList.add("col-lg-3" ,"col-md-4", "col-sm-12","mb-3","mt-3");
    let card = document.createElement("div");
    card.classList.add("card","text-center");
    card.style.cssText = "border: 0;box-shadow: 1px 1px 5px #cacaca;"
    let cardHead = document.createElement("div");
    cardHead.classList.add("card-header");
    cardHead.style.cssText ="background: #042d2f;color: white;"
    cardHead.innerHTML = element.name.common;
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.style.cssText="font-size:13px;background: rgb(4,40,40);background: linear-gradient(93deg, rgba(4,40,40,1) 0%, rgba(8,169,220,1) 100%);color:#fff"
    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img");
    cardImg.src = element.flags.png;
    cardImg.style.cssText = "width:180px;height:120px;margin-bottom:15px";
    let cardcaps = document.createElement("div");
    cardcaps.classList.add("card-caps");
    cardcaps.innerHTML = `Capital : ${element.capital}`;
    let cardRegion = document.createElement("div");
    cardRegion.classList.add("card-region");
    cardRegion.innerHTML = `Region : ${element.region}`;
    let cardlatlng = document.createElement("div");
    cardlatlng.classList.add("card-latlng");
    cardlatlng.innerHTML = `Latlng : ${element.latlng}`
    let cardcode = document.createElement("div");
    cardcode.classList.add("card-code");
    cardcode.innerHTML = `Country code : ${element.cca2}`
    let cardbtn = document.createElement("button");
    cardbtn.classList.add("card-btn");
    cardbtn.style.cssText = "border: 2px solid #fff;background: #ffffff47;color: #fff;font-size: 12px;border-radius: 5px;margin-top: 10px;";
    cardbtn.innerText = "Click for Weather";
    cardbtn.addEventListener('click', function()  {
        const apiKey = '6111a521b5ca9bfd8ad4f68872690e19';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element.name.common}&appid=` + apiKey;
        
        fetch(apiUrl,{
            method: "GET"
        })
        .then((climate)=>{
            let forecast = climate.json();
            return forecast;
        })
        .then((weather) => {
            console.log(weather);
            alert(`The current Weather of ${weather.name} is ${weather.weather[0].description}  `)
        })
        .catch( (error) => {
          console.error('Error fetching weather data:', error);
        })
    })
    cardBody.append(cardImg,cardcaps,cardRegion,cardlatlng,cardcode,cardbtn);
    card.append(cardHead,cardBody);
    column.append(card);
    cardsrow.appendChild(column);
    cardsBlock.append(cardsrow);
   }); 

})