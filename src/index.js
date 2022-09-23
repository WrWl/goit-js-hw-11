import Notiflix from 'notiflix';
import axios from "axios";
const form = document.querySelector('.search-form')
const input = document.querySelector(".input")
const submBtn = document.querySelector(".subm-btn")
const gallery = document.querySelector(".gallery")
function createImg(images) {
    images.preventDefault()
    const markup = images
        .map((img) => {
            return `<div class="gallery">
        <div class="photo-card">
            <img src="${img.webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>${likes}</b>
                </p>
                <p class="info-item">
                    <b>${views}</b>
                </p>
                <p class="info-item">
                    <b>${comments}</b>
                </p>
                <p class="info-item">
                    <b>${downloads}</b>
                </p>
            </div>
        </div>
    </div>`
        })
        .join("");
    gallery.innerHTML=markup
}
    
function getPhoto(name) {
    return axios.get(`https://pixabay.com/api/`, {
    params: {
        key: '30077933-3f2db5638137745ffc2686be7',
            q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    }
})
    .then(response => {
        return response.data
    })
    
}

form.addEventListener("submit", photoName => {
    photoname = input.value.trim();
    getPhoto(photoName)
        .then(data => {
            if (data.length < 1) {
                Notifi.faillure('Sorry, there are no images matching your search query. Please try again.')
                gallery.innerHTML = '';
            }
            else {
                createImg(data);
                gallery.innerHTML = ''
            }
    })
}) 