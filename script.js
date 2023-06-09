
class photoGallery{
    constructor(){
        this.API_KEY = '4Qpo3I19pGLfcWBjPlie0b46an9x2sdp2jmZp6KcNFLYCllpsvtRsQ08';
        this.galleryDiv = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.logo = document.querySelector('.logo');
        this.pageIndex = 1;
        this.EventHandle();
    }

    EventHandle(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.GetImage(this.pageIndex);
        });
        this.searchForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            this.pageIndex = 1;
            this.GetSearchImages(e);
        });
        this.loadMore.addEventListener('click', (e)=>{
            e.preventDefault();
            this.loadMoreImages(e);
        });
        this.logo.addEventListener('click', (e)=>{
            e.preventDefault();
            this.pageIndex = 1;
            this.galleryDiv.innerHTML=``;
            this.GetImage(this.pageIndex);
        })
    }

    async GetImage(index){
        this.loadMore.setAttribute('data-img', 'cureted');
        const baseUrl = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
        const data = await this.FetchImages(baseUrl);
        this.GenerateHtml(data.photos);
        console.log(data);
    }
    async GetSearchImages(e){
        this.loadMore.setAttribute('data-img', 'search');
        const searchValue = e.target.querySelector('input').value;
        const baseUrl = await `https://api.pexels.com/v1/search?query=${searchValue}&page=1&&per_page=12`;

        const data = await this.FetchImages(baseUrl);
        this.galleryDiv.innerHTML=``;
        this.GenerateHtml(data.photos);
    }
    async getLoadMoreSearchImages(index){
        console.log(index);
        const searchValue = this.searchForm.querySelector('input').value;
        console.log(searchValue);
        const baseUrl = await `https://api.pexels.com/v1/search?query=${searchValue}&page=${index}&&per_page=12`;
        console.log(baseUrl);
        const data = await this.FetchImages(baseUrl);
        this.GenerateHtml(data.photos);
    }

    async loadMoreImages(e){
        let index = ++this.pageIndex;
        const loadMoreData = e.target.getAttribute('data-img');
        console.log(index);
        if(loadMoreData == 'cureted'){
            //for cuteted
            await this.GetImage(index);
        }else{
            //for search
            console.log(index);
            await this.getLoadMoreSearchImages(index);
        }
    }

    async FetchImages(url){
        const response = await fetch(url, {
            method:'GET',
            headers:{
                Accept: 'application/json',
                Authorization: this.API_KEY
            }
        });
        const data = await response.json();
        return data;
    }

    GenerateHtml(photos){
        photos.forEach(photo => {
            const divElement = document.createElement('div');
            divElement.classList.add('item');
            divElement.innerHTML=`
            <a href="${photo.src.original}" target="_blank">
                <img src="${photo.src.medium}"alt="img">
                <h3>${photo.photographer}</h3>
            </a>            
            `;
            this.galleryDiv.appendChild(divElement);
        });
    }
}

const gallery = new photoGallery;




