# Alpacash
<img src="readme_images/main_alpaca.png" width="250" height="250" title="Alpacash">
Alpacash is a gamified financial tracker that aims to engage its users to save more and derive excitement from managing their income and expenditure. It is a cross-platform mobile application with a clean and functional interface.

## Motivation
This application idea came about because we saw a trend of individuals downloading financial trackers but failing to keep up with updating their tracker. We thus wanted to develop an application that would engage its users to continuously use and open the app. In addition, we wanted Alpacash to be clean, intuitive and easy to use.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for testing purposes. 

### Prerequisites
What things you need to install and how to install them
```
react-native-cli: 2.0.1
```
```
react-native: 0.59.8
```
```
Android Studio (or working emulator of your choice)
```

### Installing
A step by step guide to get a development and testing environment running.
1. Install react native and android studio
2. Clone Alpacash into your local repository
3. Open your emulator
4. Switch to the Alpacash directory
5. Run "npm install"
6. Run "react-native run-android"

## Summary of Features
### Transactions
1. Add, delete and edit transactions

### Budget
1. Create weekly budgets

### Statistics

### Settings

## Additions or Bugs Squashed from Milestone 2 to 3
* Users can now collect a variety of alpacas (earned based on how much they save weekly) and view these alpacas in the achievements page found in Settings
* Users can now create and delete their own categories
* Users can now remove budgets
* Budget and statistics are now reset weekly (was not reset previously)
* Cleaner and more cohesive interface with standardised colour scheme
* Data is now connected to Firebase to enable saving of data when user closes the application

## Problems Encountered
* Firebase authentication cannot be added to React Native application
* React Native does not currently offer a way to get the position of moving objects on the screen. We were thus unable to merge alpacas as initially intended.

## Built With
* [React Native](https://facebook.github.io/react-native/)
* [Firebase](https://firebase.google.com/)

## Authors
* **Jolyn Tan** - [Github](https://github.com/jolynnn8D)
* **Valary Lim** - [Github](https://github.com/ValaryLim)