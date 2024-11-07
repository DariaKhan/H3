
const productEl = document.getElementById('product');
const reviewEl = document.getElementById('review');
const addButtonEl = document.getElementById('add-button');

const listEl = document.getElementById('list');
let reviewList = JSON.parse(localStorage.getItem('reviewList')) || [];

function addReview(id, product, review) {
    const newReview = {
        id: id,
        product: product,
        review: review,
    };
    reviewList.push(newReview);
}

function updateReviewList() {
    if (listEl) {
        listEl.innerHTML = '';
        reviewList.forEach((review, index) => {
            const newEl = document.createElement('li');
            newEl.textContent = `Клиент под номером ${index + 1}, приобрел продукт: "${review.product}" и оставил отзыв: "${review.review}."`;
             
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', function () {
                deleteReview(index);
            });

            newEl.appendChild(deleteButton);
            listEl.appendChild(newEl);
        });
    }
    localStorage.setItem('reviewList', JSON.stringify(reviewList));
}


function deleteReview(index) {
    reviewList.splice(index, 1);
    updateReviewList();
}

if (addButtonEl) {
    addButtonEl.addEventListener('click', function (e) {
        e.preventDefault();
        if (productEl.value.trim() && reviewEl.value.trim()) {
            addReview(reviewList.length + 1, productEl.value.trim(), reviewEl.value.trim());
            updateReviewList();
            productEl.value = ''; 
            reviewEl.value = '';
        } else {
            alert("Пожалуйста, заполните оба поля!");
        }
    });
}

if (listEl) {
    updateReviewList();
}
