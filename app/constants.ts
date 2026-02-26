export enum LinkType {
  FIGMA = "Figma",
  GITHUB = "GitHub",
  WEBSITE = "Website",
  APPLE = "Apple",
}

export interface ExternalLink {
  url: string;
  linkType?: LinkType;
  icon?: React.JSX.Element;
  cta: string;
}
