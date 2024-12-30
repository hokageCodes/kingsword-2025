import EventsSection from "../components/event-section/EventSection";
import GestureSection from "../components/gesture/GestureSection";
import HeroSection from "../components/hero-section/HeroSection";
import YouTubeVideos from "../components/upload/YoutubeUpload";
import WorshipPage from "../components/worship-section/WorshipPage";

export default function LandingPage() {
  return (
    <div>
        <HeroSection />
        <YouTubeVideos />
        <WorshipPage />
        <EventsSection />
        <GestureSection />
    </div>
  )
}
