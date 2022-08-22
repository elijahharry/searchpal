import Script from "next/script";

export const Analytics = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-N86248DK4L"
      />
      <Script>
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  gtag('config', 'G-N86248DK4L')
  `}
      </Script>
    </>
  );
};
