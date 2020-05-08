const app = document.querySelector('#app');

const state = {
    term: '',
    users: [],
};

const create = (type) => document.createElement(type);

const header = create('h1');
header.innerText = 'Acme User Search';
header.classList.add('header');
app.append(header);

const createInputForForm = () => {
    const input = create('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'input search term');
    input.setAttribute('name', 'input');

    let timeout = null;
    input.addEventListener('keyup', ev => {
        state.term = ev.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            render();
        }, 1000);
        
    });
    return input;
};

const createClearForForm = () => {
    const clear = create('div');
    clear.innerText = 'clear';
    clear.setAttribute('id', 'clear');

    clear.addEventListener('click', ev => {
        ev.preventDefault();
        reset();
    });

    return clear;
};

// for clear button
const reset = () => {
    let input  = document.querySelector('input[name=input]');
    input.value = '';
    state.term = '';
    state.users = [];
    render();
};

const createForm = () => {
    const form = create('form');

    const formInput = createInputForForm();
    form.append(formInput);

    const formClear = createClearForForm();
    form.append(formClear);
    
    return form;
};

const mainForm = createForm();
app.append(mainForm);

const usersContainer = create('div');
usersContainer.classList.add('userContainer');
app.append(usersContainer);

const creatUsersHeader = () => {
    const usersHeaderContainer = create('div');
    usersHeaderContainer.classList.add('usersHeaderContainer');
    usersContainer.append(usersHeaderContainer);

    const headerImg = create('img');
    headerImg.setAttribute('src','https://www.richelieu.com/documents/docsGr/106/284/2/1062842/1296075_300.jpg')
    headerImg.setAttribute('style', 'visibility: hidden;')
    headerImg.classList.add('imgColumn');
    usersHeaderContainer.append(headerImg);

    const headerFirstName = create('h3');
    headerFirstName.classList.add('firstNameColumn');
    headerFirstName.innerText = 'First Name'
    usersHeaderContainer.append(headerFirstName);

    const headerLastName = create('h3');
    headerLastName.classList.add('lastNameColumn');
    headerLastName.innerText = 'Last Name'
    usersHeaderContainer.append(headerLastName);

    const headerEmail = create('h3');
    headerEmail.classList.add('emailColumn');
    headerEmail.innerText = 'Email'
    usersHeaderContainer.append(headerEmail);

    const headerTitle = create('h3');
    headerTitle.classList.add('titleColumn');
    headerTitle.innerText = 'Title'
    usersHeaderContainer.append(headerTitle);

    usersContainer.append(usersHeaderContainer);
    return usersHeaderContainer;
};

const createUser = (user) => {
    const userElement = create('div');
    userElement.classList.add('user');

    const userImg = create('img');
    userImg.setAttribute('src', user.avatar);
    userImg.classList.add('imgColumn');
    userElement.append(userImg);
    
    const userName = create('div');
    userName.innerText = `${user.firstName}`;
    userName.classList.add('firstNameColumn');
    userElement.append(userName);

    const userLastName = create('div');
    userLastName.innerText = `${user.lastName}`;
    userLastName.classList.add('lastNameColumn');
    userElement.append(userLastName);

    const userEmail = create('div');
    userEmail.innerText = `${user.email}`;
    userEmail.classList.add('emailColumn');
    userElement.append(userEmail);

    const userTitle = create('div');
    userTitle.innerText = `${user.title}`;
    userTitle.classList.add('titleColumn');
    userElement.append(userTitle);

    return userElement;
};

const render = () => {
    usersContainer.innerHTML = '';

    if (state.term != ''){

        let apiURL = `https://acme-users-api-rev.herokuapp.com/api/users/search/${state.term}`;

        axios.get(apiURL).then(result => {
            state.users = result.data.users;
        }).then(() => {
            creatUsersHeader();
            state.users.forEach(user => {
                let tempUser = createUser(user);
                usersContainer.append(tempUser);
            });
        }).catch(err => console.log(err));
    };
};

