const fetchData = () => {  
    document.getElementsByClassName('main')[0].setAttribute('style','display:flex;')
    document.getElementById('loading').innerText = "Loading.......";
    const search = document.getElementById('search').value;
    fetch("http://localhost:3000/weather?search=" 
    + encodeURIComponent(search)
    ).then((res) => {
    res.json().then((data) => {
        if (!data.error){
            return setData(data)
        }
        setError(data)
    })
})
}

const setData = (data) => {
    document.getElementById('location').innerText = data.location;
    document.getElementById('temp').innerText = data.temp + '°C';
    document.getElementById('feelsLike').innerText = data.feelsLike + '°C';
    document.getElementById('date').innerText = data.date;
    document.getElementById('time').innerText =  data.time;
    document.getElementById('forecast').innerText = data.forecast;
    document.getElementById('prec').innerText = data.precip + '%';
    document.getElementById('humidity').innerText = data.humidity + '%';
    document.getElementById('wind').innerText = data.windSpeed + 'km/h';
    document.getElementById('logo').setAttribute('src',data.icon); 
    document.getElementById('loading').innerText = null;   
    document.getElementById('error').innerText = null;   

}

const setError = (err) => {
    document.getElementsByClassName('main')[0].setAttribute('style','display:none;')
    document.getElementById('error').innerText = err.error;   
    document.getElementById('loading').innerText = null;   
}
