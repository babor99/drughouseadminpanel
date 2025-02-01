// Component Imports
import RegisterMultiSteps from '@/views/pages/auth/register-multi-steps'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const RegisterMultiStepsPage = () => {
  // Vars
  const mode = getServerMode()

  return <RegisterMultiSteps mode={mode} />
}

export default RegisterMultiStepsPage

// lst3409skafq9134fksafhsdvc9h8345k3vsdifgqwr943
