import { useEffect, useMemo, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import img20260705WA0016 from "/images/IMG-20260705-WA0014.jpg";
import {
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaPause,
  FaPlay,
  FaQuoteLeft,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { birthday } from "./pages/birthday";
import { photos } from "./pages/photos";

import { messages } from "./pages/messages";
import "./App.css";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function useCountdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const target = new Date(birthday.date);
  const currentYearTarget = new Date(
    now.getFullYear(),
    target.getMonth(),
    target.getDate(),
  );
  const nextTarget =
    currentYearTarget > now
      ? currentYearTarget
      : new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
  const isBirthday =
    now.getMonth() === target.getMonth() && now.getDate() === target.getDate();
  const diff = isBirthday ? 0 : Math.max(0, nextTarget - now);
  return { isBirthday, diff, isPast: now > target && !isBirthday };
}

function Countdown({ diff }) {
  const values = [
    Math.floor(diff / 86400000),
    Math.floor((diff / 3600000) % 24),
    Math.floor((diff / 60000) % 60),
    Math.floor((diff / 1000) % 60),
  ];
  return (
    <div className="countdown" aria-label="Countdown to her birthday">
      {values.map((value, index) => (
        <div className="time-unit" key={index}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{["days", "hours", "minutes", "seconds"][index]}</span>
        </div>
      ))}
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <span
          key={index}
          style={{
            "--i": index,
            "--x": `${(index * 17) % 100}%`,
            "--delay": `${(index % 7) * 1.4}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rockets = [];
    const particles = [];

    const colors = [
      "#E9A6C1",
      "#B8A1E3",
      "#FFD77D",
      "#8ECED0",
      "#F6BFD5",
      "#FFFFFF",
    ];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationId;
    let startTime = performance.now();
    let lastTime = startTime;
    let stopped = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticle = (x, y, vx, vy, color, options = {}) => {
      particles.push({
        x,
        y,
        vx,
        vy,

        color,

        life: options.life ?? 1,
        decay: options.decay ?? 0.012,

        size: options.size ?? 2,
        gravity: options.gravity ?? 0.055,

        friction: options.friction ?? 0.985,

        sparkle: options.sparkle ?? false,
        trail: [],
      });
    };

    const explode = (rocket) => {
      const type = Math.floor(Math.random() * 4);

      if (type === 0) {
        const count = 150;

        for (let i = 0; i < count; i += 1) {
          const angle = (Math.PI * 2 * i) / count;
          const speed = 2.1 + Math.random() * 4.5;

          createParticle(
            rocket.x,
            rocket.y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            rocket.color,
            {
              life: 1,
              decay: 0.008 + Math.random() * 0.008,
              size: 1.2 + Math.random() * 2.5,
              gravity: 0.055,
              sparkle: true,
            },
          );
        }
      } else if (type === 1) {
        const count = 110;

        for (let i = 0; i < count; i += 1) {
          const angle = (Math.PI * 2 * i) / count;

          const speed = 3.5 + Math.random() * 0.5;

          createParticle(
            rocket.x,
            rocket.y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            rocket.color,
            {
              life: 1.1,
              decay: 0.009,
              size: 1.5 + Math.random() * 2,
              gravity: 0.035,
              sparkle: true,
            },
          );
        }
      } else if (type === 2) {
        const points = 120;

        for (let i = 0; i < points; i += 1) {
          const t = (Math.PI * 2 * i) / points;

          const heartX = 16 * Math.pow(Math.sin(t), 3);

          const heartY = -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
          );

          const scale = 0.22;

          createParticle(
            rocket.x,
            rocket.y,
            heartX * scale,
            heartY * scale,
            rocket.color,
            {
              life: 1.2,
              decay: 0.009,
              size: 2,
              gravity: 0.025,
              sparkle: true,
            },
          );
        }
      } else {
        const arms = 12;

        for (let arm = 0; arm < arms; arm += 1) {
          const angle = (Math.PI * 2 * arm) / arms;

          for (let i = 0; i < 15; i += 1) {
            const speed = 1.2 + i * 0.25 + Math.random() * 0.5;

            createParticle(
              rocket.x,
              rocket.y,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed,
              rocket.color,
              {
                life: 1,
                decay: 0.011,
                size: 1.5 + Math.random() * 2,
                gravity: 0.05,
                sparkle: true,
              },
            );
          }
        }
      }

      for (let i = 0; i < 20; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;

        createParticle(
          rocket.x,
          rocket.y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          "#fff9f0",
          {
            life: 0.8,
            decay: 0.025,
            size: 2 + Math.random() * 2,
            gravity: 0,
            sparkle: true,
          },
        );
      }
    };

    const launch = (delay = 0, target = null) => {
      const x = window.innerWidth * (0.12 + Math.random() * 0.76);

      rockets.push({
        x,
        y: window.innerHeight + 20,

        target: target ?? window.innerHeight * (0.12 + Math.random() * 0.3),

        speed: 10 + Math.random() * 4,

        color: colors[Math.floor(Math.random() * colors.length)],

        delay,

        trail: [],
      });
    };

    const drawRocket = (rocket) => {
      rocket.trail.push({
        x: rocket.x,
        y: rocket.y,
      });

      if (rocket.trail.length > 14) {
        rocket.trail.shift();
      }

      ctx.beginPath();

      rocket.trail.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.strokeStyle = rocket.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.65;
      ctx.stroke();

      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);

      ctx.fillStyle = "#fffdf5";

      ctx.shadowBlur = 15;
      ctx.shadowColor = rocket.color;

      ctx.fill();

      ctx.shadowBlur = 0;
    };

    const drawParticle = (particle) => {
      const alpha = Math.max(0, Math.min(1, particle.life));

      if (particle.trail.length > 5) {
        particle.trail.shift();
      }

      particle.trail.push({
        x: particle.x,
        y: particle.y,
      });

      ctx.beginPath();

      particle.trail.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.strokeStyle = particle.color;
      ctx.globalAlpha = alpha * 0.45;
      ctx.lineWidth = particle.size * 0.7;
      ctx.stroke();

      ctx.globalAlpha = alpha;

      ctx.beginPath();

      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);

      ctx.fillStyle = particle.color;

      ctx.shadowBlur = particle.sparkle ? 14 : 6;
      ctx.shadowColor = particle.color;

      ctx.fill();

      if (particle.sparkle && Math.random() > 0.82) {
        ctx.globalAlpha = alpha * 0.8;

        ctx.beginPath();
        ctx.moveTo(particle.x - 4, particle.y);
        ctx.lineTo(particle.x + 4, particle.y);

        ctx.moveTo(particle.x, particle.y - 4);
        ctx.lineTo(particle.x, particle.y + 4);

        ctx.strokeStyle = "#fffdf5";
        ctx.lineWidth = 1;

        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const draw = (time) => {
      if (stopped) return;

      const delta = Math.min(32, time - lastTime);

      lastTime = time;

      const elapsed = time - startTime;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const rocket = rockets[i];

        if (rocket.delay > 0) {
          rocket.delay -= delta;
          continue;
        }

        rocket.y -= rocket.speed;

        drawRocket(rocket);

        if (rocket.y <= rocket.target) {
          explode(rocket);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx *= particle.friction;
        particle.vy *= particle.friction;

        particle.vy += particle.gravity;

        particle.life -= particle.decay;

        drawParticle(particle);

        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (!reducedMotion && elapsed > 600 && elapsed < 2200) {
        if (Math.random() < 0.035 && rockets.length < 5) {
          launch(0, window.innerHeight * (0.12 + Math.random() * 0.28));
        }
      }

      if (elapsed < 4200 && !stopped) {
        animationId = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        canvas.classList.add("fireworks-finished");
      }
    };

    const stopOnScroll = () => {
      stopped = true;

      cancelAnimationFrame(animationId);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      canvas.classList.add("fireworks-finished");
    };

    resize();

    launch(0);
    launch(220);
    launch(420);
    launch(650);

    animationId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    window.addEventListener("scroll", stopOnScroll, { passive: true });

    return () => {
      stopped = true;

      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resize);

      window.removeEventListener("scroll", stopOnScroll);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fireworks-canvas" aria-hidden="true" />
  );
}

function App() {
  const { isBirthday, diff, isPast } = useCountdown();
  const [celebrating, setCelebrating] = useState(false);
  const [wished, setWished] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [message, setMessage] = useState("");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const [typed, setTyped] = useState("");
  const letter = `My love,

I think one of the most beautiful things I’ve learned from loving you is that love doesn’t always arrive in big moments.

Sometimes, it is just us finding five minutes before the day begins. A small video call, sleepy voices, barely enough time to talk about anything important, and yet somehow those five minutes can change my whole day. I’ve learned that love lives in those little moments too — in the ordinary, the rushed, the silly, and the quiet.

I’ve also learned that an argument doesn’t mean something is broken beyond repair. It doesn’t mean it’s over. Sometimes it simply means that two people care enough to be hurt, care enough to speak, and, more importantly, care enough to come back and fix what went wrong. We may not always understand each other immediately, but I never want us to stop trying to.

And I’ve learned that love isn’t 50-50 every single day.

Some days it might be 80-20. Some days it might be 20-80. There will be days when you carry more of us, and days when I do. And that’s okay. I don’t want to keep score with you. I just want us to keep choosing each other, especially on the days when one of us needs to be carried a little more.

There are so many beautiful things in this world. Beautiful places, sunsets, views that make you stop and stare.

But somehow, no matter how stunning the view is, it never feels quite the same when you aren't there to see it with me.

Because somewhere along the way, you became the person I want beside me when something beautiful happens. The person I want to turn to and say, “Look at that.” The person who makes a moment feel complete simply by being there.

And honestly, half of our love is probably just deciding what to eat.

“What do you want?”

“I don't know, you decide.”

“No, you decide.”

And somehow we can spend an unreasonable amount of time deciding what two people are going to eat.

But I love even that.

I love the mundane parts of us. The conversations that go nowhere. The random thoughts. The little disagreements. The comfortable silences. The ridiculous decisions. Because that's where a life together actually lives.

And like Lalettan said,

“അന്ന് എന്റെ ഇടം കൈയിൽ ഒരു പെൺകുട്ടിയുടെ വലം കൈ ഉണ്ടാകും.”

That will be you.

I don't know what every year ahead of us will look like. I don't know where life will take us, what will change, or how many things we'll have to figure out along the way.

But I know I want to figure them out with you.

And I think that is one of the simplest ways I could explain what you mean to me.

Your heart, as my own, I would wrap in a blanket and let it sleep beside mine.

And like a soul inside a body, I want to lie deep inside you — close enough that there is no distance between where you end and where I begin.

I don't need every day with you to be perfect.

I just want the little moments.
The five-minute mornings.
The ridiculous food debates.
The arguments we come back from.
The days when one of us gives more.
The beautiful views we get to share.
The quiet nights.
The ordinary life.

All of it.

Because somehow, all those little things have become my favourite part of loving you.

And if I get to keep choosing you through all of them, I think I already have everything I need.

Happy birthday, my love.

Philippians 1:7

I love you.`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTyped(letter.slice(0, index));
      index += 1;
      if (index > letter.length) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [letter]);
  const activePhoto = useMemo(
    () => (lightbox === null ? null : photos[lightbox]),
    [lightbox],
  );
  const randomMessage = () =>
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  const toggleMusic = () => {
    setPlaying(!playing);
    if (!birthday.musicUrl || !audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
  };
  const makeWish = () => {
    setWished(true);
    setTimeout(() => setCelebrating(true), 550);
  };
  const moveLightbox = (step) =>
    setLightbox((lightbox + step + photos.length) % photos.length);

  return (
    <main>
      <FloatingParticles />
      <audio
        ref={audioRef}
        loop
        src={birthday.musicUrl || undefined}
        aria-label="Birthday music"
      />
      <nav className="nav">
        <a href="#top" className="brand">
          <span>♥</span>
        </a>
        <div className="nav-links">
          {/* <a href="#story">Our story</a> */}
          <a href="#gallery">Memories</a>
          <a href="#letter">A letter</a>
        </div>
        <button
          className="music-toggle"
          onClick={toggleMusic}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? <FaPause /> : <FaPlay />}
          <span>{playing ? "Playing" : "Music"}</span>
        </button>
      </nav>

      <section className="hero hero-cinematic" id="top">
        <img
          className="hero-background"
          src={img20260705WA0016}
          alt=""
          aria-hidden="true"
        />

        <div className="hero-overlay" />

        <div className="hero-content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* For you */}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {birthday.greeting}
          </motion.h1>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a className="button primary" href="#celebrate">
              Open your surprise <FaArrowDown />
            </a>

            <button className="button ghost" onClick={randomMessage}>
              <FaHeart /> A little note
            </button>
          </motion.div>
        </div>

        <div className="scroll-cue">
          <span>Scroll to wander</span>
          <FaArrowDown />
        </div>
      </section>

      <section className="countdown-section" id="celebrate">
        <div className="section-kicker">
          {isBirthday
            ? "The big day"
            : isPast
              ? "The next chapter"
              : "The big day is coming"}
        </div>
        {isBirthday ? (
          <div className="today-banner">
            <FaStar /> Today is your day, {birthday.name}.
          </div>
        ) : (
          <>
            <h2>
              {isPast ? (
                <>
                  Counting down to the next <em>you</em>
                </>
              ) : (
                <>
                  Counting down to <em>you</em>
                </>
              )}
            </h2>
            <p className="section-intro">
              {isPast
                ? "Another year, another reason to celebrate everything you are."
                : `Until ${birthday.shortDate}, when the world gets a little brighter.`}
            </p>
            <Countdown diff={diff} />
          </>
        )}
        <div className="cake-stage">
          <div className={`cake ${wished ? "blown" : ""}`}>
            <div className="cake-candle candle-one">
              <span />
            </div>
            <div className="cake-candle candle-two">
              <span />
            </div>
            <div className="cake-top" />
            <div className="cake-body">
              <i />
              <i />
              <i />
            </div>
            <div className="cake-plate" />
          </div>
          {!wished ? (
            <button className="wish-button" onClick={makeWish}>
              <FaStar /> Make a wish
            </button>
          ) : (
            <p className="wish-complete">Your wish is on its way ✦</p>
          )}
          <AnimatePresence>
            {celebrating && (
              <>
                <Fireworks />
                <motion.div
                  className="celebration-message"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>✦</span>
                  <p>{birthday.message}</p>
                  <strong>Happy birthday, my love.</strong>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="intro-band">
        <motion.div
          className="quote-mark"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FaQuoteLeft />
        </motion.div>
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          “The moon wishes it had your glow. The stars wish they had your light.
          And i just wish you could see yourself through my eyes.”
        </motion.p>
        <span>— with all my heart</span>
      </section>
      <section className="content-section gallery-section" id="gallery">
        <div className="section-heading">
          <div>
            <div className="section-kicker">The photo albums</div>
            <h2>
              Little moments, <em>kept</em>
            </h2>
          </div>
          <p>Tap any photograph to step inside it.</p>
        </div>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <motion.button
              className="photo-tile"
              key={photo.src}
              onClick={() => setLightbox(index)}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img loading="lazy" src={photo.src} alt={photo.alt} />
              <span>
                <small>{photo.date}</small>
                {photo.caption}
              </span>
            </motion.button>
          ))}
        </div>
      </section>
      <section className="letter-section" id="letter">
        <div className="letter-decoration">with love</div>
        <div className="letter-paper">
          <div className="section-kicker">A letter for you</div>
          <h2>Read this when you need to remember.</h2>
          <p className="letter-body">
            {typed}
            <span className="typing-cursor">|</span>
          </p>
          <div className="letter-signature">
            {birthday.from} <FaHeart />
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          for <i>{birthday.name}</i>
          <span>♥</span>
        </div>
        <p>Made with an unreasonable amount of love.</p>
        <small>{birthday.shortDate} · forever and always</small>
      </footer>

      <button
        className="floating-heart"
        onClick={randomMessage}
        aria-label="Show a random love note"
      >
        <FaHeart />
      </button>
      <AnimatePresence>
        {message && (
          <motion.div
            className="note-popover"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button onClick={() => setMessage("")} aria-label="Close note">
              <FaTimes />
            </button>
            <FaHeart />
            <p>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close photo"
            >
              <FaTimes />
            </button>
            <button
              className="lightbox-nav prev"
              onClick={(event) => {
                event.stopPropagation();
                moveLightbox(-1);
              }}
              aria-label="Previous photo"
            >
              <FaChevronLeft />
            </button>
            <figure onClick={(event) => event.stopPropagation()}>
              <img src={activePhoto.src} alt={activePhoto.alt} />
              <figcaption>
                <small>{activePhoto.date}</small>
                {activePhoto.caption}
              </figcaption>
            </figure>
            <button
              className="lightbox-nav next"
              onClick={(event) => {
                event.stopPropagation();
                moveLightbox(1);
              }}
              aria-label="Next photo"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
