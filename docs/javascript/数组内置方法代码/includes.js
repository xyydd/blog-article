Array.prototype.includes = function (item, index = 0) {
    index = index + this.length
    if (index < 0) {
        index = 0
    }
    if (index < this.length) {
        for (let i = index; i < this.length; i++) {
            if (item === this[i]) {
                return true
            }
        }
    }
    return false
}