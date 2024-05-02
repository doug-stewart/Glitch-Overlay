import { LoremIpsum } from 'lorem-ipsum';
import { useEffect, useMemo, useRef, useState } from 'react';

import './App.css';

function getPixelURL() {
  const screenshot = document.documentElement.cloneNode(true);

  screenshot.style.pointerEvents = 'none';
  screenshot.style.overflow = 'hidden';
  screenshot.style.userSelect = 'none';
  screenshot.dataset.scrollX = window.scrollX;
  screenshot.dataset.scrollY = window.scrollY;

  const blob = new Blob([screenshot.outerHTML], {
    type: 'image/blob',
  });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);

  // const url = URL.createObjectURL(blob);

  return imageUrl;
}

export default function App() {
  const canvas = useRef(null);
  const main = useRef(null);
  const painting = useRef(false);
  const [pixels, setPixels] = useState('');

  const paragraphs = useMemo(() => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });

    const text = [...Array(100)].map(() => {
      const count = Math.round(Math.random() * (12 - 4) + 1) || 5;
      return lorem.generateSentences(count);
    });

    return text;
  }, []);

  useEffect(() => {
    const url = getPixelURL();
    setTimeout(() => {
      setPixels(url);
    }, 5000);

    // const tick = setInterval(() => {
    //   painting.current = true;
    //   console.log('painting... A');

    //   const context = canvas.current.getContext('2d');
    //   const pixels = getPixels(main.current);
    //   const image = new Image();

    //   image.onload = () => {
    //     console.log('painting... C');
    //     // context.drawImage(image, 0, 0);
    //     // requestAnimationFrame(paint);
    //     // ctx.filter = `invert(50%)`;
    //     image.remove();
    //   };

    //   console.log('painting... B');
    //   image.src = pixels;
    // }, 1000);

    // const paint = () => {
    //   painting.current = true;
    //   console.log('painting... A');

    //   const context = canvas.current.getContext('2d');
    //   const pixels = getPixels(main.current);
    //   const image = new Image();

    //   image.onload = () => {
    //     console.log('painting... C');
    //     // context.drawImage(image, 0, 0);
    //     // requestAnimationFrame(paint);
    //     // ctx.filter = `invert(50%)`;
    //     image.remove();
    //   };

    //   console.log(pixels);

    //   console.log('painting... B');
    //   image.src = pixels;
    // };

    // if (!painting.current) requestAnimationFrame(paint);
    // return () => clearInterval(tick);
  }, []);

  return (
    <>
      <main ref={main}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </main>
      <img src={pixels} alt="" />
    </>
  );
}
