

export class Logger {

    constructor(prefix) {
        this.prefix = prefix;
    }
   
    info(tag,...arg) {
        console.log(`[${tag}] [info]:`,...arg)
    }

    warn(tag,...arg) {
        console.log(`[${tag}] [warn]:`,...arg)
    }

    error(tag,...arg) {
        console.log(`[${tag}] [error]:`,...arg)
    }
    
    debug(tag,...arg) {
        console.log(`[${tag}] [debug]:`,...arg)
    }
}

export default new Logger("jyzx_crx")