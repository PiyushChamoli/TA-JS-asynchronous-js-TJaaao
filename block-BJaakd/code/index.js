function resolve() {
    return new Promise((resolve,reject) => {
        resolve(
            setTimeout(() => `Promise Resolved!`, 1000)
        )
    })
}