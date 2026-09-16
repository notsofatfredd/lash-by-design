import Image from 'next/image';
import { BookingForm } from './booking-form';

const services = [
  { name: 'Classic set', detail: 'Soft, natural definition', duration: '90 min', price: 'R650' },
  { name: 'Hybrid set', detail: 'Texture with a little more fullness', duration: '105 min', price: 'R780' },
  { name: 'Volume set', detail: 'Lightweight, full and fluffy', duration: '120 min', price: 'R900' },
];

export default function Home() {
  return <main>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Lash by Design home">LASH <i>by</i> DESIGN</a><nav aria-label="Main navigation"><a href="#services">Services</a><a href="#booking">Book</a><a href="#about">About</a></nav><a className="header-cta" href="#booking">Book now</a></header>
    <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow">✦ Lash artistry, made personal</span><h1>Your eyes.<br /><em>Beautifully</em> designed.</h1><p>Thoughtful lash sets shaped for your features, your style and your everyday.</p><div className="hero-actions"><a className="button primary" href="#booking">Book your set</a><a className="text-link" href="#services">View services ↓</a></div></div><div className="hero-image"><Image src="/lash-hero.png" alt="Model wearing a refined lash set" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="hero-note">Johannesburg<br /><span>By appointment</span></div></section>
    <section className="services section" id="services"><div className="section-intro"><span className="eyebrow">The lash menu</span><h2>Find your finish.</h2><p>Every set begins with a quick consultation and is mapped to suit your eye shape.</p></div><div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.name}><span>0{index + 1}</span><h3>{service.name}</h3><p>{service.detail}</p><div><small>{service.duration}</small><b>{service.price}</b></div></article>)}</div></section>
    <section className="booking-section section" id="booking"><div className="booking-copy"><span className="eyebrow">Reserve your appointment</span><h2>Let’s design your next set.</h2><p>Choose a service and an available time. Your appointment request is saved instantly and we’ll use the details provided to confirm.</p><div className="policy"><b>Good to know</b><span>Please arrive with clean lashes and no eye makeup. Allow the full appointment time for your best result.</span></div></div><BookingForm /></section>
    <section className="about section" id="about"><div><span className="eyebrow">About the studio</span><h2>Detail is<br />the design.</h2></div><p>Lash by Design is a private lash studio focused on clean application, comfortable wear and results that feel like you. Each appointment is unhurried, hygienic and tailored from the first consultation.</p></section>
    <footer><a className="wordmark" href="#top">LASH <i>by</i> DESIGN</a><p>Appointments available by online booking.</p><a href="#booking">Book online</a></footer>
  </main>;
}
