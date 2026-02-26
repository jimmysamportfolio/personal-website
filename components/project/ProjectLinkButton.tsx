import { ExternalLink, LinkType } from "@/app/constants";
import Link from "next/link";
import { FaApple, FaFigma, FaGithub } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function ProjectLinkButton({ item }: { item: ExternalLink }) {
  const { url, linkType, cta } = item;

  let icon = item.icon || null;

  switch (linkType) {
    case LinkType.GITHUB:
      icon = <FaGithub size={10} />;
      break;
    case LinkType.FIGMA:
      icon = <FaFigma size={10} />;
      break;
    case LinkType.WEBSITE:
      icon = <Globe size={10} />;
      break;
    case LinkType.APPLE:
      icon = <FaApple size={10} />;
      break;
    default:
      break;
  }

  return (
    <Link
      href={url}
      target="_blank"
      className="flex flex-row gap-1 w-fit items-center bg-background hover:underline"
    >
      {icon && icon}
      <div className="text-sm leading-[0px]">
        {cta}
      </div>
    </Link>
  );
}
