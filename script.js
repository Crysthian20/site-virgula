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
      await fetch("https://primary-production-714c.up.railway.app/webhook/form-contato", {
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
    chatToggle.style.display = "flex";
  } else {
    chat.style.display = "flex";
    chatToggle.style.display = "none";
  }
}

// Fechar o chat
function toggleMinimize() {
  const chat = document.getElementById("chat");
  const chatToggle = document.getElementById("chatToggle");
  const hero = document.getElementById("hero");
  
  chat.style.display = "none";
  
  if (hero && window.scrollY > hero.offsetHeight - 100) {
    chatToggle.style.display = "flex"; 
  }
}

// ================= MOOVEON FLOW =================
let mooveonFlow = {
  ativo: false,
  step: null,
  nome: null
};

// ================= INPUT LABEL =================

function setInputMode(label, placeholder = "") {
  const inputLabel = document.getElementById("inputLabel");
  const input = document.getElementById("userInput");

  inputLabel.style.display = "block";
  inputLabel.innerHTML = label;

  input.value = ""; // limpa espaços/textos antigos
  input.placeholder = placeholder;

  input.focus(); // já deixa pronto pra digitar
}

function resetInputMode() {
  const inputLabel = document.getElementById("inputLabel");
  const input = document.getElementById("userInput");

  inputLabel.style.display = "none";
  inputLabel.innerHTML = "";

  input.placeholder = "Digite uma mensagem...";
}


// Enviar mensagem digitada
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // ================= MOOVEON INTERCEPT =================
  if (mooveonFlow.ativo) {

    if (text.toLowerCase() === "sair") {
      mooveonFlow.ativo = false;
      mooveonFlow.step = null;
      mooveonFlow.nome = null;

      addMessage("Você saiu da experiência do MooveOn 🙂", "bot");
      resetInputMode();
      return;
    }

    if (mooveonFlow.step === "nome") {
      mooveonFlow.nome = text;
      mooveonFlow.step = "email";
      setInputMode("📧 E-mail:", "Digite seu melhor e-mail...");

      addMessage(`Boa, ${text}! 😄<br><br>Agora me manda seu melhor e-mail pra eu liberar seu giro! 🔥`, "bot");
      return;
    }

    if (mooveonFlow.step === "email") {

      if (!text.includes("@")) {
        addMessage("Hmm... isso não parece um e-mail válido 🤔<br>Tenta novamente:", "bot");
        return;
      }

      // ENVIO PARA N8N (EVENTO)
      fetch("https://primary-production-714c.up.railway.app/webhook/chat-mooveon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: mooveonFlow.nome,
          email: text,
          origem: "mooveon2026",
          sessionId: sessionId
        })
      });

      addMessage(`Perfeito! Seu giro na <strong>Roleta da Vírgula</strong> já está liberado. 🎉<br><br>
      Agora é só ir até o nosso stand e testar a sorte! <br><br>
      Obrigado por participar! 😊`, "bot");

      mooveonFlow.ativo = false;
      mooveonFlow.step = null;
      mooveonFlow.nome = null;

      resetInputMode();

      return;
    }
  }

  // ================= FLUXO NORMAL (IA) =================
  sendToN8N(text);
}

// Enter para enviar
function enviarComEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

// Botões rápidos
function sendQuick(text) {
  addMessage(text, "user");

  // ================= ATIVAR MOOVEON =================
  if (text.toLowerCase().includes("mooveon")) {                       
    mooveonFlow.ativo = true;
    mooveonFlow.step = "nome";
    mooveonFlow.nome = null;

    addMessage(`Opa! Você chegou pelo <strong>MooveOn</strong>! 🚀<br><br>
    E isso significa uma coisa: seu giro na <strong>roleta da Vírgula</strong> tá quase liberado. 👀<br><br>Mas antes, preciso de duas coisinhas rapidinho.<br><br>
    Qual é o seu nome?`, "bot");

   setInputMode("👤 Nome:", "Digite seu nome...");

    return;
  }

  sendToN8N(text);
}

// Adicionar mensagem
function addMessage(text, type) {
  const chatBody = document.getElementById("chatBody");

  const msg = document.createElement("div");
  msg.classList.add("message", type);

  if (type === "bot") {

    // limpa espaços e identações do template string
    const cleanText = text
      .replace(/\n\s+/g, "\n")
      .trim();

    msg.innerHTML = cleanText;

  } else {
    msg.textContent = text;
  }

  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ================= SCROLL ================= */
window.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chatToggle");
  const hero = document.getElementById("hero");
  const chat = document.getElementById("chat");

  if (!chatToggle || !hero) return;

  chatToggle.style.display = "none";

  window.addEventListener("scroll", () => {
    const heroHeight = hero.offsetHeight;

    if (window.scrollY > heroHeight - 100 && chat.style.display !== "flex") {
      chatToggle.style.display = "flex";
    } else {
      chatToggle.style.display = "none";
    }
  });
});

/* ================= MENU ================= */

function toggleMenu() {
  const menu = document.getElementById("chatMenu");
  menu.classList.toggle("show");
}

document.addEventListener("click", function(event) {
  const menu = document.getElementById("chatMenu");
  const actions = document.querySelector(".chat-header-actions");
  
  if (menu && menu.classList.contains("show") && !actions.contains(event.target)) {
    menu.classList.remove("show");
  }
});

// Reset chat
function restartChat() {
  document.getElementById("chatMenu").classList.remove("show");

  // resetar fluxo MooveOn também
  mooveonFlow.ativo = false;
  mooveonFlow.step = null;
  mooveonFlow.nome = null;
  resetInputMode();

  addMessage("Início", "user");
  
  setTimeout(() => {
    const msgInicial = `Olá! Eu sou o <strong>Virgulinha</strong>, assistente da <strong>Agência Vírgula.</strong> 👋<br><br>Estou aqui para te informar sobre dúvidas, serviços e muito mais!<br><br>Como posso te ajudar hoje? 😊`;
    addMessage(msgInicial, "bot");

    const chatBody = document.getElementById("chatBody");
    const botoesDiv = document.createElement("div");
    botoesDiv.classList.add("quick-actions");
    botoesDiv.innerHTML = `
      <button onclick="sendQuick('MooveOn - 2026')">MooveOn - 2026</button>
      <button onclick="sendQuick('Serviços')">Serviços</button>
      <button onclick="sendQuick('Orçamento')">Orçamento</button>
      <button onclick="sendQuick('Contato')">Contato</button>
    `;
    
    chatBody.appendChild(botoesDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

  }, 600);
}

// Loading
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

// Session
let sessionId = localStorage.getItem("chatUserId");

if (!sessionId) {
  sessionId = "user_" + Math.random().toString(36).substring(2, 12);
  localStorage.setItem("chatUserId", sessionId);
}

/* ================= N8N IA ================= */

async function sendToN8N(message) {
  showLoading();

  try {
    const response = await fetch("https://primary-production-714c.up.railway.app/webhook/chat-virgulinha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId
      })
    });

    const raw = await response.text();

    let data = null;
    try {
      data = JSON.parse(raw);
    } catch (_) {}

    const rawMessage = data?.reply || raw;

const botMessage = rawMessage.includes("<br>")
  ? rawMessage
  : rawMessage.replace(/\n/g, "<br>");

    removeLoading();
    addMessage(botMessage, "bot");

  } catch (error) {
    removeLoading();
    addMessage("Erro ao conectar 😢", "bot");
  }
}