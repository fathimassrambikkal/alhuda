export default function OrganizationJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": "https://www.alhudaqa.com/#organization",

    name: "Alhuda for Rubber",
    alternateName: "الهدى للمطاط",

    url: "https://www.alhudaqa.com",

    logo: {
      "@type": "ImageObject",
      url: "https://www.alhudaqa.com/images/logo.webp",
    },

    image: "https://www.alhudaqa.com/images/logo.webp",

    description:
      "Alhuda for Rubber provides high-quality rubber products, flooring, conveyor belts, sports surfaces, and customized rubber solutions in Qatar.",

    foundingDate: "1989",

    email: "support@alhudaqa.com",

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+974-3023-3304",
        contactType: "customer service",
        areaServed: "QA",
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+974-5569-3943",
        contactType: "customer service",
        areaServed: "QA",
        availableLanguage: ["English", "Arabic"],
      },
    ],

    address: {
      "@type": "PostalAddress",
      addressLocality: "Doha",
      addressCountry: "QA",
      postOfficeBoxNumber: "2141",
    },

    areaServed: {
      "@type": "Country",
      name: "Qatar",
    },

    sameAs: [
      "https://www.instagram.com/hichem.halaoui",
      "https://www.facebook.com/share/19N7EFxmb7/",
      "https://vt.tiktok.com/ZSXVxGTeh/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}