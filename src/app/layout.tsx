import { useClerkAppearance } from '@/lib/useClerkAppearance';
import { ClerkProvider, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { buttonVariants } from '@/components/ui/button';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Verity (React Edition)',
  description:
    'Verify (Vertical + Community) is a project built by April Hall to try out a bunch of' +
    ' different javascript frameworks by making the same app in 5 of them',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={useClerkAppearance()}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} dark bg-background antialiased`}>
          <header className="absolute top-4 left-4">
            <SignedOut>
              <SignUpButton mode="modal" appearance={useClerkAppearance()}>
                <div className={`${buttonVariants({ variant: 'default' })} cursor-pointer`}>Sign Up</div>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  ...useClerkAppearance(),
                  elements: {
                    userButtonAvatarBox: {
                      height: '48px',
                      width: '48px',
                    },
                  },
                }}
              />
            </SignedIn>
          </header>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
