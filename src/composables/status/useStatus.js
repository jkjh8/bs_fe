const fnCheckActiveZones = (zones) => {
  let az = []
  for (let i = 0; i < zones.length; i++) {
    if (zones[i].Active) {
      az += 1
    }
  }
  return az.length
}

const fnCheckPriority = (priority) => {
  switch (priority) {
    case 1:
    case 2:
      return 'bg-red text-white'
    case 3:
    case 4:
      return 'bg-yellow'
    case 5:
      return 'bg-green text-white'
    default:
      return ''
  }
}

export { fnCheckActiveZones, fnCheckPriority }
