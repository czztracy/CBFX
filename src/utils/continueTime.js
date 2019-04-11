import store from '@/store'
import { addOverTime } from '@/api/modle' 
import { Message, MessageBox } from 'element-ui'
import jwt from 'jwt-simple'
// 定时器隔5分钟执行逻辑
let timeClock = null
export const addTheClock = (createModleTime) => {
    timeClock = setInterval(() => {
        const activetime = sessionStorage.getItem('activetime')
        const waitTimes = (new Date()).getTime() - createModleTime
        const operateTimes = (new Date()).getTime() - activetime
        const waitMinus = minus(waitTimes)
        const operateMinus = minus(operateTimes)
        if ((waitMinus > 20) && (operateMinus > 20)) {
        clearInterval(timeClock);
        MessageBox.prompt('请输入您的登录密码', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '密码不能为空',
            inputType: 'password',
            beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                const jstSecret = 'DBS'
                const logincode = jwt.decode(sessionStorage.getItem('logincode'), jstSecret)
                const userInfoss = []
                const userInfo = {
                userName: logincode,
                password: instance.inputValue
                }
                if (sessionStorage.getItem('roles') !== 'supplier') {
                userInfoss.push(userInfo, 'haier')
                } else {
                userInfoss.push(userInfo, 'supplier')
                }
                store.dispatch('Login', userInfoss).then(() => {
                done()
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '重新登录'
                Message({
                    type: 'success',
                    message: '重新登录成功'
                })
                createModleTime = (new Date()).getTime()
                // sessionStorage.setItem('activetime', (new Date()).getTime())
                addTheClock(createModleTime)
                }).catch(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '重新登录'
                Message({
                    type: 'error',
                    message: '密码错误'
                })
                })
            } else {
                done()
            }
            }
        }).then(({ value }) => {
            // instance.inputValue = value
        }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        })
        } else if (waitMinus > 20 && operateMinus < 20) {
        clearInterval(timeClock);
        addOverTime().then(res => {
            createModleTime = (new Date()).getTime()
            // sessionStorage.setItem('activetime', (new Date()).getTime())
            addTheClock(createModleTime)
            console.log(res)
        }).catch(err => {
            // 111
        })
        }
        console.log(activetime, createModleTime, waitMinus, operateMinus)
    },300000)
}
// 时间戳差值比较
function minus(num) {
    const leave1 = num % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000))
    const leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60*1000))
    const lessTime = hours * 60 + minutes
    return lessTime
}
// 关闭定时器
export const closeClock = () => {
    sessionStorage.removeItem('activetime')
    clearInterval(timeClock);
}

