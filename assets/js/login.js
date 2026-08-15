// Elementos
const formLogin = document.querySelector(".login-form");
const btnMostrarSenha = document.querySelector("#btn-mostrar-senha");
const inputSenha = document.querySelector("#senha");
const iconeSenha = document.querySelector("#icone-senha");

if (btnMostrarSenha) {
    btnMostrarSenha.addEventListener("click", function(event) {
        event.preventDefault();
        iconeSenha.src = "img/eye.svg";
        
        if (inputSenha.type === "password") {
            // Revela a senha
            inputSenha.type = "text";
            iconeSenha.src = "img/eye.svg";
            iconeSenha.alt = "Ocultar senha"; 
        } else {
            // Oculta a senha
            inputSenha.type = "password";
            iconeSenha.src = "img/eye-closed.svg";
            iconeSenha.alt = "Mostrar senha"; 
        }
    });
}

// Validação e Envio de Login
if (formLogin) {
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const senha = inputSenha.value.trim();

        // Validação dos campos vazios
        if (email === "" || senha === "") {
            Swal.fire({
                title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Falha em realizar login!</h1>`,
                html: `<p style="font-family: 'Nunito R';">Preencha seu e-mail e senha para continuar.</p>`,
                icon: "warning",
                background: "#1F2937",
                color: "#9CA3AF"
            });
            return;
        }

        // Preparando os dados no padrão form-urlencoded
        const dadosLogin = new URLSearchParams();
        dadosLogin.append('email', email);
        dadosLogin.append('senha', senha);

        // Fazendo ligação com o servidor Node.js
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dadosLogin
        })
        .then(async response => {
            if (response.ok) {
                // Sucesso (resposta 200)
                const dadosUsuario = await response.json();
                localStorage.setItem("sessaoVocantis", JSON.stringify(dadosUsuario));
                
                Swal.fire({
                    title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Bem-vindo de volta!</h1>`,
                    html: `<p style="font-family: 'Nunito R';">Login realizado com sucesso.</p>`,
                    icon: "success",
                    background: "#1F2937",
                    color: "#9CA3AF"
                }).then(() => {
                    window.location.href = "/perguntas.html"; // Redirecionamento
                });
            } else {
                // Erro de credencial (resposta 401 ou 404)
                Swal.fire({
                    title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Falha na autenticação!</h1>`,
                    html: `<p style="font-family: 'Nunito R';">E-mail ou senha estão incorretos.</p>`,
                    icon: "error",
                    background: "#1F2937",
                    color: "#9CA3AF"
                });
            }
        })
        .catch(error => {
            // Servidor Desligado
            Swal.fire({
                title: 'Erro de Conexão',
                html: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Servidor está com problemas técnicos.</h1>`,
                icon: "warning",
                background: "#1F2937",
                color: "#9CA3AF"
            });
        });
    });
}