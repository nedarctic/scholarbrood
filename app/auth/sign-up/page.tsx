import dynamic from 'next/dynamic'

const SignUpPageClient = dynamic(
  () => import('./SignUpPageClient'),
  { ssr: false }
)

export default function Page() {
  return <SignUpPageClient />
}