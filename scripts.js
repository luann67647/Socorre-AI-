

// Função para navegar no carrossel
function prevSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const container = carousel.querySelector('.carousel-container');
    const items = Array.from(container.children);
    const currentIndex = items.findIndex(item => item.classList.contains('active'));
    
    // Remove a classe 'active' do item atual
    items[currentIndex].classList.remove('active');
    
    // Calcula o índice do item anterior
    const prevIndex = (currentIndex - 1 + items.length) % items.length;

    // Adiciona a classe 'active' ao item anterior
    items[prevIndex].classList.add('active');

    // Ajusta a posição do carrossel
    container.style.transform = `translateX(-${prevIndex * 100}%)`;
}

function nextSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const container = carousel.querySelector('.carousel-container');
    const items = Array.from(container.children);
    const currentIndex = items.findIndex(item => item.classList.contains('active'));
    
    // Remove a classe 'active' do item atual
    items[currentIndex].classList.remove('active');
    
    // Calcula o índice do próximo item
    const nextIndex = (currentIndex + 1) % items.length;

    // Adiciona a classe 'active' ao próximo item
    items[nextIndex].classList.add('active');

    // Ajusta a posição do carrossel
    container.style.transform = `translateX(-${nextIndex * 100}%)`;
}

// Inicialização dos carrosséis
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        if (items.length > 0) {
            items[0].classList.add('active'); // Define o primeiro item como ativo
            // Ajusta a posição inicial do carrossel
            const container = carousel.querySelector('.carousel-container');
            container.style.transform = `translateX(0)`;
        }
    });
});


// Função para ir para o slide anterior
function prevSlide(carouselId) {
    const container = document.getElementById(carouselId).querySelector('.carousel-container');
    const items = container.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const currentTransform = container.style.transform.replace('translateX(', '').replace('%)', '') || 0;
    let newTransform = parseInt(currentTransform) + 100;

    if (newTransform > 0) {
        newTransform = -(totalItems - 1) * 100; // Vai para o final se atingir o início
    }

    container.style.transform = `translateX(${newTransform}%)`;
}
// script.js

// Adiciona um sticker ao chat
function addSticker(stickerUrl) {
    const chatBox = document.getElementById('chat-box');
    const img = document.createElement('img');
    img.src = stickerUrl;
    img.style.maxWidth = '200px';
    img.style.maxHeight = '200px';
    img.style.borderRadius = '8px';
    img.style.margin = '5px 0';
    chatBox.appendChild(img);
}

// Lida com o envio do formulário
document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name-input');
    const messageInput = document.getElementById('message-input');
    const fileInput = document.getElementById('file-input');
    const chatBox = document.getElementById('chat-box');
    const name = nameInput.value.trim() || 'Anônimo'; // Usa o nome ou 'Anônimo' se não estiver definido

    // Envia a mensagem de texto
    if (messageInput.value.trim()) {
        const message = document.createElement('div');
        message.innerHTML = `<strong>${name}:</strong> ${messageInput.value}`;
        chatBox.appendChild(message);
        messageInput.value = '';
    }

    // Envia o arquivo
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileMessage = document.createElement('div');
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                img.style.borderRadius = '8px';
                img.style.margin = '5px 0';
                fileMessage.appendChild(img);
            } else if (file.type.startsWith('audio/')) {
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = e.target.result;
                audio.style.borderRadius = '8px';
                audio.style.margin = '5px 0';
                fileMessage.appendChild(audio);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.controls = true;
                video.src = e.target.result;
                video.style.maxWidth = '200px';
                video.style.maxHeight = '200px';
                video.style.borderRadius = '8px';
                video.style.margin = '5px 0';
                fileMessage.appendChild(video);
            }
            chatBox.appendChild(fileMessage);
        };

        reader.readAsDataURL(file);
        fileInput.value = '';
    }
});

// Abre o seletor de arquivos quando o botão de anexo é clicado
document.getElementById('attach-button').addEventListener('click', function() {
    document.getElementById('file-input').click();
});

// Adiciona um evento de envio ao formulário de chat
document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText) {
        addMessage(messageText, 'user');
        messageInput.value = ''; // Limpa o campo de entrada

        // Simula uma resposta do bot
        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            addMessage(botResponse, 'bot');
        }, 1000);
    }

    // Mantém o scroll no final
    scrollToBottom();
});

// Adiciona uma mensagem ao chat
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.innerHTML = escapeHTML(text);
    document.getElementById('chat-box').appendChild(messageElement);

    // Mostra notificação se não estiver visível
    showNotification('Nova mensagem recebida!');
}

// Simula uma resposta do bot
function getBotResponse(userMessage) {
    return `Você disse: "${userMessage}"`;
}

// Mantém o scroll no final do chat
function scrollToBottom() {
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Escapa caracteres HTML para prevenir XSS
function escapeHTML(text) {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');
}

// Mostra uma notificação por um tempo limitado
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
// Função para exibir a seção desejada e ocultar as outras
function showSection(sectionId) {
    // Oculta todas as seções
    const sections = document.querySelectorAll('.carousel-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Exibe a seção selecionada
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }
}

// Adiciona um evento de envio ao formulário de cálculo de média ENEM
document.getElementById('media-enem-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const notaLinguagens = parseFloat(document.getElementById('nota-linguagens').value);
    const notaMatematica = parseFloat(document.getElementById('nota-matematica').value);
    const notaCienciasNatureza = parseFloat(document.getElementById('nota-ciencias-natureza').value);
    const notaCienciasHumanas = parseFloat(document.getElementById('nota-ciencias-humanas').value);
    const notaRedacao = parseFloat(document.getElementById('nota-redacao').value);

    if (!isNaN(notaLinguagens) && !isNaN(notaMatematica) && !isNaN(notaCienciasNatureza) && !isNaN(notaCienciasHumanas) && !isNaN(notaRedacao)) {
        const media = (notaLinguagens + notaMatematica + notaCienciasNatureza + notaCienciasHumanas + notaRedacao) / 5;

        // Exibe o resultado
        document.getElementById('average-score').textContent = `Média: ${media.toFixed(2)}`;
        document.getElementById('result-message').classList.remove('hidden');
    }
});


// Função para exibir a seção correta com base na categoria selecionada
function showSection(sectionId) {
    document.querySelectorAll('.carousel-section, .comments-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Função para enviar comentários
function submitComment(event) {
    event.preventDefault();
    const commentInput = document.getElementById('comment');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentsList = document.getElementById('comments-list');
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.textContent = commentText;

        commentsList.appendChild(commentItem);
        commentInput.value = ''; // Limpa o campo de comentário
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('comment-form').addEventListener('submit', submitComment);


    
});

