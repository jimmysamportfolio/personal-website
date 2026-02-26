import { SiReact, SiTypescript } from "react-icons/si";
import { FaSwift } from "react-icons/fa";
import { IconType } from "react-icons";

export type TagConfig = {
  label: string;
  icon: IconType;
  borderColor: string;
};

export const TAGS: Record<string, TagConfig> = {
  React: {
    label: "React",
    icon: SiReact,
    borderColor: "#61DAFB",
  },
  TypeScript: {
    label: "TypeScript",
    icon: SiTypescript,
    borderColor: "#3178c6",
  },
  SwiftUI: {
    label: "SwiftUI",
    icon: FaSwift,
    borderColor: "#62c0ff",
  },
};
