const fetchCategories = async () => {
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showCategories(data.data);
    } catch (error) {
        console.log(error);
    }
};

const showCategories = (data) => {
    // console.log(data);
    // Capture Categories Container to append all the Categories Link:
    const categoriesContainer = document.getElementById('news-categories');
    data.news_category.forEach(singleCategories => {
        // console.log(singleCategories);
        categoriesContainer.innerHTML += `<a class="nav-link" href="#" onclick="fetchCategoryNews('${singleCategories?.category_id}' , '${singleCategories?.category_name}')">${singleCategories?.category_name}</a>`;
    });
};

// fetch all newses available in a Category
const fetchCategoryNews = async (category_id , category_name) => {
    // console.log(category_id);
    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showCategoryNews(data.data , category_name);
    } catch (error) {
        console.log(error);
    }
}

const showCategoryNews = (data , category_name) => {
    // console.log(data , category_name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
    const newsContainer = document.getElementById('all_news');
    newsContainer.innerHTML = '';
    data.forEach(singleNews =>{
        // console.log(singleNews);
        const {_id , image_url , title , details , author , total_view} = singleNews;
        newsContainer.innerHTML += `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src= ${image_url} class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title fw-bold">${title}</h5>
              <p class="card-text">${details.slice(0 , 200)}...</p>
            </div>
            <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <img src= ${author.img? author.img : 'NO Img Found'} class="img-fluid rounded-circle me-2" alt="..." height="40px" width="40px">
                    <div>
                        <p class="p-0 m-0">${author.name? author.name : "Not available"}</p>
                        <p class="p-0 m-0">${author.published_date}M</p>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <i class="fas fa-eye me-2"></i>
                    <P class="p-0 m-0">${total_view? total_view : "Not available"}M</P>
                </div>
                <div>
                    <i class="fas fa-star"></i>
                </div>
                <div>
                    <i class="fas fa-arrow-right" onclick ="fetchNewsDetail('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>
            </div>
          </div>
        </div>
      </div>
        `;
    });
};

const fetchNewsDetail = async news_id => {
    const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;
    // console.log(URL);
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showNewsDetail(data.data[0]);
    } catch (error) {
        console.log(error);
    }
};

const showNewsDetail = newsDetail => {
    console.log(newsDetail);
    const modalBody = document.getElementById('modal-body');
    const {_id , others_info , image_url , title , details , author , total_view} = newsDetail;
    modalBody.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-12">
        <img src= ${image_url} class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-12 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title fw-bold">${title} <span class="badge text-bg-warning">${others_info.is_trending? 'Trending' : 'Not Trending' }</span></h5>
          <p class="card-text">${details}</p>
        </div>
        <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
            <div class="d-flex">
                <img src= ${author.img? author.img : 'NO Img Found'} class="img-fluid rounded-circle me-2" alt="..." height="40px" width="40px">
                <div class="d-flex flex-column">
                    <p class="p-0 m-0">${author.name? author.name : 'Not available'}</p>
                    <p class="p-0 m-0">${author.published_date}M</p>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <i class="fas fa-eye me-2"></i>
                <P class="p-0 m-0">${total_view? total_view : 'not available'}M</P>
            </div>
            <div>
                <i class="fas fa-star"></i>
            </div>
        </div>
      </div>
    </div>
  </div>
    `;
};