# tgsint-api

REST API for [tgsint bot](https://github.com/runtimeterrorist/tgsint-bot) written with the help of Node,Express and MongoDB.

Serves: 
- person lookup api (phone lookup or lookup by name and surname)
- whois api
- nmap api
- car lookup api ( plates lookup for croatia/bosnia and VIN lookup(croatia))

*subdomain enumeration is done trough [nmap hostmap-crtsh script](https://nmap.org/nsedoc/scripts/hostmap-crtsh.html).

[ ! ] Note:

[Facebook data leak](https://www.businessinsider.com/stolen-data-of-533-million-facebook-users-leaked-online-2021-4) is used for phone/person lookup.

To populate your MongoDB database check [this repo.](https://github.com/runtimeterrorist/tgsint-scripts)

## Installation

1) Run `npm install` to install required dependencies
2) Install nmap to your local machine and configure enviroment variables if needed
3) Edit the .env file and add your MongoDB connection url


## Usage

Start the server: `npm run dev`

This [bot](https://github.com/runtimeterrorist/tgsint-bot)  queries data from this server.

## Contributing

Pull requests are welcome.
If you have a suggestion open an issue with the tag "enhancement".  

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Legal disclaimer:

Developers assume no liability and are not responsible for any misuse or damage caused by this program.
This program is for educational purposes.
