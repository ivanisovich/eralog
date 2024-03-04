const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 80,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
  breakpoints: {
    1250: {
      slidesPerView: 3,
    },
    728: {
      slidesPerView: 2,
    },
  },
});

if (window.matchMedia("(max-width: 768px)").matches) {
  document.querySelector("#map").src = src =
    "https://yandex.ru/map-widget/v1/?from=mapframe&ll=37.4457952%2C55.596948&mode=usermaps&source=mapframe&um=constructor%3A80892c59f50c4753d287dc653737e845413e3eeb0f9756be92d088989ca7f21d&utm_source=mapframe&z=13&scroll=false";
}

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  document
    .querySelectorAll(
      ".hero__title span, .hero__subtitle, .hero .button, .clients-list img, .our-clients span, .feature, .service, .swiper-slide, .expertise__truck"
    )
    .forEach((el) => {
      observer.observe(el);
    });
});

const counters = document.querySelectorAll(".counter");
let hasStarted = false; // Флаг для запуска анимации один раз

const easeInOutQuint = (t, b, c, d) => {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
};

const startCounters = () => {
  counters.forEach((counter, index) => {
    const target = +counter.getAttribute("data-target");
    const duration = 3000;
    let start = null;
    const delay = index * 200;

    const updateCounter = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start - delay;

      if (progress > 0 && progress < duration) {
        const current = easeInOutQuint(progress, 0, target, duration);
        counter.innerText = Math.min(Math.round(current), target) + "+";
      }

      if (progress < duration) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target + "+";
      }
    };

    requestAnimationFrame(updateCounter);
  });
};

const checkPosition = () => {
  const countersPosition = document
    .querySelector(".counter")
    .getBoundingClientRect();
  const screenPosition = window.innerHeight;

  if (!hasStarted && countersPosition.top < screenPosition) {
    startCounters();
    hasStarted = true; // Предотвращаем повторный запуск анимации
  }
};

window.addEventListener("scroll", checkPosition);

function loadIframeWhenVisible() {
    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
      const rect = iframe.getBoundingClientRect();
      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

      if (rect.top <= windowHeight) {
        const src = iframe.getAttribute('data-src');
        iframe.setAttribute('src', src);
        iframe.removeAttribute('data-src'); // Удалить атрибут data-src после загрузки
      }
    });
  }

  // Добавить слушатель события прокрутки
  window.addEventListener('scroll', loadIframeWhenVisible);
  // Проверить видимость iframe при загрузке страницы
  window.addEventListener('load', loadIframeWhenVisible);