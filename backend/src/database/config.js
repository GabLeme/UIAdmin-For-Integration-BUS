require('dotenv').config();

module.exports = (env) => {
    switch (env) {
        case 'DEV':
            return process.env.ADMIN_UI_ENV_DEV.toString();
        case 'HML':
            return process.env.ADMIN_UI_ENV_HML.toString();
        case 'PRD':
            return process.env.ADMIN_UI_ENV_PRD.toString();
        default:
            throw new Error("Ambiente selecionado não foi encontrado");
    }
}