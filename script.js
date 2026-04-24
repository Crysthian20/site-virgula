/* ================= LENIS ================= */

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function setRealVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setRealVH();
window.addEventListener('resize', setRealVH);
window.addEventListener('orientationchange', setRealVH);

/* ================= HERO LOGO INTERACTION ================= */
const logo = document.getElementById("logo");

document.addEventListener("mousemove", (e) => {
    if (!logo) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (e.clientX - centerX) / 12;
    const deltaY = (e.clientY - centerY) / 12;

    logo.style.transform = `
        translate(${deltaX}px, ${deltaY}px)
        rotate(${deltaX * 0.05}deg)
        scale(1.05)
    `;
});

// micro impacto ao entrar
if (logo) {
    logo.addEventListener("mouseenter", () => {
        logo.style.transform += " scale(1.08)";
    });
}

// reset quando sair da tela
document.addEventListener("mouseleave", () => {
    if (!logo) return;
    logo.style.transform = "translate(0,0) rotate(0deg) scale(1)";
});


/* ================= HEADER SHOW / HIDE (WITH DELAY) ================= */
const header = document.getElementById("header");
const hero = document.getElementById("hero");

let headerReady = false;

// tempo mínimo antes do header poder existir
window.addEventListener("load", () => {
    setTimeout(() => {
        headerReady = true;
    }, 1800); // ⏱ ajuste aqui (ex: 2200, 2500)
});

window.addEventListener("scroll", () => {
    if (!header || !hero || !headerReady) return;

    const heroBottom = hero.offsetHeight;

    if (window.scrollY > heroBottom - 80) {
        header.classList.add("show");
    } else {
        header.classList.remove("show");
    }
});

/* ================= WHATSAPP APARECER FORA DA HERO ================= */
const whatsapp = document.querySelector('.whatsapp-float');

window.addEventListener('scroll', () => {
    if (!hero || !whatsapp) return;

    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom <= 0) {
        // saiu da hero (entrou no fundo branco)
        whatsapp.classList.add('show');
    } else {
        // ainda na hero (amarelo)
        whatsapp.classList.remove('show');
    }
});


/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ================= SERVIÇOS SINCRONIZADO ================= */
const blocosTopo = document.querySelectorAll(".coluna-servico");
const colunasDetalhe = document.querySelectorAll(".coluna-detalhe");

function limparEstados() {
    [...blocosTopo, ...colunasDetalhe].forEach(el => {
        el.classList.remove("blur", "focus");
    });
}

function ativarGrupo(grupo) {
    limparEstados();

    [...blocosTopo, ...colunasDetalhe].forEach(el => {
        if (el.dataset.grupo === grupo) {
            el.classList.add("focus");
        } else {
            el.classList.add("blur");
        }
    });
}

function resetarTudo() {
    limparEstados();
}

/* 🔥 Ativa tanto no topo quanto na coluna */
[...blocosTopo, ...colunasDetalhe].forEach(el => {

    el.addEventListener("mouseenter", () => {
        ativarGrupo(el.dataset.grupo);
    });

    el.addEventListener("mouseleave", () => {
        resetarTudo();
    });

});

/* ================= CLIENTES FOCUS ================= */
const clientesGrid = document.querySelector(".clientes-grid");

if (clientesGrid) {
    const clientes = clientesGrid.querySelectorAll(".cliente-logo");

    clientes.forEach(cliente => {
        cliente.addEventListener("mouseenter", () => {
            clientes.forEach(c => c.classList.add("dim"));
            cliente.classList.remove("dim");
        });

        cliente.addEventListener("mouseleave", () => {
            clientes.forEach(c => c.classList.remove("dim"));
        });
    });
}


/* ================= VÍRGULA FLUTUANTE ================= */
const virgula = document.getElementById("virgula-flutuante");

if (virgula) {
    let start = null;

    const floatVirgula = (timestamp) => {
        if (!start) start = timestamp;

        const progress = timestamp - start;

        // flutuação suave (branding elegante)
        const translateY = Math.sin(progress / 900) * 22;

        virgula.style.transform = `translateY(${translateY}px)`;

        requestAnimationFrame(floatVirgula);
    };

    requestAnimationFrame(floatVirgula);
    
}
// ================= LOADING =================
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hide");
  }, 600);
});

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    const loader = document.getElementById("page-loader");

    if (!loader) return;

    if (href && !href.startsWith("#") && !href.startsWith("http")) {
      loader.classList.remove("hide");
    }
  });
});


/* ================= SERVIÇOS HOVER FOCUS ================= */

const servicos = document.querySelectorAll(".coluna-servico");

servicos.forEach(servico => {

  servico.addEventListener("mouseenter", () => {
    servicos.forEach(s => {
      if (s === servico) {
        s.classList.add("focus");
        s.classList.remove("blur");
      } else {
        s.classList.add("blur");
        s.classList.remove("focus");
      }
    });
  });

  servico.addEventListener("mouseleave", () => {
    servicos.forEach(s => {
      s.classList.remove("focus", "blur");
    });
  });

});
/* ================= MENU ÂNCORA COM LENIS ================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);

      if (target) {
        lenis.scrollTo(target);
      }
    }
  });
});

// ================= COOKIE BANNER =================

const cookieBanner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept-cookies");

if (cookieBanner && acceptBtn) {

    // Se já aceitou antes, não mostra
    if (localStorage.getItem("cookiesAccepted")) {
        cookieBanner.style.display = "none";
    } else {

        // Mostra ao descer 200px
        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                cookieBanner.classList.add("show");
            }
        });
    }

    // Ao clicar em aceitar
    acceptBtn.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.remove("show");

        setTimeout(() => {
            cookieBanner.style.display = "none";
        }, 600);
    });

}

/* ================= MENU MOBILE REAL ================= */

const menuToggle = document.getElementById("menu-toggle");
const menuMobile = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("mobile-menu-close");
const body = document.body;

if (menuToggle && menuMobile && header) {

  menuToggle.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
    menuToggle.classList.toggle("active");
    header.classList.toggle("menu-open");
    body.classList.toggle("no-scroll");
  });

  // 🔥 FECHAR NO X
  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      menuMobile.classList.remove("active");
      menuToggle.classList.remove("active");
      header.classList.remove("menu-open");
      body.classList.remove("no-scroll");
    });
  }

  // 🔥 FECHAR AO CLICAR NOS LINKS
  menuMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuMobile.classList.remove("active");
      menuToggle.classList.remove("active");
      header.classList.remove("menu-open");
      body.classList.remove("no-scroll");
    });
  });

}

// ================= CLIENTES - COLOR REVEAL MOBILE =================
if (window.innerWidth <= 900) {

  const logos = document.querySelectorAll('.cliente-logo');

  const observerClientes = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observerClientes.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.35
  });

  logos.forEach(logo => observerClientes.observe(logo));
}

// ================= RESET AUTOMÁTICO AO VOLTAR PARA DESKTOP =================
window.addEventListener("resize", function () {
  if (window.innerWidth > 900) {

    if (menuMobile) menuMobile.classList.remove("active");
    if (menuToggle) menuToggle.classList.remove("active");
    if (header) header.classList.remove("menu-open");
    document.body.classList.remove("no-scroll");

  }
});

/* ================= FORMULÁRIO CONTATO (N8N) ================= */

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = form.querySelector('[name="nome"]').value;
    const email = form.querySelector('[name="email"]').value;
    const mensagem = form.querySelector('[name="mensagem"]').value;

    try {
      await fetch("https://crysleite.app.n8n.cloud/webhook/form-contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          mensagem,
          origem: window.location.pathname
        })
      });

      alert("Mensagem enviada 🚀");
      form.reset();

    } catch (error) {
      alert("Erro ao enviar. Tente novamente.");
      console.error(error);
    }
  });
});

/* ================= CHATBOT ================= */

// Alternar abertura do chat
function toggleChat() {
  const chat = document.getElementById("chat");
  const chatToggle = document.getElementById("chatToggle");

  if (chat.style.display === "flex") {
    chat.style.display = "none";
    chatToggle.style.display = "flex"; // Mostra o avatar novamente
  } else {
    chat.style.display = "flex";
    chatToggle.style.display = "none"; // Esconde o avatar para não ficar por cima
  }
}

// Fechar o chat pelo botão superior (traço)
function toggleMinimize() {
  const chat = document.getElementById("chat");
  const chatToggle = document.getElementById("chatToggle");
  const hero = document.getElementById("hero");
  
  chat.style.display = "none"; // Esconde o chat
  
  // Só traz o avatar de volta se o usuário já tiver rolado para baixo da Hero
  if (hero && window.scrollY > hero.offsetHeight - 100) {
    chatToggle.style.display = "flex"; 
  }
}

// Enviar mensagem digitada
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  sendToN8N(text); // 👈 aqui
}

// NOVA FUNÇÃO: Permite enviar a mensagem apertando a tecla Enter
function enviarComEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita que a página recarregue
    sendMessage(); // Chama a função de enviar a mensagem
  }
}

// Botões rápidos
function sendQuick(text) {
  addMessage(text, "user");
  sendToN8N(text); // 👈 aqui
}

// Adicionar mensagem no chat
function addMessage(text, type) {
  const chatBody = document.getElementById("chatBody");

  const msg = document.createElement("div");
  msg.classList.add("message", type);
  
  if (type === "bot") {
  msg.innerHTML = text;
} else {
  msg.textContent = text;
}

  chatBody.appendChild(msg);

  // Scroll automático
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ================= MOSTRAR BOTÃO APÓS HERO ================= */
window.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chatToggle");
  const hero = document.getElementById("hero");
  const chat = document.getElementById("chat"); // Referência do chat

  if (!chatToggle || !hero) return;

  // Começa escondido
  chatToggle.style.display = "none";

  window.addEventListener("scroll", () => {
    const heroHeight = hero.offsetHeight;

    // Só mostra o botão do avatar se passar da Hero E o chat estiver fechado
    if (window.scrollY > heroHeight - 100 && chat.style.display !== "flex") {
      chatToggle.style.display = "flex";
    } else {
      chatToggle.style.display = "none";
    }
  });
});

/* ================= MENU DE OPÇÕES (TRÊS PONTINHOS) ================= */

// Abre e fecha o menu
function toggleMenu() {
  const menu = document.getElementById("chatMenu");
  menu.classList.toggle("show");
}

// Fechar o menu automaticamente se o usuário clicar fora dele
document.addEventListener("click", function(event) {
  const menu = document.getElementById("chatMenu");
  const actions = document.querySelector(".chat-header-actions");
  
  // Se o menu estiver aberto e o clique não foi nos três pontinhos...
  if (menu && menu.classList.contains("show") && !actions.contains(event.target)) {
    menu.classList.remove("show");
  }
});

// Ação de clicar no botão "Início"
function restartChat() {
  // 1. Esconde o menu
  document.getElementById("chatMenu").classList.remove("show");
  
  // 2. Manda a mensagem "Início" como se fosse o usuário
  addMessage("Início", "user");
  
  // 3. O Bot responde com a mensagem principal e os botões
  setTimeout(() => {
    // Adiciona o texto de boas-vindas
    const msgInicial = `Olá! Eu sou o <strong>Virgulinha</strong>, assistente da <strong>Agência Vírgula.</strong> 👋<br><br>Estou aqui para te informar sobre dúvidas, serviços e muito mais!<br><br>Como posso te ajudar hoje? 😊`;
    addMessage(msgInicial, "bot");

    // 4. Recria e adiciona os botões amarelos de atalho
    const chatBody = document.getElementById("chatBody");
    const botoesDiv = document.createElement("div");
    botoesDiv.classList.add("quick-actions");
    botoesDiv.innerHTML = `
      <button onclick="sendQuick('Serviços')">Serviços</button>
      <button onclick="sendQuick('Orçamento')">Orçamento</button>
      <button onclick="sendQuick('Contato')">Contato</button>
    `;
    
    chatBody.appendChild(botoesDiv);
    
    // Desce o scroll para garantir que os botões apareçam na tela
    chatBody.scrollTop = chatBody.scrollHeight; 

  }, 600);
}

let loadingMsg = null;

function showLoading() {
  loadingMsg = document.createElement("div");
  loadingMsg.classList.add("message", "bot");
  loadingMsg.innerHTML = "Digitando...";
  
  document.getElementById("chatBody").appendChild(loadingMsg);
}

function removeLoading() {
  if (loadingMsg) {
    loadingMsg.remove();
    loadingMsg = null;
  }
}

/* ================= CHATBOT - N8N ================= */

async function sendToN8N(message) {
  showLoading();

  const startTime = Date.now();

  try {
    const response = await fetch("https://primary-production-714c.up.railway.app/webhook/2489e605-0735-4d60-bf0e-f94860d689a5/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: localStorage.getItem("chatUserId") || createUserId()
      })
    });

    const raw = await response.text();
    console.log("RESPOSTA BRUTA:", raw);

    if (!response.ok) {
      throw new Error(`N8N HTTP ${response.status}: ${raw}`);
    }

    let data = null;
    try {
      data = JSON.parse(raw);
    } catch (_) {
      data = null;
    }

    const textFromData =
      (data && typeof data === "object" && (data.reply || data.message || data.text || data.output)) || null;

    const botMessageRaw = typeof textFromData === "string" ? textFromData : raw;
    const botMessage = /<\/?[a-z][\s\S]*>/i.test(botMessageRaw)
      ? botMessageRaw
      : botMessageRaw.replace(/\n/g, "<br>");

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    removeLoading();
    addMessage(botMessage, "bot");

  } catch (error) {
    console.error(error);
    removeLoading();
    addMessage("Erro ao conectar com o assistente 😢", "bot");
  }

  function createUserId() {
    const id = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("chatUserId", id);
    return id;
  }

}
