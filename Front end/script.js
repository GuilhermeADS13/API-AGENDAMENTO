const validUsers = [
    { username: 'admin', password: 'admin123', fullname: 'Administrador' },
    { username: 'usuario', password: 'senha123', fullname: 'Usuário Teste' },
    { username: 'teste', password: 'teste123', fullname: 'Teste Silva' }
];

let registeredUsers = [...validUsers];
let currentUser = null;

// =============================================
// SISTEMA DE NOTIFICAÇÕES
// =============================================

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
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// =============================================
// SISTEMA DE NAVEGAÇÃO
// =============================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    closeMobileMenu();
    
    // Salvar a página atual no sessionStorage
    sessionStorage.setItem('currentPage', pageId);
    
    // Atualizar informações do usuário quando navegar para páginas específicas
    if (currentUser) {
        updateUserInfo();
        
        // Carregar dados específicos da página
        if (pageId === 'reservationsPage') {
            loadUserReservations();
            loadReservationHistory();
        } else if (pageId === 'resourcesPage') {
            loadResources();
        }
    }
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

// =============================================
// SISTEMA DE AUTENTICAÇÃO
// =============================================

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
                updateUserInfo();
                
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

// =============================================
// SISTEMA DE RESERVAS
// =============================================

let userReservations = [
    {
        id: 1,
        room: 'Sala 482 - Bloco A',
        time: '13:00 - 14:40',
        reservedFor: '86/16/2025',
        reservedAt: '23/08/2025',
        status: 'active'
    },
    {
        id: 2,
        room: 'Sala 680 - Bloco C',
        time: '09:20 - 11:00',
        reservedFor: '89/16/2025',
        reservedAt: '23/08/2025',
        status: 'pending'
    },
    {
        id: 3,
        room: 'Auditório Principal',
        time: '08:00 - 12:00',
        reservedFor: '15/09/2025',
        reservedAt: '01/09/2025',
        status: 'completed'
    },
    {
        id: 4,
        room: 'Laboratório 205 - Bloco B',
        time: '14:00 - 16:00',
        reservedFor: '90/16/2025',
        reservedAt: '24/08/2025',
        status: 'active'
    }
];

let reservationHistory = [
    {
        id: 101,
        room: 'Sala 684 - Bloco A',
        time: '16:48 - 16:28',
        reservedFor: '24/03/2025',
        reservedAt: '13/05/2025',
        status: 'completed'
    },
    {
        id: 102,
        room: 'Sala 262 - Bloco B',
        time: '11:18 - 12:38',
        reservedFor: '13/05/2025',
        reservedAt: '10/07/2025',
        status: 'completed'
    },
    {
        id: 103,
        room: 'Sala 206 - Bloco B',
        time: '11:18 - 12:38',
        reservedFor: '10/07/2025',
        reservedAt: '24/03/2025',
        status: 'completed'
    }
];

function loadUserReservations() {
    const reservationsList = document.querySelector('.reservations-list');
    if (!reservationsList) return;
    
    // Limpar lista existente
    reservationsList.innerHTML = '';
    
    if (userReservations.length === 0) {
        reservationsList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="#6c757d">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                <h3>Nenhuma reserva encontrada</h3>
                <p>Você ainda não fez nenhuma reserva.</p>
                <button class="btn-primary" onclick="openNewReservationModal()">Fazer primeira reserva</button>
            </div>
        `;
        return;
    }
    
    // Adicionar reservas
    userReservations.forEach(reservation => {
        const reservationCard = createReservationCard(reservation);
        reservationsList.appendChild(reservationCard);
    });
    
    // Atualizar estatísticas
    updateReservationsStats();
}

function createReservationCard(reservation) {
    const card = document.createElement('div');
    card.className = 'reservation-card';
    card.innerHTML = `
        <div class="reservation-header">
            <h3>${reservation.room}</h3>
            <span class="status-badge status-${reservation.status}">
                ${getStatusText(reservation.status)}
            </span>
        </div>
        <div class="reservation-details">
            <div class="detail-item">
                <span class="detail-label">Horário:</span>
                <span class="detail-value">${reservation.time}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Reservado Para:</span>
                <span class="detail-value">${reservation.reservedFor}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Reservado Em:</span>
                <span class="detail-value">${reservation.reservedAt}</span>
            </div>
        </div>
        <div class="reservation-actions">
            ${reservation.status === 'completed' ? 
                `<button class="btn-secondary" disabled>Editar</button>
                 <button class="btn-outline" onclick="viewReservationDetails(${reservation.id})">Detalhes</button>` :
                `<button class="btn-secondary" onclick="editReservation(${reservation.id})">Editar</button>
                 <button class="btn-danger" onclick="cancelReservation(${reservation.id})">Cancelar</button>`
            }
        </div>
    `;
    
    return card;
}

function getStatusText(status) {
    const statusMap = {
        'active': 'Ativa',
        'pending': 'Pendente',
        'completed': 'Concluída',
        'cancelled': 'Cancelada'
    };
    return statusMap[status] || status;
}

function updateReservationsStats() {
    const total = userReservations.length;
    const active = userReservations.filter(r => r.status === 'active').length;
    const pending = userReservations.filter(r => r.status === 'pending').length;
    const thisMonth = userReservations.filter(r => {
        const reservedDate = new Date(r.reservedAt.split('/').reverse().join('-'));
        const now = new Date();
        return reservedDate.getMonth() === now.getMonth() && 
               reservedDate.getFullYear() === now.getFullYear();
    }).length;
    
    // Atualizar elementos de estatística
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = total;
        statNumbers[1].textContent = active;
        statNumbers[2].textContent = pending;
        statNumbers[3].textContent = thisMonth;
    }
}

function filterReservations() {
    const searchTerm = document.getElementById('searchReservations').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    const filteredReservations = userReservations.filter(reservation => {
        const matchesSearch = reservation.room.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
        
        // Filtro por data (simplificado)
        let matchesDate = true;
        if (dateFilter !== 'all') {
            const today = new Date();
            const reservedDate = new Date(reservation.reservedAt.split('/').reverse().join('-'));
            
            switch(dateFilter) {
                case 'today':
                    matchesDate = reservedDate.toDateString() === today.toDateString();
                    break;
                case 'week':
                    const weekStart = new Date(today);
                    weekStart.setDate(today.getDate() - today.getDay());
                    matchesDate = reservedDate >= weekStart;
                    break;
                case 'month':
                    matchesDate = reservedDate.getMonth() === today.getMonth() && 
                                 reservedDate.getFullYear() === today.getFullYear();
                    break;
            }
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });
    
    const reservationsList = document.getElementById('reservationsList');
    if (!reservationsList) return;
    
    reservationsList.innerHTML = '';
    
    if (filteredReservations.length === 0) {
        reservationsList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="#6c757d">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <h3>Nenhuma reserva encontrada</h3>
                <p>Tente ajustar os filtros de busca.</p>
            </div>
        `;
        return;
    }
    
    filteredReservations.forEach(reservation => {
        const reservationCard = createReservationCard(reservation);
        reservationsList.appendChild(reservationCard);
    });
}

// =============================================
// HISTÓRICO DE RESERVAS
// =============================================

function loadReservationHistory() {
    const historyTableBody = document.getElementById('historyTableBody');
    if (!historyTableBody) return;
    
    historyTableBody.innerHTML = '';
    
    if (reservationHistory.length === 0) {
        historyTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 3rem; color: var(--gray);">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#6c757d" style="margin-bottom: 1rem;">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <div>Nenhum registro no histórico</div>
                    <small>As reservas concluídas aparecerão aqui automaticamente</small>
                </td>
            </tr>
        `;
        return;
    }
    
    reservationHistory.forEach(reservation => {
        const row = createHistoryRow(reservation);
        historyTableBody.appendChild(row);
    });
    
    updateHistoryStats();
}

function createHistoryRow(reservation) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${reservation.room}</td>
        <td>${reservation.time}</td>
        <td>${reservation.reservedFor}</td>
        <td>${reservation.reservedAt}</td>
    `;
    
    return row;
}

function updateHistoryStats() {
    const total = reservationHistory.length;
    const completed = reservationHistory.filter(r => r.status === 'completed').length;
    const cancelled = reservationHistory.filter(r => r.status === 'cancelled').length;
    const attendanceRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    if (document.getElementById('totalHistory')) {
        document.getElementById('totalHistory').textContent = total;
        document.getElementById('completedHistory').textContent = completed;
        document.getElementById('cancelledHistory').textContent = cancelled;
        document.getElementById('attendanceRate').textContent = attendanceRate + '%';
    }
}

// =============================================
// MODAIS DE RESERVA
// =============================================

function openNewReservationModal() {
    const modal = document.getElementById('newReservationModal');
    if (modal) {
        modal.classList.add('active');
        
        // Preencher data atual como padrão
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('reservationDate');
        if (dateInput) {
            dateInput.value = today;
            dateInput.min = today; // Não permitir datas passadas
        }
    }
}

function closeNewReservationModal() {
    const modal = document.getElementById('newReservationModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('newReservationForm').reset();
    }
}

function closeReservationDetailsModal() {
    const modal = document.getElementById('reservationDetailsModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function editReservation(reservationId) {
    const reservation = userReservations.find(r => r.id === reservationId);
    if (reservation) {
        showNotification(`Editando reserva: ${reservation.room}`, 'info');
        // Abrir modal de edição (poderia ser implementado)
        openNewReservationModal();
    }
}

function cancelReservation(reservationId) {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
        const reservation = userReservations.find(r => r.id === reservationId);
        if (reservation) {
            reservation.status = 'cancelled';
            loadUserReservations();
            showNotification('Reserva cancelada com sucesso!', 'success');
        }
    }
}

function viewReservationDetails(reservationId) {
    const reservation = userReservations.find(r => r.id === reservationId);
    if (reservation) {
        const modal = document.getElementById('reservationDetailsModal');
        const content = document.getElementById('reservationDetailsContent');
        
        if (modal && content) {
            content.innerHTML = `
                <div class="detail-section">
                    <h3>Informações da Reserva</h3>
                    <div class="detail-grid">
                        <div class="detail-item-modal">
                            <span class="detail-label-modal">Sala/Recurso</span>
                            <span class="detail-value-modal">${reservation.room}</span>
                        </div>
                        <div class="detail-item-modal">
                            <span class="detail-label-modal">Horário</span>
                            <span class="detail-value-modal">${reservation.time}</span>
                        </div>
                        <div class="detail-item-modal">
                            <span class="detail-label-modal">Reservado Para</span>
                            <span class="detail-value-modal">${reservation.reservedFor}</span>
                        </div>
                        <div class="detail-item-modal">
                            <span class="detail-label-modal">Reservado Em</span>
                            <span class="detail-value-modal">${reservation.reservedAt}</span>
                        </div>
                        <div class="detail-item-modal">
                            <span class="detail-label-modal">Status</span>
                            <span class="detail-value-modal">${getStatusText(reservation.status)}</span>
                        </div>
                    </div>
                </div>
            `;
            modal.classList.add('active');
        }
    }
}

// =============================================
// SISTEMA DE GERENCIAMENTO DE RECURSOS
// =============================================

let resources = [
    {
        id: 1,
        name: 'Sala 402 - Bloco A',
        type: 'sala',
        location: 'Bloco A, 4º andar',
        capacity: 40,
        status: 'maintenance',
        code: 'SALA402-A',
        description: 'Sala de aula padrão com projetor',
        equipment: ['projetor', 'quadro_branco']
    },
    {
        id: 2,
        name: 'Sala 603 - Bloco B',
        type: 'sala',
        location: 'Bloco B, 6º andar',
        capacity: 35,
        status: 'active',
        code: 'SALA603-B',
        description: 'Sala de aula com ar condicionado',
        equipment: ['ar_condicionado', 'quadro_branco']
    },
    {
        id: 3,
        name: 'Laboratório de Informática',
        type: 'laboratorio',
        location: 'Bloco C, 2º andar',
        capacity: 25,
        status: 'active',
        code: 'LABINFO-C',
        description: 'Laboratório com 25 computadores',
        equipment: ['computadores', 'internet', 'projetor', 'ar_condicionado']
    },
    {
        id: 4,
        name: 'Auditório Principal',
        type: 'auditorio',
        location: 'Bloco Central, Térreo',
        capacity: 200,
        status: 'active',
        code: 'AUDITORIO-P',
        description: 'Auditório para eventos e palestras',
        equipment: ['projetor', 'ar_condicionado', 'internet']
    }
];

function loadResources() {
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (!resourcesGrid) return;
    
    resourcesGrid.innerHTML = '';
    
    if (resources.length === 0) {
        resourcesGrid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="#6c757d">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
                <h3>Nenhum recurso cadastrado</h3>
                <p>Comece adicionando o primeiro recurso ao sistema.</p>
                <button class="btn-primary" onclick="openResourceModal()">Adicionar Primeiro Recurso</button>
            </div>
        `;
        return;
    }
    
    resources.forEach(resource => {
        const resourceCard = createResourceCard(resource);
        resourcesGrid.appendChild(resourceCard);
    });
    
    updateResourcesStats();
}

function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
        <div class="resource-header">
            <h3>${resource.name}</h3>
            <span class="resource-status status-${resource.status}">
                ${getResourceStatusText(resource.status)}
            </span>
        </div>
        <div class="resource-details">
            <div class="detail-item">
                <span class="detail-label">Localização:</span>
                <span class="detail-value">${resource.location}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Capacidade:</span>
                <span class="detail-value">${resource.capacity} pessoas</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Código:</span>
                <span class="detail-value">${resource.code}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Equipamentos:</span>
                <span class="detail-value">${getEquipmentText(resource.equipment)}</span>
            </div>
        </div>
        <div class="resource-actions">
            <button class="btn-secondary" onclick="editResource(${resource.id})">Editar</button>
            <button class="btn-danger" onclick="deleteResource(${resource.id})">Excluir</button>
        </div>
    `;
    
    return card;
}

function getResourceStatusText(status) {
    const statusMap = {
        'active': 'Ativo',
        'maintenance': 'Em Manutenção',
        'inactive': 'Inativo'
    };
    return statusMap[status] || status;
}

function getEquipmentText(equipment) {
    const equipmentMap = {
        'projetor': 'Projetor',
        'ar_condicionado': 'Ar Condicionado',
        'internet': 'Internet',
        'computadores': 'Computadores',
        'quadro_branco': 'Quadro Branco'
    };
    
    if (!equipment || equipment.length === 0) {
        return 'Nenhum';
    }
    
    return equipment.map(eq => equipmentMap[eq] || eq).join(', ');
}

function updateResourcesStats() {
    const total = resources.length;
    const available = resources.filter(r => r.status === 'active').length;
    const maintenance = resources.filter(r => r.status === 'maintenance').length;
    const usageRate = total > 0 ? Math.round((available / total) * 100) : 0;
    
    if (document.getElementById('totalResources')) {
        document.getElementById('totalResources').textContent = total;
        document.getElementById('availableResources').textContent = available;
        document.getElementById('maintenanceResources').textContent = maintenance;
        document.getElementById('usageRate').textContent = usageRate + '%';
    }
}

function filterResources() {
    const searchTerm = document.getElementById('searchResources').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.name.toLowerCase().includes(searchTerm) || 
                            resource.location.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || resource.status === statusFilter;
        const matchesType = typeFilter === 'all' || resource.type === typeFilter;
        
        return matchesSearch && matchesStatus && matchesType;
    });
    
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (!resourcesGrid) return;
    
    resourcesGrid.innerHTML = '';
    
    if (filteredResources.length === 0) {
        resourcesGrid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="#6c757d">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <h3>Nenhum recurso encontrado</h3>
                <p>Tente ajustar os filtros de busca.</p>
            </div>
        `;
        return;
    }
    
    filteredResources.forEach(resource => {
        const resourceCard = createResourceCard(resource);
        resourcesGrid.appendChild(resourceCard);
    });
}

// =============================================
// MODAIS DE RECURSOS
// =============================================

let currentEditingResource = null;

function openResourceModal(resourceId = null) {
    const modal = document.getElementById('resourceModal');
    const title = document.getElementById('resourceModalTitle');
    const form = document.getElementById('resourceForm');
    
    if (resourceId) {
        // Modo edição
        currentEditingResource = resources.find(r => r.id === resourceId);
        title.textContent = 'Editar Recurso';
        populateResourceForm(currentEditingResource);
    } else {
        // Modo criação
        currentEditingResource = null;
        title.textContent = 'Novo Recurso';
        if (form) form.reset();
        
        // Gerar código automático
        const codeInput = document.getElementById('resourceCode');
        if (codeInput) {
            const randomCode = 'REC' + Date.now().toString().slice(-6);
            codeInput.value = randomCode;
        }
    }
    
    if (modal) modal.classList.add('active');
}

function closeResourceModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) modal.classList.remove('active');
    currentEditingResource = null;
}

function populateResourceForm(resource) {
    document.getElementById('resourceId').value = resource.id;
    document.getElementById('resourceName').value = resource.name;
    document.getElementById('resourceType').value = resource.type;
    document.getElementById('resourceLocation').value = resource.location;
    document.getElementById('resourceCapacity').value = resource.capacity;
    document.getElementById('resourceStatus').value = resource.status;
    document.getElementById('resourceCode').value = resource.code;
    document.getElementById('resourceDescription').value = resource.description || '';
    
    // Limpar checkboxes
    document.querySelectorAll('input[name="equipment"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Marcar equipamentos
    if (resource.equipment) {
        resource.equipment.forEach(eq => {
            const checkbox = document.querySelector(`input[name="equipment"][value="${eq}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
}

function editResource(resourceId) {
    openResourceModal(resourceId);
}

function deleteResource(resourceId) {
    if (confirm('Tem certeza que deseja excluir este recurso?')) {
        resources = resources.filter(r => r.id !== resourceId);
        loadResources();
        showNotification('Recurso excluído com sucesso!', 'success');
    }
}

// =============================================
// UTILITÁRIOS E CONFIGURAÇÕES
// =============================================

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

function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentPage');
    showNotification('Logout realizado com sucesso!', 'success');
    showPage('loginPage');
}

function updateUserInfo() {
    if (currentUser) {
        // Home Page
        const userNameHome = document.getElementById('userName');
        const userAvatarHome = document.getElementById('userAvatar');
        
        if (userNameHome) userNameHome.textContent = currentUser.fullname;
        if (userAvatarHome) userAvatarHome.textContent = currentUser.fullname.charAt(0).toUpperCase();
        
        // Reservations Page
        const userNameReservations = document.getElementById('userNameReservations');
        const userAvatarReservations = document.getElementById('userAvatarReservations');
        
        if (userNameReservations) userNameReservations.textContent = currentUser.fullname;
        if (userAvatarReservations) userAvatarReservations.textContent = currentUser.fullname.charAt(0).toUpperCase();
        
        // Resources Page
        const userNameResources = document.getElementById('userNameResources');
        const userAvatarResources = document.getElementById('userAvatarResources');
        
        if (userNameResources) userNameResources.textContent = currentUser.fullname;
        if (userAvatarResources) userAvatarResources.textContent = currentUser.fullname.charAt(0).toUpperCase();
    }
}

function addLogoutButton() {
    const userInfoElements = document.querySelectorAll('.user-info');
    
    userInfoElements.forEach(userInfo => {
        // Verificar se já existe botão de logout
        if (!userInfo.querySelector('.logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
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
    });
}

// Restaurar estado da sessão
function restoreSession() {
    const savedUser = sessionStorage.getItem('currentUser');
    const savedPage = sessionStorage.getItem('currentPage');
    
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            currentUser = user;
            updateUserInfo();
            addLogoutButton();
            
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

// =============================================
// INICIALIZAÇÃO DO SISTEMA
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Configurar formulários
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
    
    const newReservationForm = document.getElementById('newReservationForm');
    if (newReservationForm) {
        newReservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Reserva criada com sucesso!', 'success');
            closeNewReservationModal();
            
            // Adicionar nova reserva (simulação)
            const newReservation = {
                id: Date.now(),
                room: document.getElementById('roomSelect').value,
                time: document.getElementById('startTime').value + ' - ' + document.getElementById('endTime').value,
                reservedFor: document.getElementById('reservationDate').value.split('-').reverse().join('/'),
                reservedAt: new Date().toLocaleDateString('pt-BR'),
                status: 'pending'
            };
            userReservations.push(newReservation);
            loadUserReservations();
        });
    }
    
    const resourceForm = document.getElementById('resourceForm');
    if (resourceForm) {
        resourceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const equipment = [];
            document.querySelectorAll('input[name="equipment"]:checked').forEach(checkbox => {
                equipment.push(checkbox.value);
            });
            
            const resourceData = {
                id: currentEditingResource ? currentEditingResource.id : Date.now(),
                name: document.getElementById('resourceName').value,
                type: document.getElementById('resourceType').value,
                location: document.getElementById('resourceLocation').value,
                capacity: parseInt(document.getElementById('resourceCapacity').value) || 0,
                status: document.getElementById('resourceStatus').value,
                code: document.getElementById('resourceCode').value,
                description: document.getElementById('resourceDescription').value,
                equipment: equipment
            };
            
            if (currentEditingResource) {
                // Atualizar recurso existente
                const index = resources.findIndex(r => r.id === currentEditingResource.id);
                resources[index] = resourceData;
                showNotification('Recurso atualizado com sucesso!', 'success');
            } else {
                // Adicionar novo recurso
                resources.push(resourceData);
                showNotification('Recurso adicionado com sucesso!', 'success');
            }
            
            loadResources();
            closeResourceModal();
        });
    }
    
    // Configurar utilitários
    setupInputMasks();
    setupInputValidation();
    
    // Restaurar sessão e inicializar
    restoreSession();
    
    console.log('🚀 TIMESLOT System Initialized ✓');
    console.log('📊 Registered users:', registeredUsers.length);
    console.log('👤 Current user:', currentUser);
    console.log('📅 User reservations:', userReservations.length);
    console.log('🏢 System resources:', resources.length);
});