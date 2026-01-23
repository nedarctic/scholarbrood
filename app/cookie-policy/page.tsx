'use client'

export default function CookiePolicyWrapper() {
  const CookiePolicy = require('./CookiePolicyClient').default;
  return <CookiePolicy />;
}
