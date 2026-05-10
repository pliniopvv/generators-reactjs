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
                default: 'src/components'
            }
        ]);
    }

    writing() {
        const { outputDir } = this.answers;

        this.fs.copy(
            this.templatePath('withNavigation.jsx'),
            this.destinationPath(`${outputDir}/withNavigation.jsx`)
        );

        this.fs.extendJSON(this.destinationPath('package.json'), {
            dependencies: {
                'react-router-dom': '^6.26.0'
            }
        });
    }

    install() {
        const pm = this.answers.packageManager;
        const cmd = pm === 'npm'
            ? 'npm install react-router-dom --legacy-peer-deps'
            : pm === 'yarn'
                ? 'yarn add react-router-dom --legacy-peer-deps'
                : 'pnpm add react-router-dom';
        this.log('\nInstalling react-router-dom...\n');
        this.spawnCommandSync(cmd);
    }
};
