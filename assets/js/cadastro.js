const btnMostrarSenha = document.querySelector("#btn-mostrar-senha");
const inputSenha = document.querySelector("#senha");
const iconeSenha = document.querySelector("#icone-senha");
const campoEmail = document.querySelector("#email");
const emailErro = document.querySelector("#erro-email");
const campoFone = document.querySelector("#telefone");
const foneErro = document.querySelector("#erro-telefone")

campoFone.addEventListener("blur", function() {
    const valorFone = campoFone.value.replace(/\D/g, "");

    // Validação e correção final de caracteres
    if (valorFone.length != 10 && valorFone.length != 11) {
        // Resultado negativo
        foneErro.style.display = "block"; // Mostra mensagem se for inválido
        campoFone.style.borderColor = "red";
    } else {
        foneErro.style.display = "none";
        campoFone.style.borderColor = "#334155";
        campoFone.value = valorFone;
    }
});

campoEmail.addEventListener("blur", function() {
  const valorEmail = campoEmail.value;

  // Validação do caractere @
  if (valorEmail.includes("@")) {
     // Resultado positivo
    emailErro.style.display = "none";
    campoEmail.style.borderColor = "#334155";
  } else {
     // Resultado negativo
    emailErro.style.display = "block";
    campoEmail.style.borderColor = "red";
  }
});

if (btnMostrarSenha && inputSenha && iconeSenha) {
    btnMostrarSenha.addEventListener("click", function(event) {
        event.preventDefault();
        if (inputSenha.type === "password") {
            inputSenha.type = "text";
            iconeSenha.src = "img/eye.svg";
            iconeSenha.alt = "Ocultar senha"; 
        } else {
            inputSenha.type = "password";
            iconeSenha.src = "img/eye-closed.svg";
            iconeSenha.alt = "Mostrar senha"; 
        }
    });
}

const btnMostrarConfirmar = document.querySelector("#btn-mostrar-confirmar");
const inputConfirmar = document.querySelector("#confirmarSenha");
const iconeConfirmar = document.querySelector("#icone-confirmar");

if (btnMostrarConfirmar && inputConfirmar && iconeConfirmar) {
    btnMostrarConfirmar.addEventListener("click", function(event) {
        event.preventDefault();
        if (inputConfirmar.type === "password") {
            inputConfirmar.type = "text";
            iconeConfirmar.src = "img/eye.svg";
            iconeConfirmar.alt = "Ocultar senha"; 
        } else {
            inputConfirmar.type = "password";
            iconeConfirmar.src = "img/eye-closed.svg";
            iconeConfirmar.alt = "Mostrar senha"; 
        }
    });
}

document.querySelector("#btnCriarConta").addEventListener("click", async (event) => {
    event.preventDefault();

    // Elementos
    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const telefone = campoFone.value.trim();
    const idade = document.querySelector("#idade").value.trim();
    const cidade = document.querySelector("#cidade").value.trim();
    const escolaridade = document.querySelector("#escolaridade").value;
    const senha = document.querySelector('#senha').value;
    const confirmSenha = document.querySelector('#confirmarSenha').value;

    // Validação de Campos Vazios
    if (nome === "" || email === "" || telefone === "" || idade === "" || cidade === "" || senha === "") {
        Swal.fire({
            title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Campos Vazios!</h1>`,
            html: `<p style="font-family: 'Nunito R';">Por favor, preencha todos os campos necessários.</p>`,
            icon: "error",
            background: "#1F2937",
            color: "#9CA3AF"
        });
        return;
    }

    if (senha !== confirmSenha) {
        Swal.fire({
            title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Senhas Diferentes!</h1>`,
            html: `<p style="font-family: 'Nunito R';">A confirmação de senha diverge da senha digitada.</p>`,
            icon: "warning",
            background: "#1F2937",
            color: "#9CA3AF"
        });
        return;
    }

    // Preparando os dados
    const dadosFormulario = new URLSearchParams();
    dadosFormulario.append('nome', nome);
    dadosFormulario.append('email', email);
    dadosFormulario.append('telefone', telefone);
    dadosFormulario.append('idade', idade);
    dadosFormulario.append('cidade', cidade);
    dadosFormulario.append('escolaridade', escolaridade);
    dadosFormulario.append('senha', senha);

    try {
        // Enviando para o MySQL
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dadosFormulario
        });

        if (response.ok) {
            // Sucesso (resposta 201)
            const dadosUsuario = await response.json();
            localStorage.setItem("sessaoVocantis", JSON.stringify(dadosUsuario));

            Swal.fire({
                title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Bem-Vindo, ${nome}</h1>`,
                html: `<p style="font-family: 'Nunito R';">Seu cadastro foi concluído!</p>`,
                icon: "success",
                background: "#1F2937",
                color: "#9CA3AF"
            }).then(() => {
                window.location.href = "perguntas.html";
            });
            
        } else {
            // Erro no servidor ou banco (resposta 500)
            const erroTexto = await response.text();

            Swal.fire({
                title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Erro no cadastro!</h1>`,
                html: `<p style="font-family: 'Nunito R';">${erroTexto}</p>`,
                icon: "error",
                background: "#1F2937",
                color: "#9CA3AF"
            });
        }

    } catch (error) {
        Swal.fire({
            title: `<h1 style="font-family: 'Montserrat B'; font-size: 28px; color: #F3F4F6">Falha na Conexão!</h1>`,
            html: `<p style="font-family: 'Nunito R';">Não foi possível contatar o servidor.</p>`,
            icon: "error",
            background: "#1F2937",
            color: "#9CA3AF"
        }).then(() => {
            window.location.href = "perguntas.html"; 
        });
    }
});