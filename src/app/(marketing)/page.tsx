import Layout from "../components/general/layout";
import Hero from "./_components/hero";
import Features from "./_components/features";
import Services from "./_components/services";
import Testimonials from "./_components/testimonials";
import About from "./_components/about";
import OfficeInfo from "./_components/office-info";
import CTA from "./_components/cta";

export default function MarketingPage() {
  return (
    <Layout>
      <div className="overflow-hidden">
        <Hero />
        <Features />
        <Services />
        <Testimonials />
        <About />
        <OfficeInfo />
        <CTA />
      </div>
    </Layout>
  );
}
