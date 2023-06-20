import React from "react";
import { IHeroHeaderFields } from "@d20/contentful/types/generated/contentful";

interface BannerProps {
  heading: IHeroHeaderFields["heading"];
  subheading: IHeroHeaderFields["subheading"];
  logo: IHeroHeaderFields["logo"];
}

function Banner({ heading, subheading, logo }: BannerProps) {
  const logoUrl = `http:${logo?.fields?.file?.url}`;

  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">{heading}</h1>
        <h2>{subheading}</h2>
      </div>

      <img
        className="hidden md:inline-flex h-32 lg:h-full"
        src={logoUrl}
        alt={logo?.fields.title as string}
      />
    </div>
  );
}

export default Banner;
