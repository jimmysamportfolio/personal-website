import ProjectLinkButton from "@/components/project/ProjectLinkButton";
import DecryptedText from "@/components/text-effects/DecryptedText";
import { HomeIcon } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 w-full">
      <Image
        alt="404 Not Found"
        src="/icon/404-not-found.png"
        width={300}
        height={300}
        className="mb-8 invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0"
        priority
      />
      <DecryptedText
        text="Error 404: Page Not Found"
        speed={40}
        maxIterations={20}
        animateOn="view"
        revealDirection="start"
        sequential={true}
        encryptedClassName="text-2xl font-medium"
        parentClassName="text-2xl font-medium"
      />
      <DecryptedText
        text="Sorry, the page you're looking for doesn't exist"
        speed={40}
        maxIterations={20}
        animateOn="view"
        revealDirection="start"
        sequential={true}
        encryptedClassName="text-zinc-400 mb-6"
        parentClassName="text-zinc-400 mb-6"
      />
      <ProjectLinkButton
        item={{ url: "/", cta: "Return to home", icon: <HomeIcon width={16} height={16}/> }}
      />
    </div>
  );
}
