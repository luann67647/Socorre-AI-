    
  document.getElementById('avaliar-redacao-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Coleta os dados do formulário
    const avaliadoraEmail = document.getElementById('avaliadora-email').value;
    const emailDestino = document.getElementById('email-destino').value;
    const nome = document.getElementById('Avaliadora-nome').value;
    const nota = document.getElementById('nota').value;
    const repertorios = document.getElementById('repertorios').value;
    const argumentacao = document.getElementById('argumentacao').value;
    const coerencia = document.getElementById('coerencia').value;
    const normas = document.getElementById('normas').value;
    const comentarios = document.getElementById('comentarios').value;

    // Valida os dados
    if (!avaliadoraEmail || !emailDestino || !nome || !nota || !repertorios || !argumentacao || !coerencia || !normas || !comentarios) {
        alert('Todos os campos devem ser preenchidos.');
        return;
    }

    // Envia os dados para o servidor
    fetch('/enviar-avaliacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avaliadoraEmail,
            emailDestino,
            nome,
            nota,
            repertorios,
            argumentacao,
            coerencia,
            normas,
            comentarios
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('feedback-status').innerText = 'A avaliação foi enviada com sucesso!';
        } else {
            document.getElementById('feedback-status').innerText = 'Erro ao enviar a avaliação.';
        }
        document.getElementById('feedback-message').classList.remove('hidden');
    })
    .catch(error => {
        console.error('Erro ao enviar a avaliação:', error);
        alert('Ocorreu um erro ao enviar a avaliação. Tente novamente.');
    });
});
// script.js
const startQuizButton = document.getElementById('start-quiz-btn');
const interactiveImage = document.getElementById('interactive-image');

startQuizButton.addEventListener('click', () => {
    alert('Quiz iniciado! Boa sorte!');
});

interactiveImage.addEventListener('click', () => {
    alert('Imagem clicada!');
});

    function fadeInImage() {
      interactiveImage.style.opacity = 0;
      let opacity = 0;
      const interval = setInterval(() => {
          opacity += 0.05;
          interactiveImage.style.opacity = opacity;
          if (opacity >= 1) clearInterval(interval);
      }, 30);
  }

  window.addEventListener('load', fadeInImage);


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

document.getElementById('media-enem-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo as notas
    const notaLinguagens = parseFloat(document.getElementById('nota-linguagens').value);
    const notaMatematica = parseFloat(document.getElementById('nota-matematica').value);
    const notaCienciasNatureza = parseFloat(document.getElementById('nota-ciencias-natureza').value);
    const notaCienciasHumanas = parseFloat(document.getElementById('nota-ciencias-humanas').value);
    const notaRedacao = parseFloat(document.getElementById('nota-redacao').value);

    // Calculando a média
    const media = (notaLinguagens + notaMatematica + notaCienciasNatureza + notaCienciasHumanas + notaRedacao) / 5;
    
    // Mostrando a média
    document.getElementById('average-score').textContent = `Média: ${media.toFixed(2)}`;

    // Obtendo a faculdade escolhida e sua nota de corte
    const faculdade = document.getElementById('faculdade').value;
    let notaDeCorte;

    switch(faculdade) {
        case 'usp':
            notaDeCorte = 750;
            break;
        case 'unicamp':
            notaDeCorte = 740;
            break;
        case 'ufrj':
            notaDeCorte = 730;
            break;
        case 'unesp':
            notaDeCorte = 720;
            break;
        default:
            notaDeCorte = 0;
    }

    // Verificando se passou na faculdade escolhida
    const passou = media >= notaDeCorte;
    const resultado = passou ? 'Parabéns, você passou!' : 'Infelizmente, você não passou.';

    // Mostrando o resultado
    document.getElementById('admission-result').textContent = resultado;
    document.getElementById('result-message').classList.remove('hidden');
});

// script.js

// Função para exibir a seção desejada
function showSection(sectionId) {
    document.querySelectorAll('.carousel-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Função para carregar as redações postadas
async function loadRedacoes() {
    const redacoesList = document.getElementById('redacoes-list');
    redacoesList.innerHTML = ''; // Limpa a lista antes de adicionar novas redações

    try {
        const response = await fetch('https://your-server-url.com/get-redacoes');
        if (response.ok) {
            const redacoes = await response.json();
            redacoes.forEach(redacao => {
                const redacaoItem = document.createElement('div');
                redacaoItem.classList.add('redacao-item');
                redacaoItem.innerHTML = `
                    <h3>ID: ${redacao.id}</h3>
                    <p><strong>Nome:</strong> ${redacao.nome}</p>
                    <p><strong>Turma:</strong> ${redacao.turma}</p>
                    <p><strong>Tema:</strong> ${redacao.tema}</p>
                    <p><strong>Professora:</strong> ${redacao.professora}</p>
                    <p><a href="${redacao.link}" target="_blank">Ver Redação</a></p>
                    <img src="${redacao.imagem}" alt="Imagem da Redação">
                `;
                redacoesList.appendChild(redacaoItem);
            });
        } else {
            alert('Erro ao carregar as redações.');
        }
    } catch (error) {
        console.error('Erro ao carregar as redações:', error);
        alert('Erro ao carregar as redações.');
    }
}

// Obtém elementos do DOM
const postarRedacaoForm = document.getElementById('postar-redacao-form');
const avaliarRedacaoForm = document.getElementById('avaliar-redacao-form');
const submissionMessage = document.getElementById('submission-message');
const feedbackMessage = document.getElementById('feedback-message');

// Adiciona eventos de envio aos formulários
postarRedacaoForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const turma = document.getElementById('turma').value;
    const tema = document.getElementById('tema').value;
    const professora = document.getElementById('professora').value;
    const fileInput = document.getElementById('file-upload');

    // Valida os campos
    if (!fileInput.files.length) {
        alert('Por favor, faça o upload de um arquivo de imagem.');
        return;
    }

    // Cria um objeto FormData
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('nome', nome);
    formData.append('turma', turma);
    formData.append('tema', tema);
    formData.append('professora', professora);

    try {
        // Envia o formulário para o servidor
        const response = await fetch('https://your-server-url.com/postar-redacao', {
            method: 'POST',
            body: formData,
        });

        // Verifica se o envio foi bem-sucedido
        if (response.ok) {
            submissionMessage.classList.remove('hidden');
            loadRedacoes(); // Atualiza a lista de redações
        } else {
            alert('Erro ao postar a redação.');
        }
    } catch (error) {
        console.error('Erro ao postar a redação:', error);
        alert('Erro ao postar a redação.');
    }
});

avaliarRedacaoForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const redacaoId = document.getElementById('redacao-id').value;
    const repertorios = document.getElementById('repertorios').value;
    const argumentacao = document.getElementById('argumentacao').value;
    const coerencia = document.getElementById('coerencia').value;
    const normas = document.getElementById('normas').value;
    const comentarios = document.getElementById('comentarios').value;

    // Valida os campos
    if (!redacaoId || !repertorios || !argumentacao || !coerencia || !normas || !comentarios) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Cria um objeto com os dados da avaliação
    const avaliacao = {
        redacaoId: redacaoId,
        repertorios: repertorios,
        argumentacao: argumentacao,
        coerencia: coerencia,
        normas: normas,
        comentarios: comentarios
    };

    try {
        // Envia a avaliação para o servidor
        const response = await fetch('https://your-server-url.com/avaliar-redacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaliacao),
        });

        // Verifica se o envio foi bem-sucedido
        if (response.ok) {
            feedbackMessage.classList.remove('hidden');
        } else {
            alert('Erro ao enviar a avaliação.');
        }
    } catch (error) {
        console.error('Erro ao enviar a avaliação:', error);
        alert('Erro ao enviar a avaliação.');
    }
});

// Carrega as redações quando a página é carregada
window.addEventListener('load', loadRedacoes);


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
}// script.js

// Função para exibir seções
function showSection(sectionId) {
    document.querySelectorAll('.carousel-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Lidar com o formulário de postagem de redação
document.getElementById('postar-redacao-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const turma = document.getElementById('turma').value;
    const tema = document.getElementById('tema').value;
    const professora = document.getElementById('professora').value;
    const fileUpload = document.getElementById('file-upload').files[0];
    const imageUrl = document.getElementById('image-url').value;
    const pdfUrl = document.getElementById('pdf-url').value;
    const textoRedacao = document.getElementById('texto-redacao').value;

    if (!fileUpload && !imageUrl && !pdfUrl && !textoRedacao) {
        alert('Por favor, faça o upload da imagem, cole o URL da imagem, cole o URL do PDF ou digite o texto da redação.');
        return;
    }

    const redacoesList = document.getElementById('redacoes-list');
    const redacaoItem = document.createElement('div');
    redacaoItem.classList.add('redacao-item');

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 semana

    let content;
    if (fileUpload) {
        const reader = new FileReader();
        reader.onload = function (e) {
            content = `<img src="${e.target.result}" alt="Imagem da Redação">`;
            redacaoItem.innerHTML = `
                <h3>${nome} - ${turma}</h3>
                <p>Tema: ${tema}</p>
                <p>Professora: ${professora}</p>
                <p>Postado em: ${currentDate.toLocaleDateString()}</p>
                <p>Expira em: ${expirationDate.toLocaleDateString()}</p>
                ${content}
            `;
            redacoesList.appendChild(redacaoItem);
            document.getElementById('postar-redacao-form').reset();
            document.getElementById('submission-message').classList.remove('hidden');
        };
        reader.readAsDataURL(fileUpload);
    } else if (imageUrl) {
        content = `<img src="${imageUrl}" alt="Imagem da Redação">`;
        redacaoItem.innerHTML = `
            <h3>${nome} - ${turma}</h3>
            <p>Tema: ${tema}</p>
            <p>Professora: ${professora}</p>
            <p>Postado em: ${currentDate.toLocaleDateString()}</p>
            <p>Expira em: ${expirationDate.toLocaleDateString()}</p>
            ${content}
        `;
        redacoesList.appendChild(redacaoItem);
        document.getElementById('postar-redacao-form').reset();
        document.getElementById('submission-message').classList.remove('hidden');
    } else if (pdfUrl) {
        content = `<iframe src="${pdfUrl}" frameborder="0" style="width: 100%; height: 500px;"></iframe>`;
        redacaoItem.innerHTML = `
            <h3>${nome} - ${turma}</h3>
            <p>Tema: ${tema}</p>
            <p>Professora: ${professora}</p>
            <p>Postado em: ${currentDate.toLocaleDateString()}</p>
            <p>Expira em: ${expirationDate.toLocaleDateString()}</p>
            ${content}
        `;
        redacoesList.appendChild(redacaoItem);
        document.getElementById('postar-redacao-form').reset();
        document.getElementById('submission-message').classList.remove('hidden');
    } else if (textoRedacao) {
        content = `<p>${textoRedacao}</p>`;
        redacaoItem.innerHTML = `
            <h3>${nome} - ${turma}</h3>
            <p>Tema: ${tema}</p>
            <p>Professora: ${professora}</p>
            <p>Postado em: ${currentDate.toLocaleDateString()}</p>
            <p>Expira em: ${expirationDate.toLocaleDateString()}</p>
            ${content}
        `;
        redacoesList.appendChild(redacaoItem);
        document.getElementById('postar-redacao-form').reset();
        document.getElementById('submission-message').classList.remove('hidden');
    }
});


// Lidar com o formulário de avaliação de redação
document.getElementById('avaliar-redacao-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const redacaoNome = document.getElementById('redacao-nome').value;
    const nota = document.getElementById('nota').value;
    const repertorios = document.getElementById('repertorios').value;
    const argumentacao = document.getElementById('argumentacao').value;
    const coerencia = document.getElementById('coerencia').value;
    const normas = document.getElementById('normas').value;
    const comentarios = document.getElementById('comentarios').value;

    // Implementar a lógica para avaliação (ex.: salvar dados em um banco de dados)
    // Esta parte pode incluir envio para um servidor ou armazenamento local

    // Limpar o formulário e exibir a mensagem de sucesso
    document.getElementById('avaliar-redacao-form').reset();
    document.getElementById('feedback-message').classList.remove('hidden');
});


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('comment-form').addEventListener('submit', submitComment);


    
});













  







