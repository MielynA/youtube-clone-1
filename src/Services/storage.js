
const getData = () => {
    return new Promise((resolve, reject) => {
        const data = JSON.parse(localStorage.getItem('data'))
        console.log(data)
        if (data !== null) {
            resolve(data)
        } else {
            resolve(null)
        }
    })

}

const saveData = (key, value) => {
    return new Promise((resolve, reject) => {
        localStorage.setItem(key, JSON.stringify(value))
        resolve('saved')
    })
}


export default { getData, saveData }