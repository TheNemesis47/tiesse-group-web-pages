import { Header } from "components/header/Header";
import { Hero } from "components/hero/Hero";
import { Presentazione } from "components/about/Presentazione";
import { Services } from "components/services/Services";
import { Testimonials } from "components/testimonials/Testimonials";
import { Contact } from "components/contact/Contact";
import { Footer } from "components/footer/Footer";

export default function App() {
    return (
        <>
            <div id="top" aria-hidden />
            <a className="sr-only" href="#chi-siamo">Salta al contenuto</a>
            <Header />
            <Hero />
            <Presentazione />
            <Services />
            <Testimonials />
            <Contact />
            <Footer />
        </>
    );
}
