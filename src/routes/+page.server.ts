import db, { objectKey } from '$lib/db'
import type { Result } from '$lib/types/result'

const props = `{
  slug
  title
  metadata {
    description
  }
  type
  thumbnail
}`

export const load = async () => {
	const { objects } = await db.objects
		.find({
			type: objectKey
		})
		.props(props)
		.depth(1)

	return {
		results: objects as Result[]
	}
}
