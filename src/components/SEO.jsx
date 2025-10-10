import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "MyFreeStocks — Smarter Investing Starts Here",
  description = "Compare brokerages, explore stock insights, and discover the best free investing offers on MyFreeStocks.",
  url = "https://myfreestocks.com",
  image = "/logo-dark.svg",
  type = "website",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="theme-color" content="#00c37a" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
