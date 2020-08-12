import { createAppsClient, logger, Messages } from 'vtex'
import { removeNpm } from './utils'

const { getDependencies } = createAppsClient()

export default async (flags: { keys: boolean; npm: boolean }) => {
  logger.debug(Messages.DEPS_LIST_INIT)
  const deps = await getDependencies()
  const keysOnly = flags.keys

  if (!flags.npm) {
    removeNpm(deps)(!keysOnly)
  }

  const result = keysOnly ? Object.keys(deps) : deps

  console.log(JSON.stringify(result, null, 2))
}
