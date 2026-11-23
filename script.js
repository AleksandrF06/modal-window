let fruits = [
    {id: 1, title: 'apples', price: 20, img: 'pic/apple.jpg'},
    {id: 2, title: 'oranges', price: 30, img: 'pic/2026-11-16 21.37.10.jpg'},
    {id: 3, title: 'mango', price: 40, img: 'pic/mango.jpg'}
]

const toHTML = fruit => `
        <div class="col">
            <div class="card">
                <img class="card-img-top" style="height: 300px;" src="${fruit.img}" alt="${fruit.title}">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-btn='remove' data-id="${fruit.id}">Удалить</a>
                </div>
            </div>
        </div>
`

function render() {
    const html = fruits.map(toHTML).join("")
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('primary btn clicked')
            priceModal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Danger btn clicked')
            priceModal.close()
        }}
    ]
})



document.addEventListener('click', e => {
    e.preventDefault()
    const btnType = e.target.dataset.btn
    const id = +e.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    if (btnType === 'price') {
        priceModal.setContent(`<p>цена на ${fruit.title}: ${fruit.price}</p>`)
        priceModal.open()
        console.log(id, fruit)
    }
    else if (btnType === 'remove') {
        $.confirm({
            title: 'вы уверены?',
            content: `вы удаляете ${fruit.title}`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})
