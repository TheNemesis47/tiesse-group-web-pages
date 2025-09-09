import { Header } from "components/header/Header";
import { Hero } from "components/hero/Hero";
import { Presentazione } from "components/about/Presentazione";
import { Services } from "components/services/Services";
import { Testimonials } from "components/testimonials/Testimonials";
import { Contact } from "components/contact/Contact";

export default function App() {
    return (
        <>
            <a className="sr-only" href="#chi-siamo">Salta al contenuto</a>
            <Header />
            <Hero />
            <Presentazione />
            <Services />
            <Testimonials />
            <Contact />
        </>
    );
}
