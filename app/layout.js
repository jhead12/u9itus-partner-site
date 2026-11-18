// Never shown: middleware.js answers every request. Next.js needs an app directory to build.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
