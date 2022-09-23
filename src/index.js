import Notiflix from 'notiflix';
import axios from "axios";
const form = document.querySelector('.search-form')
const input = document.querySelector(".input")
const loadMoreBtn = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery")
loadMoreBtn.style.visibility = 'hidden'
const addMore = 1;
function createImg(images) {
    const markup = images.map((img) => {
            return `<div class="gallery">
        <div class="photo-card">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>${img.likes}</b>
                </p>
                <p class="info-item">
                    <b>${img.views}</b>
                </p>
                <p class="info-item">
                    <b>${img.comments}</b>
                </p>
                <p class="info-item">
                    <b>${img.downloads}</b>
                </p>
            </div>
        </div>
    </div>`
        })
        .join("");
    gallery.innerHTML = markup;
}
    
function getPhoto(name) {
    return axios.get(`https://pixabay.com/api/`, {
    params: {
        key: '30077933-3f2db5638137745ffc2686be7',
            q: name,
        image_type: 'photo',
        orientation: 'horizontal',
            safesearch: 'true',
            per_page: 40,
        page: addMore
    }
})
    .then(response => {
        return response.data
    })
    
}

form.addEventListener("submit", photoName => {
    photoName.preventDefault();
    photoname = input.value;
    getPhoto(photoName)
        .then(data => {
            if (data.length = 0 ) {
                Notify.faillure('Sorry, there are no images matching your search query. Please try again.')
                gallery.innerHTML = '';
                gallery.innerHTML = '';
                return
            }
            else {
                createImg(data);
                gallery.innerHTML = ''
                loadMoreBtn.style.visibility ='visible'
            }
    })
}) 
loadMoreBtn.addEventListener("click", photoName => {
    photoName.preventDefault()
    photoName = input.value;
    getPhoto(photoName)
        .then(data => {
            if (data.length == totalHits) {
            Notify.info("We're sorry, but you've reached the end of search results.")
            }
            else {
                addMore++;
                createImg(data);
                gallery.innerHTML = ''
            }
    })

} )