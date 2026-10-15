"use client";

import FunnySoundPrank from "./pranks/FunnySoundPrank";
import MysteryGiftPrank from "./pranks/MysteryGiftPrank";
import FunnyMemePrank from "./pranks/FunnyMemePrank";
import JumpScarePrank from "./pranks/JumpScarePrank";
import LovePrank from "./pranks/LovePrank";
import DontClickPrank from "./pranks/DontClickPrank";
import FakeErrorPrank from "./pranks/FakeErrorPrank";
import TalkingAnimalsPrank from "./pranks/TalkingAnimalsPrank";
import WeirdVideoPrank from "./pranks/WeirdVideoPrank";

export default function PrankRunner({ slug }: { slug: string }) {
  switch (slug) {
    case "funny-sound": return <FunnySoundPrank />;
    case "mystery-gift": return <MysteryGiftPrank />;
    case "funny-meme": return <FunnyMemePrank />;
    case "jump-scare": return <JumpScarePrank />;
    case "love-prank": return <LovePrank />;
    case "dont-click": return <DontClickPrank />;
    case "fake-error": return <FakeErrorPrank />;
    case "talking-animals": return <TalkingAnimalsPrank />;
    case "weird-video": return <WeirdVideoPrank />;
    default: return <div className="text-center py-10">Prank not found 😢</div>;
  }
}
