import Image from "next/image";
import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "./image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="my-8 md:my-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1]">
            <Image
              src={url}
              alt={value.alt || ""}
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 700px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-gray-500 mt-3 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="my-6 md:my-8 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 md:p-5 overflow-x-auto text-sm">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-10 md:mt-14 mb-4 md:mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white mt-8 md:mt-10 mb-3 md:mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-white mt-6 md:mt-8 mb-2 md:mb-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-[15px] md:text-base text-gray-400 leading-relaxed mb-5 md:mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#CCFF00] pl-4 md:pl-6 my-6 md:my-8 text-base md:text-lg text-gray-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 mb-5 md:mb-6 space-y-2 text-gray-400 marker:text-[#CCFF00]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 mb-5 md:mb-6 space-y-2 text-gray-400 marker:text-[#CCFF00]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-white/[0.08] rounded px-1.5 py-0.5 text-sm text-[#CCFF00]">{children}</code>
    ),
    link: ({ value, children }) => (
      <Link
        href={value.href}
        target={value.newTab ? "_blank" : undefined}
        rel={value.newTab ? "noopener noreferrer" : undefined}
        className="text-[#CCFF00] underline underline-offset-4 hover:text-white transition-colors"
      >
        {children}
      </Link>
    ),
  },
};