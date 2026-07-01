function showSidebar() {
  document.querySelector(".sidebar").style.display = "flex";
}

function hideSidebar() {
  document.querySelector(".sidebar").style.display = "none";
}

let interval;

function initSlider() {

    const slides = document.querySelectorAll(".slide");

    if (!slides || slides.length === 0) {
        return;
    }

    const descriptions = [
        `
        <div class="slider-texto">
            <p class="subtitulo-slide"> Salud Ocupacional </p>
            <h2 class="titulo-slide"> Medicina Laboral Estratégica </h2>
            <p class="texto-slide"> Gestión integral de salud ocupacional, cumplimiento normativo y socio estratégico en Recursos Humanos </p>
        </div>
        `,
        `
        <div class="slider-texto">
            <p class="subtitulo-slide"> RRHH data-driven </p>
            <h2 class="titulo-slide"> Gestión de Recursos Humanos </h2>
            <p class="texto-slide"> Optimización de procesos y toma de decisiones basada en datos para potenciar el capital humano </p>
        </div>
        `,
        `
        <div class="slider-texto">
            <p class="subtitulo-slide"> Compliance Normativo </p>
            <h2 class="titulo-slide"> Asesoramiento Legal y Normativo </h2>
            <p class="texto-slide"> El modelo de servicio acompaña a la empresa en el desarrollo de una cultura preventiva, mediante procesos documentados, medibles y orientados a la mejora continua </p>
        </div>
        `
    ];

    const indicators = document.getElementById("indicators");

    if (!indicators || !document.getElementById("slide-description")) {
        return;
    }

    let currentIndex = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("indicator");
        if (i === 0) dot.classList.add("active");
        indicators.appendChild(dot);
    });

    const dots = document.querySelectorAll(".indicator");

    showSlide(currentIndex);

    function showSlide(index) {
        slides.forEach((slide, i) => {
        slide.classList.remove("active");
        dots[i].classList.remove("active");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        const desc = document.getElementById("slide-description");

        desc.classList.add("fade-out");

        setTimeout(() => {
        desc.innerHTML = descriptions[index];

        desc.classList.remove("fade-out");
        }, 250);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
}

function validarFormulario() {

    const form = document.querySelector("form");
    if (!form) return;

    if (window.emailjs) {
        emailjs.init("A5udlSZnosN_wB9bU");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const campos = document.querySelectorAll(".campo-obligatorio");
        let valido = true;

        campos.forEach((campo) => {
            const aviso = campo.parentElement.querySelector(".aviso");

            if (campo.value.trim() === "") {
                if (aviso) aviso.style.display = "block";
                valido = false;
            } else {
                if (aviso) aviso.style.display = "none";
            }
        });

        if (!valido) return;

        if (!window.emailjs) return;   

        emailjs.send("service_kxf539n", "template_t6iv94j", {
            nombre: document.querySelector("[name='nombre']").value,
            email: document.querySelector("[name='email']").value,
            empresa: document.querySelector("[name='empresa']").value,
            telefono: document.querySelector("[name='telefono']").value,
            asunto: document.querySelector("[name='asunto']").value,
            mensaje: document.querySelector("[name='mensaje']").value
        })
        .then((response) => {

            console.log("EMAILJS OK:", response);

            showToast("Mensaje enviado correctamente");
            form.reset();

        })
        .catch((error) => {

            console.error("EMAILJS ERROR:", error);

            showToast("Error al enviar el mensaje", "error");

        });
    });
}

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.remove("error");

    if (type === "error") {
        toast.classList.add("error");
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  validarFormulario();
});