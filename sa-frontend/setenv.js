const getEnvironmentVariableOrThrowExceptionIfUndefined = env_var => {
    const variable = process.env[env_var];
    if(variable === undefined)
        throw new Error(`Environment variable ${env_var} not set`);
    return variable;
};

const config = {
    WEB_APP_URL: getEnvironmentVariableOrThrowExceptionIfUndefined('WEB_APP_URL')
};
const prettyJson = JSON.stringify(config, null, 2);

console.log(prettyJson);