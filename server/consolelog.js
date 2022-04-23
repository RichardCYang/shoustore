
const CONLOG_TEXT_RESET     = "\x1b[0m";
const CONLOG_TEXT_BLACK     = "\x1b[30m";
const CONLOG_TEXT_RED       = "\x1b[31m";
const CONLOG_TEXT_GREEN     = "\x1b[32m";
const CONLOG_TEXT_YELLOW    = "\x1b[33m";
const CONLOG_TEXT_BLUE      = "\x1b[34m";
const CONLOG_TEXT_MAGENTA   = "\x1b[35m";
const CONLOG_TEXT_CYAN      = "\x1b[36m";
const CONLOG_TEXT_WHITE     = "\x1b[37m";

exports.coninfo = (msg) => {
    console.log( "[ INFO ]: " + msg );
}

exports.conerr = (msg) => {
    console.log( CONLOG_TEXT_RED + "[ ERROR ]: " + msg + CONLOG_TEXT_RESET );
}

exports.conwarn = (msg) => {
    console.log( CONLOG_TEXT_YELLOW + "[ WARNING ]: " + msg + CONLOG_TEXT_RESET );
}

exports.confin = (msg) => {
    console.log( CONLOG_TEXT_GREEN + "[ DONE ]: " + msg + CONLOG_TEXT_RESET );
}

exports.conclr = (msg,color) => {
    console.log( color + msg + CONLOG_TEXT_RESET);
}