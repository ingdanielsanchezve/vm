export const VM_TIMES = {
  'VM-S': { min: 3000, max: 4000 },
  'VM-M': { min: 2000, max: 3000 },
  'VM-L': { min: 1000, max: 2000 },
}

export const TASK_STATUS = {
  STARTING: 'Starting',
  RUNNING: 'Running',
  COMPLETED: 'Completed',
  CANCELED:  'Canceled'
}

export const TASK_ICONS = {
  STARTING: 'gear',
  RUNNING: 'gear',
  COMPLETED: 'check-circle',
  CANCELED:  'circle-exclamation'
}

export const ERRORS = {
  TASK_NAME: {
    error: 'task_name',
    message: 'Please enter a Task name.'
  },
  TASK_NAME_INVALID: {
    error: 'task_name',
    message: 'The Task name you entered is not valid.'
  },
  VM_TYPE: {
    error: 'vm_ytpe',
    message: 'Please Select VM type.'
  }
}

