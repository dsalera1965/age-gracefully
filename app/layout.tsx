export const metadata = {
  title: 'Age Gracefully',
  description: 'Retirement planning and wellness coaching for a meaningful next chapter.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
