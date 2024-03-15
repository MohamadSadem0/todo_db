const signUp = async (name, email, password) => {
  try {
    const response = await axios.post("todo_db/signup.php", {
      name: name,
      email: email,
      password: password,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const signIn = async (email, password) => {
  try {
    const response = await axios.post("todo_db/signin.php", {
      email: email,
      password: password,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

document
  .getElementById("signupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signUp(name, email, password);
  });

document
  .getElementById("signinForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signIn(email, password);
  });
