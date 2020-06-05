import withApollo from '../lib/with-apollo'
import Link from 'next/link'
import { useUserQuery } from '../lib/users.graphql'

const Index = () => {
  const { data } = useUserQuery()

  if (data) {
    const { user } = data
    return (
      <div>
        {/* You're signed in as {viewer.name} and you're {viewer.status} goto{' '} */}
        we retrieved {user.length} users
        <Link href="/about">
          <a>static</a>
        </Link>{' '}
        page.
      </div>
    )
  }

  return <div>...</div>
}

export default withApollo(Index)
