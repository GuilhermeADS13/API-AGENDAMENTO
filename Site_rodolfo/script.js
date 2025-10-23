const validUsers = [
    { username: 'admin', password: 'admin123', fullname: 'Administrador' },
    { username: 'usuario', password: 'senha123', fullname: 'Usuário Teste' },
    { username: 'teste', password: 'teste123', fullname: 'Teste Silva' }
];

let registeredUsers = [...validUsers];
let currentUser = null;

// Sistema de notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        ${type === 'success' ? 'background: #2ecc71;' : 
          type === 'error' ? 'background: #e74c3c;' : 
          'background: #3498db;'}
    `;
    
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .loading {
        opacity: 0.7;
        pointer-events: none;
        position: relative;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #006FFF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    closeMobileMenu();
    
    // Salvar a página atual no sessionStorage
    sessionStorage.setItem('currentPage', pageId);
}

function toggleMobileMenu() {
    const menu = document.querySelector('.navbar-menu');
    if (menu) {
        menu.classList.toggle('active');
        
        // Animar o botão do menu
        const btn = document.querySelector('.mobile-menu-btn');
        if (btn && menu.classList.contains('active')) {
            btn.style.transform = 'rotate(90deg)';
        } else if (btn) {
            btn.style.transform = 'rotate(0deg)';
        }
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.navbar-menu');
    const btn = document.querySelector('.mobile-menu-btn');
    
    if (menu) {
        menu.classList.remove('active');
    }
    if (btn) {
        btn.style.transform = 'rotate(0deg)';
    }
}

// Validação de arquivos de imagem
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
        throw new Error('Por favor, selecione apenas arquivos de imagem (JPEG, PNG, GIF, WebP)!');
    }
    
    if (file.size > maxSize) {
        throw new Error('A imagem deve ter no máximo 5MB!');
    }
    
    return true;
}

function setupImageUpload(containerId, imageId) {
    const container = document.getElementById(containerId);
    const image = document.getElementById(imageId);
    
    if (!container || !image) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.className = 'file-input';
    fileInput.style.display = 'none';
    
    container.appendChild(fileInput);

    container.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            try {
                validateImageFile(file);
                
                // Mostrar loading
                container.classList.add('loading');
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    image.src = event.target.result;
                    container.classList.add('has-image');
                    container.classList.remove('loading');
                    
                    createImageControls(container, fileInput);
                    showNotification('Imagem carregada com sucesso!');
                };
                
                reader.onerror = function() {
                    container.classList.remove('loading');
                    showNotification('Erro ao carregar a imagem!', 'error');
                };
                
                reader.readAsDataURL(file);
            } catch (error) {
                showNotification(error.message, 'error');
            }
        }
    });
}

function setupHomeImageUpload() {
    const input = document.getElementById('homeImageInput');
    const image = document.getElementById('homeMainImage');
    const container = document.getElementById('homeImageUpload');

    if (!input || !image || !container) return;

    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            try {
                validateImageFile(file);
                
                container.classList.add('loading');
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    image.src = event.target.result;
                    container.classList.add('has-image');
                    container.classList.remove('loading');
                    showNotification('Imagem da home carregada com sucesso!');
                };
                
                reader.onerror = function() {
                    container.classList.remove('loading');
                    showNotification('Erro ao carregar a imagem!', 'error');
                };
                
                reader.readAsDataURL(file);
            } catch (error) {
                showNotification(error.message, 'error');
            }
        }
    });
}

function createImageControls(container, fileInput) {
    let controls = container.querySelector('.image-controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.className = 'image-controls';
        
        const changeBtn = document.createElement('button');
        changeBtn.className = 'control-btn';
        changeBtn.textContent = '🔄 Trocar';
        changeBtn.onclick = function(e) {
            e.stopPropagation();
            fileInput.click();
        };
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'control-btn';
        removeBtn.textContent = '🗑️ Remover';
        removeBtn.onclick = function(e) {
            e.stopPropagation();
            const image = container.querySelector('img');
            if (image) {
                image.src = '';
                image.style.display = 'none';
            }
            container.classList.remove('has-image');
            fileInput.value = '';
            controls.remove();
            showNotification('Imagem removida!');
        };
        
        controls.appendChild(changeBtn);
        controls.appendChild(removeBtn);
        container.appendChild(controls);
    }
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (error && input) {
        error.textContent = message;
        error.style.display = 'block';
        input.style.borderColor = '#e74c3c';
        input.style.animation = 'shake 0.5s ease-in-out';
        
        // Remover animação após execução
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (error && input) {
        error.textContent = '';
        error.style.display = 'none';
        input.style.borderColor = '#ddd';
    }
}

function validateUser(username, password) {
    return registeredUsers.find(user => 
        user.username === username && user.password === password
    );
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    let isValid = true;
    
    clearError('username', 'usernameError');
    clearError('password', 'passwordError');
    
    if (username === '') {
        showError('username', 'usernameError', 'Nome de usuário é obrigatório');
        isValid = false;
    } else if (username.length < 3) {
        showError('username', 'usernameError', 'Nome de usuário deve ter pelo menos 3 caracteres');
        isValid = false;
    }
    
    if (password === '') {
        showError('password', 'passwordError', 'Senha é obrigatória');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', 'passwordError', 'Senha deve ter pelo menos 6 caracteres');
        isValid = false;
    }
    
    if (isValid) {
        // Simular loading
        const btn = document.querySelector('#loginForm .btn-primary');
        const originalText = btn.textContent;
        btn.textContent = 'Entrando...';
        btn.classList.add('loading');
        
        setTimeout(() => {
            const user = validateUser(username, password);
            if (user) {
                currentUser = user;
                document.getElementById('userName').textContent = user.fullname;
                document.getElementById('userAvatar').textContent = user.fullname.charAt(0).toUpperCase();
                
                // Salvar usuário no sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                
                showNotification(`Bem-vindo, ${user.fullname}!`, 'success');
                showPage('homePage');
                document.getElementById('loginForm').reset();
            } else {
                showError('password', 'passwordError', 'Nome de usuário ou senha incorretos');
                document.getElementById('password').focus();
                showNotification('Credenciais inválidas!', 'error');
            }
            
            btn.textContent = originalText;
            btn.classList.remove('loading');
        }, 1500);
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value.trim();
    const regUsername = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    const regPassword = document.getElementById('regPassword').value;
    
    // Validações
    if (!fullname || !regUsername || !email || !phone || !birthdate || !regPassword) {
        showNotification('Por favor, preencha todos os campos!', 'error');
        return;
    }
    
    if (regUsername.length < 3) {
        showNotification('Nome de usuário deve ter pelo menos 3 caracteres', 'error');
        return;
    }
    
    if (regPassword.length < 6) {
        showNotification('Senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }
    
    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, insira um email válido!', 'error');
        return;
    }
    
    const userExists = registeredUsers.find(user => user.username === regUsername);
    if (userExists) {
        showNotification('Este nome de usuário já está em uso!', 'error');
        return;
    }
    
    // Simular processamento
    const btn = document.querySelector('#registerForm .btn-primary');
    const originalText = btn.textContent;
    btn.textContent = 'Cadastrando...';
    btn.classList.add('loading');
    
    setTimeout(() => {
        const newUser = {
            username: regUsername,
            password: regPassword,
            fullname: fullname,
            email: email,
            phone: phone,
            birthdate: birthdate
        };
        
        registeredUsers.push(newUser);
        
        showNotification('Cadastro realizado com sucesso! Faça login para continuar.', 'success');
        document.getElementById('registerForm').reset();
        
        btn.textContent = originalText;
        btn.classList.remove('loading');
        
        showPage('loginPage');
    }, 2000);
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    const forgotEmail = document.getElementById('forgotEmail').value.trim();
    
    if (!forgotEmail) {
        showNotification('Por favor, insira seu e-mail!', 'error');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
        showNotification('Por favor, insira um email válido!', 'error');
        return;
    }
    
    // Simular envio de email
    const btn = document.querySelector('#forgotForm .btn-primary');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.classList.add('loading');
    
    setTimeout(() => {
        showNotification(`Um link de recuperação foi enviado para: ${forgotEmail}`, 'success');
        document.getElementById('forgotForm').reset();
        
        btn.textContent = originalText;
        btn.classList.remove('loading');
        
        showPage('loginPage');
    }, 2000);
}

function setupInputMasks() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/^(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
                e.target.value = value;
            }
        });
    }
}

function setupInputValidation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 3) {
                showError('username', 'usernameError', 'Nome de usuário deve ter pelo menos 3 caracteres');
            } else {
                clearError('username', 'usernameError');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 6) {
                showError('password', 'passwordError', 'Senha deve ter pelo menos 6 caracteres');
            } else {
                clearError('password', 'passwordError');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                showNotification('Por favor, insira um email válido!', 'error');
            }
        });
    }
}

// Função para logout
function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    showNotification('Logout realizado com sucesso!', 'success');
    showPage('loginPage');
}

// Restaurar estado da sessão
function restoreSession() {
    const savedUser = sessionStorage.getItem('currentUser');
    const savedPage = sessionStorage.getItem('currentPage');
    
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            currentUser = user;
            document.getElementById('userName').textContent = user.fullname;
            document.getElementById('userAvatar').textContent = user.fullname.charAt(0).toUpperCase();
            
            if (savedPage && savedPage !== 'loginPage') {
                showPage(savedPage);
            } else {
                showPage('homePage');
            }
        } catch (e) {
            console.error('Erro ao restaurar sessão:', e);
            showPage('loginPage');
        }
    } else {
        showPage('loginPage');
    }
}

// Adicionar animação de shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

document.addEventListener('DOMContentLoaded', function() {
    setupImageUpload('loginImageContainer', 'loginImage');
    setupImageUpload('registerImageContainer', 'registerImage');
    setupHomeImageUpload();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }
    
    setupInputMasks();
    setupInputValidation();
    
    // Adicionar botão de logout se estiver na home page
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Sair';
        logoutBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            margin-left: 10px;
            transition: background 0.3s;
        `;
        logoutBtn.onmouseover = function() {
            this.style.background = '#c0392b';
        };
        logoutBtn.onmouseout = function() {
            this.style.background = '#e74c3c';
        };
        logoutBtn.onclick = handleLogout;
        userInfo.appendChild(logoutBtn);
    }
    
    restoreSession();
    
    console.log('🚀 TIMESLOT System Initialized ✓');
    console.log('📊 Registered users:', registeredUsers.length);
    console.log('👤 Current user:', currentUser);
});