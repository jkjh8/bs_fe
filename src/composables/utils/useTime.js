import moment from 'moment'
import useNotify from 'composables/useNotify'

moment.locale = 'ko-KR'

const fnGetTimeFormat = (time) => {
  return {
    yyyymmdd: moment(time).formay('YYYY-MM-DD'),
    hhmmssa: moment(time).formay('hh:mm:ss a')
  }
}

export { fnGetTimeFormat }
