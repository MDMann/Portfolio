# Portfolio

Description

# Contents

**[1. Getting Started](#gettingstarted)**
 - [1.1 Quickstart](#quickstart)
 - [1.2 Prerequisites](#prerequisites)
 - [1.3 Install](#install)
 - [1.4 Gulp Tasks: Clean, Build, Watch](#build)

# <span id="gettingstarted">Getting Started</span>

This section describes how to install prerequisites and run the portfolio website. We mainly use Bower, Gulp, and Bootstrap (Sass).

## <span id="quickstart">QuickStart</span>

Ruby, Node.js, Git, Bower, Gulp, and scss-lint have to be installed globally - see [Prerequisites](#prerequisites). If you are ready open up a terminal window, navigate to your project folder and install the specific web packages and node modules for the portfolio website:
```
bower install
npm install
```
 You're set! Now start the build tool/task runner by typing:
```
gulp
```
This command will trigger a series of tasks, which will clean up your build folder, process your markup, styles, scripts, fonts as well as images. After a few seconds, a new browser window should open automatically with your application already running. Alternatively open http://localhost:3000 in your browser!

## <span id="prerequisites">Prerequisites</span>

* [Ruby 1.9+/RubyGems](https://www.ruby-lang.org)
  - On **OS X** use the native Ruby bundled with OS X, check version with `ruby -v`
  - On **Ubuntu** use apt package manager: `sudo apt-get install ruby`, verify with `ruby -v`
  - On **Windows** use [RubyInstaller](http://rubyinstaller.org/), verify with `ruby -v`
  - Update using [RubyGems](https://rubygems.org/): `sudo gem update --system`
* [nodejs/npm](http://nodejs.org/)
  - On **OS X** use [Installer](http://nodejs.org/#download) or install using [Homebrew](http://brew.sh/): `brew install node`, verify with `node -v`  
  - On **Ubuntu** install using [nvm](https://github.com/creationix/nvm): `nvm install stable`, verify with `node -v`
  - On **Windows** use [Installer](http://nodejs.org/#download), verify with `node -v`
  - Update using [npm](https://www.npmjs.com/): `npm install -g npm@latest`
* [git](http://git-scm.com/)
  - On **OS X** use the native Git bundled with OS X, check version with `git --version`
  - On **Ubuntu** use apt package manager: `sudo apt-get install git`, verify with `git --version`
  - On **Windows** use [Installer](http://git-scm.com/download/win), verify with `git --version`
  - Update using the latest [Installer](http://git-scm.com/download) for your system or [Homebrew](http://brew.sh/)

### Web Package Manager, Build Tool, Testing

* [Bower](http://bower.io)
  - Install Bower using [npm](https://www.npmjs.com/): `npm install -g bower`
  - Verify installation: `bower -v`
  - Update using [npm](https://www.npmjs.com/): `npm update bower`
* [Gulp](http://gulpjs.com/)
  - Install Gulp globally using [npm](https://www.npmjs.com/): `npm install -g "gulpjs/gulp-cli#4.0"`
  - Verify installation: `gulp -v`
  - Update using [npm](https://www.npmjs.com/): `npm update gulp`
* [scss-lint](https://rubygems.org/gems/scss-lint/)
  - Install scss-lint globally using [RubyGems](https://rubygems.org/): `sudo gem install scss-lint`
  - Verify installation: `scss-lint -v`
  - Update using [RubyGems](https://rubygems.org/): `gem update scss-lint`

## <span id="install">Install</span>
**Important Note**: You can skip this part when applying the QuickStart instructions.

* Install required bower components / web packages
  - Install web packages using [Bower](http://bower.io): `bower install`
  - Verify installation by listing local packages: `bower list`
  - Update local packages: `bower update`
* Install required node modules for Gulp
  - Install node modules using [npm](https://www.npmjs.com/): `npm install --save-dev`
  - Verify installation: `npm list`
  - Check for outdated modules: `npm outdated`
  - Update local modules: `npm update`

## <span id="build">Gulp Tasks: Clean, Test, Build, Watch</span>

[TODO]