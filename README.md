# Duk: Doghouse Drupal 8 Theme

* [Installation](#installation)
  * [Create Duk theme](#create-duk-theme)
  * [Set up Local Development](#set-up-local-development)
* [Theme Overview](#theme-overview)
  * [Folder Structure](#folder-structure)
  * [Sass Structure](#sass-structure)
  * [UiKit](#uikit)
  * [JavaScript](#javascript)
  * [Theme Regions](#theme-regions)
  * [Images](#images)


---


## Installation

### Create Duk theme

If you are reading this, it is likely that you have already done this. This theme is a starter theme created from a 
drush generator provided by the Duk tools module. It is a fork and adaptation of Acquia 
[Cog Tools module](https://github.com/acquia-pso/duk_tools). 

#### Generating a Duk theme

Add doghouse packages repo.

`composer config repositories.doghouse composer http://packages.doghouse.agency/`

Download the duk_tools module.
 
`composer require drupal/duk_tools`
 
Enable the duk_tools module

`drush pm:enable duk_tools`

Create a sub theme with drush.

`drush generate cog`

Drush will provide a series of questions to set options for the generated theme. The only value without a default is the theme name.

Enable your new sub theme. For a theme with the machine name `my_theme`:

`drush theme:enable my_theme`


### Set up local development

#### Using shell script to install node

This shell script is provided to enable more consistent local environment set up when not using a VM or Docker based 
solution. It installs [nvm](https://github.com/creationix/nvm) and whatever version of node is provided to it as an 
argument. It is provided for utility only and there is no guarantee it will work on your local system. 
It will not work on Windows as nvm does not support Windows. 
[See 'important notes'](https://github.com/creationix/nvm#important-notes).

### Building CSS & JS

See [Doghouse Webpack Project](https://github.com/DoghouseMedia/webpack-project) for a reusable abstraction for building 
SCSS and JS.

## Theme Overview

This provides a starting point for Doghouse theme development. It provides what you would need for most sites and 
acts as a great blank canvas for starting a new project. It is intended to couple with 
[Doghouse UiKit](https://bitbucket.org/doghouseagency/doghouse-uikit/src/2.x/) to reduce repetition between projects.  .

* Responsive containers built on CSS Grid, with a Susy grid system fallback for legacy browsers
* Initial SMACSS file architecture
* Common Twig files and theme dependencies
* Base preprocess functions for class definitions
* Living style guide construction via KSS-node

### Folder Structure

```
|-- config/  (install config for block positions and settings) 
|-- style/css/  (generated css) 
|-- gulp-tasks/ (modular gulp task files)
|-- images/  (theme images)
|-- js/  (compiled js)
|-- layouts/  (template files for defined layouts)
|-- style/scss/  (Component based styling, SCSS files and component templates)
|-- templates/  (folder for Drupal theme template files)
|-- install-node.sh (bash script to install nvm and node)
|-- logo.svg (placeholder logo svg file)
|-- README.md (This file)
|-- [theme-name].breakpoints.yml (theme default breakpoints)
|-- [theme-name].info.yml (theme config file)
|-- [theme-name].libraries.yml (starter libraries file to load theme assets)
|-- [theme-name].layouts.yml (configuration for provided layouts)
|-- [theme-name].theme (file to use for preprocess functions)
|-- theme-settings.php (file to use for making theme settings available in the GUI)
```

## Sass Structure

Setup of the Sass files so that they are properly broken out in partials and according to the SMACSS methodologies.

```
style/scss/
  |-- settings/
  |-- tools/
  |-- base/
  |-- objects/
  |-- layouts/
  |-- components/
  |-- style-guide-only/
  |-- main.scss
```

* **settings/** Common variables and maps.
* **tools/** Tools and utilities eg mixins and functions.
* **base/** intended as the baseline styling for HTML elements that you extend upon and will include things like resets, global typography, or common form selectors.
* **objects/** for objects that are reused across multiple layouts and components.
* **layouts/**  for structural layout that can apply to both the outer containers like the sidebars or headers, but also on inner structural pieces.
* **components/** these module files are the reusable or component parts of our design.
* **style-guide-only/** contains homepage.md which provides the content for the Overview section of the styleguide, and kss-only.scss which generates a css file for styling needed by a component for display in the style guide, but not loaded into the actual theme  

## UiKit

This theme assumes you are using the [Doghouse UiKit](https://bitbucket.org/doghouseagency/doghouse-uikit/src/2.x/) and 
a lightweight boilerplate is provided to assist with implementation.

You can see all the things UiKit provides [here](http://uikit.doghouse.agency).

## JavaScript

An example JS file `theme.js` is added by default in the `js/` folder. This file contains sample code wrapped in the `Drupal.behaviors` code standard. This JS file is added to the theme with the following portion of the code from `[theme-name].libraries.yml`. Cog does not have compression enabled for Gulp since it is relying on Drupal's caching system. 

```
lib:
  js:
    js/theme.js: {}
```

## Theme Regions

The regions available are standard with classic sidebar region, along with pre and post content areas. The intent is to allow for containers to go full-width and rely on the grid containers for inner Susy containers.

```
[theme-name].info.yml

regions:
  header: 'Header'
  primary_menu: 'Primary menu'
  secondary_menu: 'Secondary menu'
  page_top: 'Page top'
  page_bottom: 'Page bottom'
  featured: 'Featured'
  breadcrumb: 'Breadcrumb'
  content: 'Content'
  sidebar_first: 'Sidebar first'
  sidebar_second: 'Sidebar second'
  footer: 'Footer'

```
