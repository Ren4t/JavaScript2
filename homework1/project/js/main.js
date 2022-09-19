const products = [
    {id: 1, title: 'Notebook', price: 2000,imgUrl:'https://img.freepik.com/free-photo/laptop-with-blank-black-screen-on-a-white-table_53876-97915.jpg'},
    {id: 2, title: 'Mouse', price: 20,imgUrl:'https://img.freepik.com/free-photo/purple-computer-mouse_1260-11.jpg'},
    {id: 3, title: 'Keyboard', price: 200,imgUrl:'https://img.freepik.com/free-photo/closeup-black-keyboard-on-the-table_181624-12231.jpg'},
    {id: 4, title: 'Gamepad', price: 50,imgUrl:'https://img.freepik.com/free-psd/gaming-controller-mockup_439185-427.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="${item.imgUrl}" alt="${item.title}">
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);