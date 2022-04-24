# tgsint-api

REST API for [tgsint bot](https://github.com/runtimeterrorist/tgsint) written with the help of Node,Express and MongoDB.

Serves: 
- phone lookup api
- person lookup api
- nmap quick scan api 
- nmap custom scan api
- whois api


[ ! ] Note:

[Facebook data leak](https://www.businessinsider.com/stolen-data-of-533-million-facebook-users-leaked-online-2021-4) is used for phone/person lookup.

To populate your mongoDB database check [this repo.](https://github.com/runtimeterrorist/tgsint-scripts)

## Installation

1) Run `npm install` to install required dependencies
2) Edit the .env file and add your mongodb connection url


## Usage

Start the server: `npm start`

The [bot](https://github.com/runtimeterrorist/tgsint)  queries data from this server.

## Contributing
Pull requests are welcome.
If you have a suggestion open an issue with the tag "enhancement".  

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Legal disclaimer:
Developers assume no liability and are not responsible for any misuse or damage caused by this program.
This program is for educational purposes.
