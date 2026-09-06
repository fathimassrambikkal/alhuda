export default function OrganizationJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": "https://alhudaqa.com/#organization",

    name: "Alhuda for Rubber",

    url: "https://alhudaqa.com",

    logo: {
      "@type": "ImageObject",
      url: "https://alhudaqa.com/images/logo.webp",
    },

    description:
      "Alhuda for Rubber provides high-quality rubber products, flooring, conveyor belts, sports surfaces, and customized rubber solutions in Qatar.",

    email: "mailto:support@alhudaqa.com",

    telephone: [
      "+974 3023 3304",
      "+974 5569 3943",
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