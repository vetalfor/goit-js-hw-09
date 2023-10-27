import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const delay = parseInt(form.querySelector('[name="delay"]').value);
    const step = parseInt(form.querySelector('[name="step"]').value);
    const amount = parseInt(form.querySelector('[name="amount"]').value);

    for (let i = 1; i <= amount; i++) {
       const currentDelay = delay + i * step;
      createPromise(i + 1, currentDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        });
    }
  });
});