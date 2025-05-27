let page = 1;

async function fetchPost() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
    const data = res.json();
    return data;
}

function createPost(post) {
    const cardsContainer = document.querySelector('.cards');

    post.forEach((post)=>{
       const postElement = document.createElement('section');
       postElement.classList.add('card');

       postElement.innerHTML = `
            <h2 id="title">${post.title}</h2>
            <p id="text">${post.body}</p>
       `
       cardsContainer.appendChild(postElement);
    });
}

async function loadMore() {
    const post = await fetchPost();
    createPost(post);
    page++
}

function isBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
}

window.addEventListener('scroll', () => {
    if (isBottom()) {
      loadMore();
    }
});

loadMore()