import About from './ui/about';
import BrowseProjects from './ui/browse-projects';
import Experiences from './ui/experiences';
import Hero from './ui/hero';
// import Navbar from './ui/navbar';

export default function Page() {
  return (
    <div className="relative z-0">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <About />
      <BrowseProjects />
      <Experiences />
    </div>
  );
}
