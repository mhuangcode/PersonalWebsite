/// <reference lib="webworker" />

addEventListener("message", ({ data }) => {
  const { verts, now } = data;

  const scalar = [];
  verts.forEach(() => {
    scalar.push({
      x: Math.cos(now * 0.00205),
      y: Math.sin(now * 0.00033),
      z: Math.sin(now * 0.00018)
    });
  });

  postMessage(scalar);
});
