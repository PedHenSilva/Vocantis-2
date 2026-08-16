document.addEventListener("DOMContentLoaded", () => {
    const sessao = localStorage.getItem("sessaoVocantis");
    const headerActions = document.querySelector("#header-actions"); 

    if (sessao && headerActions) {
        // Desconverte o texto de volta para objeto JavaScript
        const usuario = JSON.parse(sessao);
        const primeiroNome = usuario.nome.split(" ")[0]; 

        // 3. Substitui os botões de entrar/cadastrar pelo Menu do Usuário
        document.getElementById('cadastro').remove()
        headerActions.innerHTML += `
            
            <div class="user-menu-container">
                <span class="user-greeting">Olá, ${primeiroNome}</span>
                
                <button class="user-avatar" id="btn-avatar">
                    <img src="img/user-round.svg" alt="Usuário">
                </button>
                
                <div class="dropdown-menu" id="user-dropdown">
                    <p class="dropdown-email">${usuario.email}</p>
                    <hr>
                    <div class="dropdown-btns">
                        <a href="perguntas.html" style="text-decoration: none;">
                            <button class="btn-dropdown">
                                <img src="img/clipboard-pen.svg" alt="Logout">
                                Teste Vocacional
                            </button>
                        </a>
                        <a href="resultado.html" style="text-decoration: none;">
                            <button class="btn-dropdown">
                                <img src="img/file-user.svg" alt="Logout">
                                Resultado
                            </button>
                        </a>
                    </div>
                    <hr>
                    <button id="btn-logout" class="btn-dropdown">
                        <img src="img/log-out.svg" alt="Logout">
                        Sair
                    </button>
                </div>
            </div>
        `;

        // Dropdown
        const btnAvatar = document.querySelector("#btn-avatar");
        const dropdown = document.querySelector("#user-dropdown");
        
        btnAvatar.addEventListener("click", () => {
            dropdown.classList.toggle("active"); 
        });

        // Logout
        const btnLogout = document.querySelector("#btn-logout");
        btnLogout.addEventListener("click", () => {
            // Remove a sessão
            localStorage.removeItem("sessaoVocantis"); 
            // Redireciona página Home
            window.location.href = "index.html"; 
        });
    }
});