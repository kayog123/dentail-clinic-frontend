import Layout from "../components/general/layout";
import About from "./_components/about";
import CTA from "./_components/cta";
import Hero from "./_components/hero";
import OfficeInfo from "./_components/office-info";
import Services from "./_components/services";

export default function Home() {
  return (
    <Layout>
      <div className=" ">
        <Hero />
        <About />
        <Services />
        <OfficeInfo />
        <CTA />
      </div>
    </Layout>
  );
}
