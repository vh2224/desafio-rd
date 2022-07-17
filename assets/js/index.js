function validatePassword(e) {
  e.preventDefault();
  let password = document.querySelector('#password').value;
  let confirm_password = document.querySelector('#password_confirmation').value;
  if (password !== confirm_password) {
  } else {
      document.getElementById('wrong_password').style.display = "none";
      sendForm();
  }
}

function togglePassword(index) {

  const password = document.querySelector("#password");
  const passwordConfirmation = document.querySelector("#password_confirmation");
  const img1 = document.querySelector("#imgPassword1");
  const img2 = document.querySelector("#imgPassword2");

  if (index === 'password1') {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    const img = img1.getAttribute('src') === "./assets/img/close-eye.svg" ? "./assets/img/open-eye.svg" : "./assets/img/close-eye.svg";
    password.setAttribute("type", type);
    img1.setAttribute("src", img);
  }
  else if (index === 'password2') {
    const typeConfirmation = passwordConfirmation.getAttribute("type") === "password" ? "text" : "password";
    const imgConfirmation = img2.getAttribute('src') === "./assets/img/close-eye.svg" ? "./assets/img/open-eye.svg" : "./assets/img/close-eye.svg";
    passwordConfirmation.setAttribute("type", typeConfirmation);
    img2.setAttribute("src", imgConfirmation);
  }


}




function sendForm() {
  const form = document.querySelector("form");
  form.addEventListener('submit', function (e) {
      e.preventDefault();

      document.querySelector('.form-container').remove();
      document.querySelector('.hero-form form').append(document.createElement('div'));
      document.querySelector('.form form div').innerHTML = '<div class="thanks-success">Obrigado!, entraremos em contato</div>';
  
  }, false);    
}