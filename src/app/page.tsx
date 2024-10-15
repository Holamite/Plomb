import HeroSection from "../components/LandingPage/HeroSection";
import Content from "../components/LandingPage/Content";
import AboutPlomb from "../components/LandingPage/AboutPlomb";
import ContactUs from "../components/LandingPage/ContactUs";
import Faq from "../components/LandingPage/Faq";
export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center mt-32">
        <HeroSection />

        <Content />

        <AboutPlomb />
        <Faq />
        <ContactUs />
      </main>
    </div>
  );
}
