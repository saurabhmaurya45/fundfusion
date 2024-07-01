import styles from '../Constants/style';
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from '../Components' ;
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import '../index.css'

const Home = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    return (
        
        <div className="bg-primary w-full overflow-hidden">
            <div className={`fixed top-0 z-10 w-full bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>

            <div className={` bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Hero />
                </div>
            </div>

            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Business />
                    <Billing />
                    <CardDeal />
                    <Testimonials />
                    <Clients />
                    <CTA />
                    <Footer />
                </div>
            </div>
        </div>
    )

}

export default Home;