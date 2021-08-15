const signInBtn = document.querySelector('.Login-Page form button');
const signInForm = document.querySelector('.Login-Page form');
// const signInOutLink = document.querySelector('.signin-out-link');
// const signOutBtn = document.querySelector('.signout-btn');
// signOutBtn.addEventListener('click', () => {
//   localStorage.clear('token');
//   window.location.href = 'login.html';
// });

let hostedUrl = 'https://zuri-school-finder-backend.herokuapp.com';

localStorage.clear('userToken');
signInBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = signInForm.querySelector('.email').value;
  const password = signInForm.querySelector('.password').value;

  fetch(`${hostedUrl}/users/login/`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.status === 'failed') {
        console.log(data);
        alert(data.message);
      } else {
        const userToken = data.accessToken;
        const profileName = data.profileName;
        const email = data.email;
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('profileName', profileName);

        window.location.href = 'school-search.html';
      }
    });
});



// Set User Profile Name;
//   const welcomeName = document.querySelector(‘.welcum h2’);
//   welcomeName.innerText = `Welcome ${localStorage.getItem(‘profileName’)}`;