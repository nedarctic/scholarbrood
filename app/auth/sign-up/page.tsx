import dynamic from 'next/dynamic'

const SignUpPageClient = dynamic(
  () => import('./SignUpPageClient'),
  { ssr: true }
)

export default function Page() {
  return <SignUpPageClient />
}