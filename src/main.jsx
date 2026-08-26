import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, Instagram, MapPin, Menu, X, Footprints, Star, Clock,
  MessageCircle, ExternalLink, Phone, ShoppingBag, Zap, Sun, Waves,
  ZoomIn, Award, Sparkles,
} from 'lucide-react';
import './styles.css';

const PHONE = '7993103192';
const PHONE_INTL = '917993103192';
const IG_HANDLE = 'chappalhouse_atmakur';
const IG_URL = `https://www.instagram.com/${IG_HANDLE}/`;
const MAPS_QUERY = 'Chappal House, Bypass Road, Atmakur, Andhra Pradesh 524322';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
const WA_BASE = `https://wa.me/${PHONE_INTL}`;
const waLink = (text) => `${WA_BASE}?text=${encodeURIComponent(text)}`;

const ESTD_YEAR = 2006;
const YEARS = new Date().getFullYear() - ESTD_YEAR;

const CATEGORIES = [
  { icon: Zap, img: 'category-sports-shoes.webp', name: 'Sports Shoes', desc: 'Performance trainers for running, gym & everyday movement' },
  { icon: Footprints, img: 'category-casual-sneakers.webp', name: 'Casual Sneakers', desc: 'Everyday sneakers styled for comfort and looks' },
  { icon: Waves, img: 'category-sliders-slides.png', name: 'Sliders & Slides', desc: 'Easy slip-on comfort for home, gym and outdoors' },
  { icon: Sun, img: 'category-sandals.png', name: 'Sandals', desc: 'Breathable, durable sandals built for daily wear' },
  { icon: ShoppingBag, img: 'category-crocs.png', name: 'Crocs', desc: 'Lightweight clogs in the latest colourways' },
];

const PRODUCTS = [
  { img: 'product-nike-red.png', name: 'Air Zoom Runner', brand: 'Nike', cat: 'Sports Shoes', tag: 'Popular Pick' },
  { img: 'product-puma-slides.png', name: 'Imported Slides Series', brand: 'Puma', cat: 'Sliders & Slides', tag: 'New Arrival' },
  { img: 'product-skechers-slides.png', name: 'Slide Collection', brand: 'Skechers', cat: 'Sliders & Slides', tag: 'New Arrival' },
  { img: 'product-debon-sandals.png', name: 'Comfort Sandals', brand: 'Debon', cat: 'Sandals', tag: 'Everyday Comfort' },
];

const BRANDS = ['Puma', 'Nike', 'Skechers', 'Crocs', 'Debon'];

const NAV = [
  ['home', 'Home'],
  ['categories', 'Categories'],
  ['products', 'Products'],
  ['experience', 'About'],
  ['visit', 'Visit Us'],
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' in' : ''}${className ? ' ' + className : ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Img({ src, alt, className = '', fallbackIcon: FallbackIcon = Footprints }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className={`img-fallback ${className}`}>
        <FallbackIcon />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setBroken(true)} loading="lazy" />;
}

function Counter({ to, suffix = '', trigger }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const dur = 1200;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, to]);
  return <>{n}{suffix}</>;
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [statsRef, statsVisible] = useReveal();

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
  }, [lightbox]);

  return (
    <>
      <div className="top">
        ESTD {ESTD_YEAR} &nbsp;✦&nbsp; BYPASS ROAD, ATMAKUR &nbsp;✦&nbsp; CALL {PHONE}
      </div>

      <header>
        <button className="brand" onClick={() => go('home')}>
          <Img src="/assets/logo.png" alt="Chappal House logo" className="logo-img" fallbackIcon={Footprints} />
          <span>
            CHAPPAL <strong>HOUSE</strong>
            <small>ATMAKUR • SINCE {ESTD_YEAR}</small>
          </span>
        </button>
        <nav className={navOpen ? 'open' : ''}>
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
          <a href={IG_URL} target="_blank" rel="noreferrer">Instagram <Instagram size={15} /></a>
        </nav>
        <button className="menu" onClick={() => setNavOpen(!navOpen)}>{navOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section id="home" className="hero">
          <Img src="/assets/hero.png" alt="Chappal House store sign in Atmakur" className="hero-bg" fallbackIcon={Footprints} />
          <div className="hero-overlay" />
          <Reveal className="hero-content">
            <p className="eyebrow">CHAPPAL HOUSE • ATMAKUR</p>
            <h1>Premium footwear<br /><i>for every step.</i></h1>
            <p className="lead">
              Shoes, sandals &amp; slippers from Puma, Nike, Skechers, Crocs and more —
              handpicked at our Bypass Road store since {ESTD_YEAR}.
            </p>
            <div className="actions">
              <button onClick={() => go('categories')}>Explore Collection <ArrowRight size={16} /></button>
              <a href={waLink('Hi Chappal House, I have a question about your footwear collection.')} target="_blank" rel="noreferrer">
                Chat on WhatsApp <MessageCircle size={16} />
              </a>
            </div>
            <div className="proof">
              <span><Sparkles size={13} /> Est. {ESTD_YEAR}</span>
              <span><Award size={13} /> Multi-brand store</span>
              <span><MapPin size={13} /> Bypass Road, Atmakur</span>
            </div>
          </Reveal>
        </section>

        <div className="ticker">
          NEW ARRIVALS EVERY WEEK &nbsp;✦&nbsp; PUMA &nbsp;•&nbsp; NIKE &nbsp;•&nbsp; SKECHERS &nbsp;•&nbsp; CROCS &nbsp;✦&nbsp; VISIT US IN STORE &nbsp;✦&nbsp;
        </div>

        <section id="categories" className="section">
          <Reveal as="div" className="head">
            <div>
              <p className="eyebrow">SHOP BY CATEGORY</p>
              <h2>Find your <i>next pair.</i></h2>
            </div>
            <p>From the gym to the wedding hall — a category for every step you take.</p>
          </Reveal>
          <div className="cats">
            {CATEGORIES.map((c, i) => (
              <Reveal as="article" key={c.name} delay={i * 70}>
                <div className="cat-media">
                  <Img src={`/assets/${c.img}`} alt={c.name} fallbackIcon={c.icon} />
                </div>
                <div className="cat-body">
                  <small>0{i + 1}</small>
                  <div>
                    <h3>{c.name}</h3>
                    <p>{c.desc}</p>
                  </div>
                  <ArrowRight />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="products" className="section light">
          <Reveal as="div" className="head">
            <div>
              <p className="eyebrow">NEW ARRIVALS &amp; POPULAR PICKS</p>
              <h2>Fresh on the <i>shelf.</i></h2>
            </div>
            <a href={IG_URL} target="_blank" rel="noreferrer">See Instagram <ExternalLink size={15} /></a>
          </Reveal>
          <div className="products">
            {PRODUCTS.map((p, i) => (
              <Reveal as="article" className="product-card" key={p.name} delay={i * 80}>
                <div className="product-media" onClick={() => setLightbox(p)}>
                  <Img src={`/assets/${p.img}`} alt={`${p.brand} ${p.name}`} />
                  <span className="tag">{p.tag}</span>
                  <span className="zoom"><ZoomIn size={16} /></span>
                </div>
                <div className="product-info">
                  <small>{p.cat}</small>
                  <h3>{p.brand} {p.name}</h3>
                  <span className="price">Price on enquiry</span>
                  <div className="product-actions">
                    <button onClick={() => setLightbox(p)}>View Product</button>
                    <a
                      href={waLink(`Hi Chappal House, I'd like to enquire about the ${p.brand} ${p.name} (${p.cat}).`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="dark">
          <Reveal as="div" className="dark-copy">
            <p className="eyebrow">WHY CHAPPAL HOUSE</p>
            <h2>Trusted on Bypass<br /><i>Road since {ESTD_YEAR}.</i></h2>
            <p>
              For {YEARS}+ years we've fitted Atmakur with footwear that lasts — a curated,
              multi-brand selection with staff who'll help you find the right size and style,
              not just push a sale.
            </p>
            <div className="brand-chips">
              {BRANDS.map((b) => <span key={b}>{b}</span>)}
            </div>
            <a href={waLink('Hi Chappal House, I would like to know more about your store.')} target="_blank" rel="noreferrer" className="dark-cta">
              Ask us anything <ArrowRight size={15} />
            </a>
          </Reveal>
          <div className="stats" ref={statsRef}>
            <Img src="/assets/interior.png" alt="Inside the Chappal House store" className="stats-bg" fallbackIcon={ShoppingBag} />
            <div className="stats-overlay" />
            <div className="stats-grid">
              <div>
                <b><Counter to={YEARS} suffix="+" trigger={statsVisible} /></b>
                <small>YEARS SERVING ATMAKUR</small>
              </div>
              <div>
                <b><Counter to={BRANDS.length} suffix="+" trigger={statsVisible} /></b>
                <small>BRANDS IN STORE</small>
              </div>
              <div>
                <b><Counter to={CATEGORIES.length} trigger={statsVisible} /></b>
                <small>FOOTWEAR CATEGORIES</small>
              </div>
            </div>
          </div>
        </section>

        <section className="insta">
          <Reveal className="insta-copy">
            <Instagram />
            <p className="eyebrow">FOLLOW THE STORE</p>
            <h2>See what's <i>new,</i> first.</h2>
            <p>New arrivals, restocks and store updates go up on Instagram before anywhere else.</p>
            <a href={IG_URL} target="_blank" rel="noreferrer">
              Follow @{IG_HANDLE} <ArrowRight size={16} />
            </a>
          </Reveal>
          <Reveal as="div" className="insta-grid" delay={100}>
            {PRODUCTS.map((p) => (
              <a key={p.img} href={IG_URL} target="_blank" rel="noreferrer" className="insta-tile">
                <Img src={`/assets/${p.img}`} alt={`${p.brand} ${p.name}`} fallbackIcon={Instagram} />
              </a>
            ))}
          </Reveal>
        </section>

        <section id="visit" className="visit">
          <Reveal as="div" className="map">
            <iframe
              title="Chappal House location"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
          <Reveal className="visitcopy" delay={80}>
            <p className="eyebrow">COME VISIT</p>
            <h2>See it.<br /><i>Try it. Love it.</i></h2>
            <div className="row">
              <MapPin />
              <span><b>Chappal House</b>Bypass Road, Atmakur, Andhra Pradesh 524322</span>
            </div>
            <div className="row">
              <Clock />
              <span><b>Store Hours</b>10:00 AM – 9:00 PM, all days</span>
            </div>
            <div className="row">
              <Phone />
              <span><b>Call / WhatsApp</b>+91 {PHONE}</span>
            </div>
            <div className="actions">
              <a href={MAPS_URL} target="_blank" rel="noreferrer">Get Directions <ArrowRight size={16} /></a>
              <a href={`tel:+${PHONE_INTL}`}>Call Now <Phone size={16} /></a>
              <a href={waLink('Hi Chappal House, I would like to visit your store.')} target="_blank" rel="noreferrer">
                WhatsApp <MessageCircle size={16} />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer>
        <div>
          <Img src="/assets/logo.png" alt="Chappal House logo" className="footer-logo" fallbackIcon={Footprints} />
          <h3>CHAPPAL<br /><i>HOUSE</i></h3>
          <small>ATMAKUR • SINCE {ESTD_YEAR}</small>
        </div>
        <div>
          <strong>EXPLORE</strong>
          {NAV.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
        </div>
        <div>
          <strong>CONNECT</strong>
          <a href={IG_URL} target="_blank" rel="noreferrer">Instagram</a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
          <a href={`tel:+${PHONE_INTL}`}>+91 {PHONE}</a>
          <span className="addr">Bypass Road, Atmakur, AP 524322</span>
        </div>
      </footer>
      <div className="copyright">© {new Date().getFullYear()} Chappal House, Atmakur. All rights reserved.</div>

      <a
        className="wa"
        href={waLink('Hi Chappal House, I found your website and have a question.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle />
      </a>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><X /></button>
          <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
            <Img src={`/assets/${lightbox.img}`} alt={`${lightbox.brand} ${lightbox.name}`} fallbackIcon={Footprints} />
            <div className="lightbox-info">
              <small>{lightbox.cat}</small>
              <h3>{lightbox.brand} {lightbox.name}</h3>
              <a
                href={waLink(`Hi Chappal House, I'd like to enquire about the ${lightbox.brand} ${lightbox.name} (${lightbox.cat}).`)}
                target="_blank"
                rel="noreferrer"
              >
                Enquire on WhatsApp <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
