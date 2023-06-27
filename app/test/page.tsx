'use client'

export default function Page() {
  return (
    <div>
      <a
        href={`https://slack.com/oauth/v2/authorize?client_id=655117460947.5437124489510&scope=channels:read,chat:write,groups:read,im:read,mpim:read,users:read&user_scope=identity.email,identity.basic&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect/slack`}
        target="_blank"
      >
        Slack
      </a>
    </div>
  )
}
