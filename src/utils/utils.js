const getBirthDay = (seconds) => {
    const date = new Date(Date(seconds))
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
}


export {getBirthDay}