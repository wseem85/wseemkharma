import LazyHero from './components/lazy-hero';
import About from './ui/about';
import BrowseProjects from './ui/browse-projects';
import Experiences from './ui/experiences';

// import Navbar from './ui/navbar';

export default function Page() {
  return (
    <div className="relative z-0">
      {/* <Hero /> */}
      <LazyHero />
      <About />
      <BrowseProjects />
      <Experiences />
    </div>
  );
}
