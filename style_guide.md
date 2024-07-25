# Appium View Style Guide
This document is solely for the purpose of maintaining a synchronous style throughout the a2u_appiumview_js project. Unless you intend on making PRs to this repository, you may ignore this file.

## Pages
A page refers to a component that takes up the area of the screen right of the main menu. Page components should be titled `'main.jsx'` and located within the `'pages/<page-title>'` directory. Their corresponding style sheet should be titled `'main.css'` and located in the same directory.

The primary page component within the `main.jsx` file should have the same name as the directory it is under. For example, the component in `pages/ScriptPage/main.jsx` should be labeled `ScriptPage`.

## Components
In general, a file may contain multiple components, but this should not sacrifice legibility. If a file begins to become overly long due to the number of components within it, those components should be moved to separate files. 

A component that is used across multiple pages and places in the application should be placed in the `'components'` directory. 

A component that is used in a single page should be kept in that page's directory (`'pages/<page-title'`).

