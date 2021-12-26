export const formatTime = (s) => {
    let roundedTime = Math.round(s)
    return Number.isNaN(roundedTime) ? '0:00' : (roundedTime-(roundedTime%=60))/60+(9<roundedTime?':':':0')+roundedTime
}
