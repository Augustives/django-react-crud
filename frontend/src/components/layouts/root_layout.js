const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <main className="min-h-[100dvh] flex flex-col content-center justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
