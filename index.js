var url = `https://newsapi.org/v2/top-headlines?country=id&category=sport&apiKey=6b6b9cc0346d414f87a770c2db391516`;
function fetchData() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        loading();
        setTimeout(() => {
            const searchVal = document.getElementById('myInput');
            const filter = searchVal.value;
            const dataListFiltered = filteredData(data.articles, filter);
            createCard(dataListFiltered);
        }, 1000);
    } 
        ).catch(error => console.log(error));
}

function loading () {
    let cards = document.getElementById('cardNews');
        cards.innerHTML = `<div class="col-12 text-center mt-5" id="loadinGun">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`
}


function createCard(newsData) {
    let cards = document.getElementById('cardNews');
    let newsContent = '';
    let content = newsData;
    if(content && content.length > 0) {
        content.forEach(news => {
            newsContent += `<div class="card col-lg-4 mx-auto my-3" style="width: 20rem;">
                                <img src=${news.urlToImage} class="card-img-top py-2" alt="img">
                                <div class="card-body">
                                    <h5 class="card-title">${news.title}</h5>
                                    <p class="card-text">${news.description}</p>
                                    <a href="" class="btn btn-primary">Read more</a>
                                </div>
                            </div>`
        });
        cards.innerHTML = newsContent;
    } else {
        cards.innerHTML = `<div class="col-12 text-center mt-5 alert alert-warning">Data not found</div>`
    }
}

function filteredData(dataList, val) {
    return dataList.filter(function (data) {
        return data.title.toLowerCase().indexOf(val.toLowerCase()) != -1;
    })
}

fetchData();
    