import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import ClientVideo from "./components/project/ClientVideo";
import { cn } from "./lib/utils";

interface MDXImageProps extends ImageProps {
  caption?: string;
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Image: (props: MDXImageProps) => (
      <div className="my-12">
        <Image {...props} alt={props.alt || ""} />{" "}
        {props.caption && (
          <p className="text-xs text-muted-foreground mt-2">
            {" "}
            {props.caption}{" "}
          </p>
        )}
      </div>
    ),

    Video: ({ src, caption, className }: { src: string; caption?: string; className?: string }) => (
      <div className={cn("my-12", className)}>
        <div className="overflow-hidden">
          <ClientVideo src={src} className="w-full" />
        </div>
        {caption && (
          <p className="text-xs text-muted-foreground mt-2"> {caption} </p>
        )}
      </div>
    ),

    YouTube: ({ id, caption }: { id: string; caption?: string }) => (
      <div className="my-12">
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={caption || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        {caption && (
          <p className="text-xs text-muted-foreground mt-2">{caption}</p>
        )}
      </div>
    ),

    h1: (props) => (
      <h1
        className="text-2xl font-medium mb-6 tracking-tight"
        {...props}
      />
    ),
    h2: (props) => (
      <h2 className="text-xl font-medium tracking-tight mt-8 mb-3" {...props} />
    ),
    h3: ({ children, ...props }) => (
      <h3
        {...props}
        className={cn(
          "text-lg font-medium tracking-tight mt-6 mb-2",
          props.className
        )}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        {...props}
        className={cn(
          "text-sm font-medium text-muted-foreground tracking-wide mb-2",
          props.className
        )}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p
        {...props}
        className={cn(
          props.className,
          "whitespace-pre-line mb-4 text-zinc-900 dark:text-zinc-300"
        )}
      >
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong {...props} className="font-semibold">
        {children}
      </strong>
    ),
    ul: (props) => (
      <ul
        className="list-disc list-outside my-4 pl-6 text-zinc-900 dark:text-zinc-300"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal list-outside my-4 pl-6 text-zinc-900 dark:text-zinc-300"
        {...props}
      />
    ),
    li: (props) => (
      <li className="my-1 leading-relaxed text-zinc-900 dark:text-zinc-300" {...props} />
    ),
    a: (props) => (
      <a
        {...props}
        target="_blank"
        className={cn(
          "relative inline-block text-blue-400 transition-colors duration-200 ease-in-out hover:text-blue-300",
          "after:absolute after:left-0 after:bottom-[3px] after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-300 after:transition-transform after:duration-200 after:ease-out",
          "hover:after:scale-x-100"
        )}
      />
    ),
    pre: (props) => (
      <pre
        className="bg-muted text-sm rounded-md p-4 overflow-x-auto my-4"
        {...props}
      />
    ),
    code: (props) => (
      <code className="bg-muted text-sm px-1 py-0.5 rounded" {...props} />
    ),
    hr: (props) => (
      <div className="my-10">
        <hr
          {...props}
          className={cn("border-t border-muted", props.className)}
        />
      </div>
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-muted pl-4 italic text-muted-foreground my-4"
        {...props}
      />
    ),

    ...components,
  };
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
