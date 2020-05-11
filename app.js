const app = document.querySelector('#app');

const state = {
    term: '',
    users: [],
};

const create = (type) => document.createElement(type);

// Creating header
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
        window.location.hash = `?input=${state.term}`;
        if (state.term == '') {
            window.location.hash = ``;
        }
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
    window.location.hash = ``;
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

const usersContainer = create('table');
usersContainer.classList.add('usersContainer');
app.append(usersContainer);

const creatUsersHeader = () => {
    const usersHeaderContainer = create('thead');
    usersHeaderContainer.classList.add('usersHeaderContainer');
    usersContainer.append(usersHeaderContainer);

    const headerRow = create('tr');
    usersHeaderContainer.append(headerRow);

    const headerImgTb = create('th');
    headerImgTb.classList.add('imgCol');
    headerImgTb.innerText = 'Img';
    headerImgTb.setAttribute('style', 'color: white;')
    headerRow.append(headerImgTb);

    const headerFirstName = create('th');
    headerFirstName.classList.add('fnCol');
    headerFirstName.innerText = 'First Name';
    headerRow.append(headerFirstName);

    const headerLastName = create('th');
    headerLastName.classList.add('lnCol');
    headerLastName.innerText = 'Last Name';
    headerRow.append(headerLastName);

    const headerEmail = create('th');
    headerEmail.classList.add('emailCol');
    headerEmail.innerText = 'Email';
    headerRow.append(headerEmail);

    const headerTitle = create('th');
    headerTitle.classList.add('titleCol');
    headerTitle.innerText = 'Title';
    headerRow.append(headerTitle);

    return usersHeaderContainer;
};

const createUser = (user) => {
    const userElement = create('tr');
    userElement.classList.add('user');

    const userImgTb = create('tb');
    userImgTb.classList.add('imgCol');
    userElement.append(userImgTb);
    
    const userImg = create('img');
    userImg.setAttribute('src', user.avatar);
    userImgTb.append(userImg);
    
    const userName = create('tb');
    userName.classList.add('fnCol');
    userName.innerText = `${user.firstName}`;
    userElement.append(userName);

    const userLastName = create('tb');
    userLastName.classList.add('lnCol');
    userLastName.innerText = `${user.lastName}`;
    userElement.append(userLastName);

    const userEmail = create('tb');
    userEmail.classList.add('emailCol');
    userEmail.innerText = `${user.email}`;
    userElement.append(userEmail);

    const userTitle = create('tb');
    userTitle.classList.add('titleCol');
    userTitle.innerText = `${user.title}`;
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

