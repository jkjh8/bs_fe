import moment from 'moment'
import useNotify from 'composables/useNotify'

moment.locale = 'ko-KR'

const fnGetTimeFormat = (time) => {
  return moment(time).format('YYYY-MM-DD hh:mm:ss A')
}

const fnGetTimeFormat2Line = (time) => {
  return {
    yyyymmdd: moment(time).format('YYYY-MM-DD'),
    hhmmssa: moment(time).format('hh:mm:ss a')
  }
}
export { fnGetTimeFormat, fnGetTimeFormat2Line }
