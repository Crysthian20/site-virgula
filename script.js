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

