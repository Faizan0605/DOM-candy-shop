async function handleFormSubmit(event) {
    event.preventDefault();

    const candyname = event.target.candyname.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;

    const candy = {
        candyname,
        description,
        price,
        quantity
    }

    const res = await post(candy);

    render(res.data);
}

window.addEventListener("DOMContentLoaded", getAll)

const url = "https://crudcrud.com/api/77dec316592b41e78f0d3df1c10f14e6/resources"

async function post(candy) {
    return await axios.post(url, candy);
}

async function put(candy, id) {
    return await axios.put(`${url}/${id}`, candy);
}

async function get() {
    return await axios.get(url);
}

async function del(id) {
    await axios.delete(`${url}/${id}`);
}

async function getAll() {
    document.querySelector('ul').innerHTML = '';
    const result = await get();
    result.data.forEach((candy) => render(candy));
}

async function update(id, candy, rem) {
    const { _id, ...candyWithoutId } = candy;
    const newCandy = { ...candyWithoutId, quantity: candy.quantity - rem };
    await put(newCandy, id);

    await getAll();
}

function render(candy) {
    const ul = document.querySelector('ul')

    const li = document.createElement('li');
    li.textContent = `${candy.candyname}-${candy.description}-${candy.price}-${candy.quantity}`;

    const b1 = document.createElement('button');
    b1.type = 'button';
    b1.textContent = 'Buy 1';
    b1.addEventListener('click', () => update(candy._id, candy, 1))

    const b2 = document.createElement('button');
    b2.type = 'button';
    b2.textContent = 'Buy 2';
    b2.addEventListener('click', () => update(candy._id, candy, 2));

    const b3 = document.createElement('button');
    b3.type = 'button';
    b3.textContent = 'Buy 3'
    b3.addEventListener('click', () => update(candy._id, candy, 3))


    li.appendChild(b1);
    li.appendChild(b2);
    li.appendChild(b3);

    ul.appendChild(li);

}