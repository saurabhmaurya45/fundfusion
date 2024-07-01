import { apple, bill, google } from "../../assets";
import styles, { layout } from "../../Constants/style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img data-aos="zoom-in" src={bill} alt="billing" className=" animation w-[90%] h-[97%] relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div data-aos="fade-left" className={`${layout.sectionInfo} animation`}>
      <h2 className={styles.heading2}>
        Easily control your <br className="sm:block hidden" /> seamless Fundraising
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Effortlessly manage your fundraising with blockchain integration.
       Our platform, compatible with MetaMask, 
       ensures secure and transparent funding transactions.
      </p>

      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" />
        <img src={google} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
      </div>
    </div>
  </section>
);

export default Billing;