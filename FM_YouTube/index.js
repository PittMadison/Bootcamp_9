'use strict'

let body = document.querySelector('body');
let gallery = document.createElement('ol');
gallery.classList.add('gallery')
body.prepend(gallery);
let iframeDiv = document.createElement('div');
iframeDiv.classList.add('iframeDiv');
body.prepend(iframeDiv);
gallery.addEventListener('click', getTube)
window.addEventListener('DOMContentLoaded', getFm)

function getFm (){
  let URL = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=412e51e107155c7ffabd155a02371cbd&format=json'
  fetch(URL)
  .then(res=>res.json())
  .then(data=>{
    console.log(data.tracks.track);
    
    createList(data.tracks.track)
  })
  .catch(err=>console.log(new Error('error in getFm function')))
}


function getTube (e){
  
if(e.target.classList.contains('push')) {
    let query = e.target.closest('li').firstElementChild.textContent;
    let URL = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAGwWGzULP4Q9plH7a9ATpZW_8o2ZgJOH8&part=snippet&q=${query}&maxResults=1`;
    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
      let videoID = data.items[0].id.videoId;
      iframeDiv.classList.add('iframeAct');
      iframeDiv.innerHTML =`<button class='close'>X</button><iframe class='iframe' src='https://www.youtube.com/embed/${videoID}?autoplay=1' frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>`
      gallery.prepend(iframeDiv)
      })
    .catch(err=>console.log(new Error('error in getTube function')))
}
if (e.target.classList.contains('close')){
  iframeDiv.innerHTML = '';
  iframeDiv.classList.remove('iframeAct');
}
}


function createList (array){
  gallery.innerHTML = array.reduce((acc, el) => acc + 
  `<li class='gallery__item'>
      <p class='gallery__itemName'>${el.artist.name} - ${el.name}</p>
      <div class='gallery__itemContainer'>
          <img class='gallery__itemPic' src='${el.image[3]['#text']}'>
          <button class='push'>Youtube</button>
      </div>
  </li>`,'')
  
}
