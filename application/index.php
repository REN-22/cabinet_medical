<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link href="styles.css" rel="stylesheet">
</head>
<body>
<form id="loginForm">
    Nom d'utilisateur: <input type="text" id="username"><br>
    Mot de passe: <input type="password" id="password"><br>
    <button type="submit">Se connecter</button>
</form>
<p id="errorMessage" style="color: red; display: none;"></p>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await authenticate(username, password);
        const token = response.data;
        localStorage.setItem('token', token);
        window.location.href = './acceuil.php';
    } catch (error) {
        console.error(error);
        document.getElementById('errorMessage').innerText = 'Informations d\'authentification invalides';
        document.getElementById('errorMessage').style.display = 'block';
    }
});

async function authenticate(login, password) {
    try {
        const response = await axios.post('http://localhost/cabinet_medical-main/Auth/Auth.php', {
            login: login,
            mdp: password
        });
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
        throw error;
    }
}
</script>

</body>
</html>
