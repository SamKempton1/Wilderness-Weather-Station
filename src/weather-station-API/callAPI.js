export async function getWeatherData(location) {
    return fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=P244N5WTVE588PDUWRDNBW898&contentType=json`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch((err) => {
            console.error("Error fetching weather data:", err);
        });
}
