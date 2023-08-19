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
    data.forEach(singleNews =>{
        console.log(singleNews);
    });
};