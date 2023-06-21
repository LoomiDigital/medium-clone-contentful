import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import client from "@d20/contentful/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@d20/components/ContentfulElements";

import Image from "next/image";
import Header from "@d20/components/Header";

import {
  IAuthorFields,
  IPost,
  IPostFields,
} from "@d20/contentful/types/generated/contentful";

interface Props {
  post: IPost & { fields: IPostFields };
}

function PostPage({
  post: {
    fields: { title, headline, author, coverImage, mainText },
    sys: { createdAt },
  },
}: Props) {
  const authorFields = author?.fields as IAuthorFields;
  const coverImageFields = coverImage?.fields;

  return (
    <main>
      <Header />
      {coverImage && (
        <Image
          className="w-full h-40 object-cover"
          src={`https:${coverImageFields?.file?.url!}`}
          alt={coverImageFields?.title as string}
          width={876}
          height={160}
          sizes="(max-width: 768px) 70vw,
                    50vw"
        />
      )}

      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl mt-10 mb-3">{title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{headline}</h2>
        <div className="flex items-center space-x-2">
          {authorFields.image && (
            <Image
              className="h-10 w-10 rounded-full"
              src={`https:${authorFields.image.fields.file?.url}`}
              alt={authorFields.name}
              width={48}
              height={48}
            />
          )}

          <p className="font-extra-light text-sm">
            Blog post by{" "}
            <span className="text-green-600">{authorFields.name}</span> —
            Published at {new Date(createdAt).toLocaleString("en-GB")}
          </p>
        </div>
        <div className="mt-10">
          {documentToReactComponents(mainText, options)}
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border-yellow-500" />
    </main>
  );
}

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.getEntries({ content_type: "post" });

  const paths = posts?.items?.map(({ fields }) => ({
    params: { slug: fields.slug as IPostFields["slug"] },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await client.getEntries({
    content_type: "post",
    "fields.slug[match]": params?.slug,
  });

  return {
    props: {
      post: post.items[0],
    },
  };
};
