import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  author?: string;
}

const SEOHead = ({
  title,
  description,
  image = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=630&fit=crop",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  publishedTime,
  author = "Roma Club - Il Portale Giallorosso",
}: SEOHeadProps) => {
  const fullTitle = `${title} | Roma Club Giallorosso`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? "name" : "property";
      let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta
    updateMeta("description", description, true);
    updateMeta("author", author, true);

    // Open Graph
    updateMeta("og:title", fullTitle);
    updateMeta("og:description", description);
    updateMeta("og:image", image);
    updateMeta("og:url", url);
    updateMeta("og:type", type);
    updateMeta("og:site_name", "Roma Club Giallorosso");
    updateMeta("og:locale", "it_IT");

    // Twitter Card
    updateMeta("twitter:card", "summary_large_image", true);
    updateMeta("twitter:title", fullTitle, true);
    updateMeta("twitter:description", description, true);
    updateMeta("twitter:image", image, true);

    // Article specific
    if (type === "article" && publishedTime) {
      updateMeta("article:published_time", publishedTime);
      updateMeta("article:author", author);
    }

    // Cleanup function
    return () => {
      document.title = "Roma Club Giallorosso";
    };
  }, [fullTitle, description, image, url, type, publishedTime, author]);

  return null;
};

export default SEOHead;
