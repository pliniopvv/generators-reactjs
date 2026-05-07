import Generator from 'yeoman-generator';

export default class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'select',
                name: 'packageManager',
                message: 'Package manager',
                choices: ['npm', 'yarn', 'pnpm'],
                default: 'npm'
            },
            {
                type: 'select',
                name: 'routingStyle',
                message: 'Routing style',
                choices: [
                    { name: 'createBrowserRouter (React Router v6.4+)', value: 'createBrowserRouter' },
                    { name: 'BrowserRouter / Routes', value: 'browserRouterRoutes' }
                ],
                default: 'createBrowserRouter'
            },
            {
                type: 'confirm',
                name: 'useLazy',
                message: 'Add lazy loading with Suspense?',
                default: false
            },
            {
                type: 'confirm',
                name: 'useGuards',
                message: 'Add route guards (PrivateRoutes)?',
                default: false
            },
            {
                type: 'confirm',
                name: 'useDotenv',
                message: 'Configure .env with dotenv?',
                default: false
            },
            {
                type: 'confirm',
                name: 'useTailwind',
                message: 'Configure Tailwind CSS + DaisyUI?',
                default: false
            }
        ]);
    }

    writing() {
        const { routingStyle, useLazy, useGuards, useDotenv, useTailwind } = this.answers;
        const props = { useLazy, useGuards, useDotenv, useTailwind };

        this.fs.extendJSON(this.destinationPath('package.json'), {
            dependencies: {
                'react-router-dom': '^6.26.0',
                ...(useDotenv && { dotenv: '^16.4.5' }),
                ...(useTailwind && { tailwindcss: '^4.1.0', '@tailwindcss/vite': '^4.1.0', daisyui: '^5.0.0' })
            }
        });

        if (routingStyle === 'createBrowserRouter') {
            this.fs.copyTpl(
                this.templatePath('src/main.jsx'),
                this.destinationPath('src/main.jsx'),
                props
            );
        } else {
            this.fs.copyTpl(
                this.templatePath('src/App.jsx'),
                this.destinationPath('src/App.jsx'),
                props
            );
        }

        this.fs.copyTpl(
            this.templatePath('src/view/Home/HomePage.jsx'),
            this.destinationPath('src/view/Home/HomePage.jsx'),
            props
        );

        this.fs.copyTpl(
            this.templatePath('src/view/Login/LoginPage.jsx'),
            this.destinationPath('src/view/Login/LoginPage.jsx'),
            props
        );

        if (useGuards) {
            this.fs.copyTpl(
                this.templatePath('src/components/PrivateRoutes.jsx'),
                this.destinationPath('src/components/PrivateRoutes.jsx'),
                props
            );
        }

        if (useLazy) {
            this.fs.copyTpl(
                this.templatePath('src/components/Loading.jsx'),
                this.destinationPath('src/components/Loading.jsx'),
                props
            );
        }

        if (useDotenv) {
            this.fs.copyTpl(
                this.templatePath('env.template'),
                this.destinationPath('.env'),
                props
            );
        }

        if (useDotenv || useTailwind) {
            this.fs.copyTpl(
                this.templatePath('vite.config.js'),
                this.destinationPath('vite.config.js'),
                props
            );
        }

        if (useTailwind) {
            const cssPath = this.destinationPath('src/index.css');
            const tailwindHeader = '@import "tailwindcss";\n@plugin "daisyui/index.js";\n\n';
            if (this.fs.exists(cssPath)) {
                const existing = this.fs.read(cssPath);
                if (!existing.includes('@import "tailwindcss"')) {
                    this.fs.write(cssPath, tailwindHeader + existing);
                }
            } else {
                this.fs.write(cssPath, tailwindHeader + '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n');
            }
        }
    }

    install() {
        const pm = this.answers.packageManager;

        this.log('\nInstalling dependencies...\n');

        this.spawnCommandSync(`${pm} install`);
    }
};
