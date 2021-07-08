console.log('script loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const results = document.querySelector('#results')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch(`http://localhost:3000/weather?location=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            results.textContent=data.error
        }
        else{
            console.log(data)
            message = data.location+'\nLatitude :'+data.latitude+'\nLongitude: '+data.longitude+'\nWeather in '+data.city+' is '+data.forecastText+' with temperature of '+data.temperature+' C.'
            results.textContent=message
        }
    })
})
})