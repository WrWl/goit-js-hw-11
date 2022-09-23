import Notiflix from 'notiflix';
import axios from "axios";
const form = document.querySelector('.search-form')
const input = document.querySelector(".input")
const loadMoreBtn = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery")
loadMoreBtn.style.visibility = 'hidden'
let addMore = 1; 
const a = ""
// звернення до серверу
function getPhoto(name) {
   return  axios.get(`https://pixabay.com/api/`, {
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
        
        return response
    })
    
}

//функція, яка відрисовує картинки
function createImg(images) {
    
    const markup = images
        .map((img) => {
            return `<div class="gallery">
        <div class="photo-card">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes: ${img.likes}</b>
                </p>
                <p class="info-item">
                    <b>Views: ${img.views}</b>
                </p>
                <p class="info-item">
                    <b>Comments: ${img.comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads: ${img.downloads}</b>
                </p>
            </div>
        </div>
    </div>`
        })
        .join("");
    gallery.innerHTML = markup;
} 
    // подія, при якій створюються картинки
form.addEventListener("submit", photoName => {
    photoName.preventDefault();
    a = input.value;
    
    getPhoto(a)
        .then(res => {
            console.log(res.data.hits)
            if (res.data.hits === []) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.')
                
            }
            else {
                createImg(res.data.hits)
                loadMoreBtn.style.visibility = 'visible'
            }
        })
}) 
//подія при якій додаються наступні картинки
loadMoreBtn.addEventListener("click", photoName => {
    photoName.preventDefault()
     a = input.value
    getPhoto(a)
        .then(res => {
            if (res.data.hits == res.data.totalHits) {
            Notify.info("We're sorry, but you've reached the end of search results.")
            }
            else {
                addMore++;
                createImg(res.data.hits);
                
            }
    })
    

} ) 