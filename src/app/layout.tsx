import { useClerkAppearance } from '@/lib/useClerkAppearance';
import { ClerkProvider, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import VerityLogo from '@/components/verityLogo';
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
          <header className="fixed top-4 left-4">
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
          <div className="text-foreground fixed top-4 right-4 flex flex-col items-end">
            <Link href="/">
              <VerityLogo />
            </Link>
            <p className="w-fit">
              by{' '}
              <a
                href="https://www.arithefirst.com/"
                className="text-primary hover:text-primary/90 mr-2 underline"
                target="_blank"
              >
                April Hall
              </a>
            </p>
          </div>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
