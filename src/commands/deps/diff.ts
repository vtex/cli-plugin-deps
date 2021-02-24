import { CustomCommand, SessionManager, ColorifyConstants } from 'vtex'
import workspaceDepsDiff from '../../modules/deps/diff'

export default class DepsDiff extends CustomCommand {
  static description = `Displays the differences between the dependencies of two distinct ${ColorifyConstants.ID(
    'workspaces'
  )}. If a single parameter is passed, the specified ${ColorifyConstants.ID(
    "workspace's"
  )} dependencies are compared with the master\'s. If no parameter is passed, the diff is made between the current ${ColorifyConstants.ID(
    'workspace'
  )} and master.`

  static examples = [`${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex deps diff')} workspace1 workspace2`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [
    {
      name: 'workspace1',
      required: false,
      default: SessionManager.getSingleton().workspace,
      description: `First ${ColorifyConstants.ID('workspace')} for comparison.`,
    },
    {
      name: 'workspace2',
      required: false,
      default: 'master',
      description: `Second ${ColorifyConstants.ID('workspace')} for comparison.`,
    },
  ]

  async run() {
    const {
      args: { workspace1, workspace2 },
    } = this.parse(DepsDiff)

    await workspaceDepsDiff(workspace1, workspace2)
  }
}
