#!/usr/bin/env node

import moment from "moment-timezone"
import minimist from "minimist"
import fetch from "node-fetch"

const timezone = moment.tz.guess()

const args = minimist(process.argv.slice(2))
if (args.h) {
     try {
       console.log(`
        Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.
        `)
        process.exitCode = 0
     } catch (err) {
       process.exitCode = 1
     }
}

let latitude = '35'
if(args.n) {
    latitude = args.n
}

if(args.s) {
    latitude = args.s
}

let longitude = '79'
if (args.e) {
    longitude = args.e
}
if (args.w) {
    longitude = args.w
}

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone)

const data = await response.json()

console.log(data)

const days = args.d;

if (days == 0) {
  console.log("today.");
} else if (days > 1) {
  console.log("in " + days + " days.");
} else {
  console.log("tomorrow.");
}
