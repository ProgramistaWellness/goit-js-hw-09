const form = document.querySelector('.form');

const handleForm = event => {
  event.preventDefault();
  const firstDelay = parseInt(form.elements.delay.value, 10);
  const stepDelay = parseInt(form.elements.step.value, 10);
  const amount = parseInt(form.elements.amount.value, 10);
  setTimeout(() => {
    for (let i = 1; i <= amount; i++) {
      createPromise(i, stepDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, firstDelay);
};

form.addEventListener('submit', handleForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay }); // Fulfill
    } else {
      reject({ position, delay }); // Reject
    }
  });
}
