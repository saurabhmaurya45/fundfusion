import { feedback } from '../../Constants/constants';
import styles from '../../Constants/style';
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div  className=" animation w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2 data-aos="fade-left" className={`${styles.heading2} animation`}>
        What People are <br className="sm:block hidden" /> saying about us
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p data-aos="fade-left" className={`${styles.paragraph} animation text-left max-w-[550px]`}>
        Everything you need to raise funds and grow your project globally with blockchain technology. Secure, transparent transactions powered by MetaMask.
        </p>
      </div>
    </div>

    <div data-aos="zoom-in-down" className="animation flex flex-wrap sm:justify-start justify-center w-full lg:w-[1208px] feedback-container relative z-[1]">
      {feedback.map((card) => <FeedbackCard key={card.id} {...card} />)}
    </div>
  </section>
);

export default Testimonials;