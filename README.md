# tgsint-api

REST API for [tgsint bot](https://github.com/runtimeterrorist/tgsint) written with help of Node,Express and MongoDB.

Serves [facebook leak](https://www.businessinsider.com/stolen-data-of-533-million-facebook-users-leaked-online-2021-4) data hosted on your database.

## Installation

1) Run `npm install` to install required dependencies
2) Add your mongodb connection url `(line 24 app.js)`.


## Usage

Start the server: `npm start`

The [bot](https://github.com/runtimeterrorist/tgsint) connects to it and queries data with /find command.

To populate your mongoDB database check [this repo.](https://github.com/runtimeterrorist/tgsint-scripts)
## Contributing
Pull requests are welcome. If you have a suggestion , please fork the repo and create a pull request.

You can also simply open an issue with the tag "enhancement".

## License
[MIT](https://choosealicense.com/licenses/mit/)
