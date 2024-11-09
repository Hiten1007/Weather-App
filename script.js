const weatherApp = (() => {
   let choice = "metric";

    function display(){
        init();
    }

    function setupEventListeners() {
        const metricButton = document.querySelector("#metric");
        metricButton.addEventListener("click", () => {
            choice = "metric";
            init();
        });

        const randomButton = document.querySelector("#random");
        randomButton.addEventListener("click", () => {
            choice = "random";
            init();
        });

        const searchButton = document.querySelector(".svg");
        searchButton.addEventListener("click", async (e) => {
            e.stopPropagation();
            const input = document.querySelector("#city");

            const resultBox = document.querySelector(".result");
            resultBox.textContent = "";

            const cityWeatherBox = await getInfo(input.value);
            resultBox.appendChild(cityWeatherBox);
            
        });
    }

    async function init(){
        const examplesBox = document.querySelector(".examples");
        examplesBox.textContent = "";  
        const resultBox = document.querySelector(".result");
        resultBox.textContent = "";  
        const input = document.querySelector("#city");
        input.value = "";

        const delhiBox = await getInfo("New Delhi");
        examplesBox.appendChild(delhiBox);
       
        const tokyoBox = await getInfo("Tokyo");
        examplesBox.appendChild(tokyoBox);

    }
    
    async function getInfo(p){
            const unitQuery = choice === "metric" ? "&unitGroup=metric" : "";
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${p}?key=FML6ZQ7UPF9A8KHCT5MFA52PR` + unitQuery);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
    
            return createBox(data, p);
        } catch (e) {
            return displayError();
        }
        
    }


   function createBox(data, p){
    const div = document.createElement("div");

    const head = document.createElement('h2');
    head.textContent = p;
    head.classList.add("boxhead");
    div.appendChild(head);

    const temperatureBox = createProperty("Temperature", data.days[0].temp + (choice === "metric" ? " °C" : " °F"));
    div.appendChild(temperatureBox);

    const windSpeedBox = createProperty("Wind Speed", data.days[0].windspeed + (choice === "metric" ? " m/s" : " mph"));
    div.appendChild(windSpeedBox);

    const humidityBox = createProperty("Humidity", data.days[0].humidity + "%");
    div.appendChild(humidityBox);

    div.appendChild(resolveCondition(data.currentConditions.conditions));

    div.classList.add("boxes");
    return div;
   }

   function createProperty(property, value){
    const box = document.createElement("div");

    const propertyBox = document.createElement("div");
    propertyBox.textContent = property + " :";
    propertyBox.classList.add("property");
    box.appendChild(propertyBox);

    const valueBox = document.createElement("div");
    valueBox.textContent = "" + value;
    valueBox.classList.add("value");
    box.appendChild(valueBox);

    box.classList.add("properties");
    return box;
    
   }

   function displayError(){
    const resultBox = document.createElement("div");
    resultBox.textContent = "No searches found";
    resultBox.style.color = "white";
    return resultBox;
   }

   function resolveCondition(conditions){
    const div = document.createElement("div");
    let string = conditions.split(", ");
    
    if(string.includes("Clear")){
        const clear = createImage("./SVGs/reshot-icon-sun-PSMYLH76Q3.svg");
        div.appendChild(clear);
    }
    if(string.includes("Partially cloudy")){
        const partiallyCloudy = createImage("./SVGs/reshot-icon-partly-cloudy-PTW7DJ5GSX.svg");
        div.appendChild(partiallyCloudy);
    }
    if(string.includes("Mostly cloudy")){
        const mostlycloudy = createImage("./SVGs/reshot-icon-cloudy-GDRKNX4WF8.svg");
        div.appendChild(mostlycloudy);
    }
    if(string.includes("Overcast")){
        const overcast = createImage("./SVGs/reshot-icon-cloudy-SL7KNBWD3M.svg");
        div.appendChild(overcast);
    }
    if(string.includes("Rain")){
        const rain = createImage("./SVGs/reshot-icon-umbrella-with-rain-GA92PSB65X.svg");
        div.appendChild(rain);
    }
    if(string.includes("Heavy Rain")){
        const heavyRain = createImage("./SVGs/reshot-icon-heavy-rain-W4E63SHR7P.svg");
        div.appendChild(heavyRain);
    }
    if(string.includes("Light Rain")){
        const lightRain = createImage("./SVGs/reshot-icon-light-rain-FSB7JXM9VR.svg");
        div.appendChild(lightRain);
    }
    if(string.includes("Snow")){
        const snow = createImage("./SVGs/reshot-icon-snowflake-TK5WALZX68.svg");
        div.appendChild(snow);
    }
    if(string.includes("Heavy Snow")){
        const heavySnow = createImage("./SVGs/reshot-icon-heavy-snowing-T6VYHUANP7.svg");
        div.appendChild(heavySnow);
    }
    if(string.includes("Light Snow")){
        const lightSnow = createImage("./SVGs/reshot-icon-light-snowing-UPS2TMANC8.svg");
        div.appendChild(lightSnow);
    }
    if(string.includes("Thunderstorm")){
        const thunderstorm = createImage("./SVGs/reshot-icon-thunderstorm-KA23SLGT5H.svg");
        div.appendChild(thunderstorm);
    }
    if(string.includes("Fog") || string.includes("Foggy")){
        const fog = createImage("./SVGs/fog-svgrepo-com.svg");
        div.appendChild(fog);
    }
    if(string.includes("Haze")){
        const haze = createImage("./SVGs/fog-svgrepo-com.svg");
        div.appendChild(haze);
    }

    div.classList.add("conditions");

    return div;
   }

   function createImage(link){
    const image = document.createElement("img");
    image.setAttribute("src", link);
    image.setAttribute("height", "40px");
    image.setAttribute("width", "80px");
    return image;
   }

   
    return { getInfo, init, display, setupEventListeners};
})();

weatherApp.display();
weatherApp.setupEventListeners();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/Weather-App/service-worker.js') // Adjusted path
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }