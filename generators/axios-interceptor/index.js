import Generator from 'yeoman-generator';

export default class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'select',
                name: 'packageManager',
                message: 'Package manager',
                choices: ['npm', 'yarn', 'pnpm'],
                default: 'pnpm'
            },
            {
                type: 'input',
                name: 'outputDir',
                message: 'Output directory (relative to project root)',
                default: 'src/interceptors'
            },
            {
                type: 'input',
                name: 'tokenKey',
                message: 'localStorage key for the token',
                default: 'token'
            },
            {
                type: 'input',
                name: 'loginPath',
                message: 'Redirect path on 401',
                default: '/login'
            }
        ]);
    }

    writing() {
        const { outputDir, tokenKey, loginPath } = this.answers;

        this.fs.copyTpl(
            this.templatePath('interceptor.js'),
            this.destinationPath(`${outputDir}/interceptor.js`),
            { tokenKey, loginPath }
        );

        this.fs.extendJSON(this.destinationPath('package.json'), {
            dependencies: {
                axios: '^1.7.0'
            }
        });
    }

    install() {
        const pm = this.answers.packageManager;
        const cmd = pm === 'npm'
            ? 'npm install axios --legacy-peer-deps'
            : pm === 'yarn'
                ? 'yarn add axios --legacy-peer-deps'
                : 'pnpm add axios';
        this.log('\nInstalling axios...\n');
        this.spawnCommandSync(cmd);
    }
};
