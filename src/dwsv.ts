import { gsap } from 'gsap';

const partsHighermind = [
  {
    p1: 'your higher mind',
    p2: 'sit unbothered with your mind and shadow'
  },
  {
    p1: 'your Buddha nature',
    p2: 'practice non-attachment to what appears in your mind'
  },
  {
    p1: 'universal intelligence',
    p2: 'hold truth'
  },
  {
    p1: 'infinite potential',
    p2: 'unconditionally love yourself as you are'
  },
  {
    p1: 'the quantum field',
    p2: 'collapse thought into potentiality'
  },
  {
    p1: 'the zero point field',
    p2: 'harmonize your mind’s energy fluctuations to the quantum vacuum state'
  },
  {
    p1: 'HIGHER states of CONSCIOUSNESS',
    p2: 'GO WITHIN'
  },
  {
    p1: 'cosmic intelligence',
    p2: 'shed your limiting belief systems'
  }
];

const parts = [
  {
    p1: 'spiritual beings',
    p2: ' human experience'
  },
  {
    p1: 'energy beings',
    p2: ' human experience'
  },
  {
    p1: 'quantum beings',
    p2: ' linear experience'
  },
  {
    p1: 'multi-dimensional beings',
    p2: ' 3rd dimensional experience'
  },
  {
    p1: 'high vibrational beings',
    p2: ' high density experience'
  },
  {
    p1: 'cosmic beings',
    p2: ' human experience'
  },
  {
    p1: 'mental beings',
    p2: 'n experience of living our own mind'
  },
  {
    p1: 'light beings',
    p2: 'n experience of alchemizing shadows'
  },
  {
    p1: 'oneness',
    p2: 'n experience of separation'
  },
  {
    p1: 'unified consciousness',
    p2: 'n experience of polarity'
  }
];

let p1, p2;
let tweenP1 = { i: 0 };
let tweenP2 = { i: 0 };

// Track remaining elements to ensure all are used before repeating
let remainingPartsP1 = [...parts];
let remainingPartsP2 = [...parts];

document.addEventListener('DOMContentLoaded', () => {
  p1 = document.querySelector('span.quote-p1');
  p2 = document.querySelector('span.quote-p2');

  pickPart1();
  pickPart2();

  setInterval(runTweenP1, 4000);
  setTimeout(() => {
    setInterval(runTweenP2, 4000);
    console.log('film!');
  }, 2000);
});

const pickUniquePart = (remainingParts, previousPart) => {
  if (remainingParts.length === 0) {
    remainingParts = [...parts]; // Reset the pool if all parts have been used
  }

  let newIndex;
  let selectedPart;

  // Ensure the new selection is not the same as the previous one
  do {
    newIndex = Math.floor(Math.random() * remainingParts.length);
    selectedPart = remainingParts[newIndex];
  } while (selectedPart === previousPart);

  // Remove selected part from remaining parts to ensure it isn't picked again
  remainingParts.splice(newIndex, 1);

  return { remainingParts, selectedPart };
};

let previousPartP1 = null;
let previousPartP2 = null;

const pickPart1 = () => {
  const result = pickUniquePart(remainingPartsP1, previousPartP1);
  remainingPartsP1 = result.remainingParts;
  previousPartP1 = result.selectedPart;
  p1.innerHTML = previousPartP1.p1;
};

const pickPart2 = () => {
  const result = pickUniquePart(remainingPartsP2, previousPartP2);
  remainingPartsP2 = result.remainingParts;
  previousPartP2 = result.selectedPart;
  p2.innerHTML = previousPartP2.p2;
};

const runTweenP1 = () => {
  tweenP1 = { i: 0 };
  gsap.to(tweenP1, {
    i: parts.length,
    duration: 0.3,
    ease: 'power1.out',
    onUpdate: () => {
      // Show a random part from the list to simulate visual cycling, excluding the previous part to avoid repetition
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * parts.length);
      } while (parts[randomIndex] === previousPartP1);
      p1.innerHTML = parts[randomIndex].p1;
    },
    onComplete: pickPart1
  });
};

const runTweenP2 = () => {
  tweenP2 = { i: 0 };
  gsap.to(tweenP2, {
    i: parts.length,
    duration: 0.3,
    ease: 'power1.out',
    onUpdate: () => {
      // Show a random part from the list to simulate visual cycling, excluding the previous part to avoid repetition
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * parts.length);
      } while (parts[randomIndex] === previousPartP2);
      p2.innerHTML = parts[randomIndex].p2;
    },
    onComplete: pickPart2
  });
};
