This is the web UI for the Rainstone app - an estimator of cloud costs for
bioinformatics tools and Galaxy workflows. See the [rainstone-api
repo](https://github.com/afgane/rainstone-api/) for the backend API.

## Run in dev mode

Clone this repo install requirements

```sh
npm install
```

Start the frontend server with

```sh
npm run dev
```

The frontend will be available at http://localhost:5173.

## Run via Docker

If building a new image, use the following command:

```
docker build -t afgane/rainstone-ui . --platform linux/amd64
```

Run with

```
docker run --rm --publish 8080:80 afgane/rainstone-ui
```

The UI will be available at http://localhost:8080.

By default, the UI requires the backend to be available at
http://localhost:8000. You can change the backend URL by creating a copy of
`config.js` file, setting the `API_BASE_URL` variable to the desired URL, and
mounting it as a volume in the Docker container:

```
docker run -it -p 8080:80 --rm -v "$(pwd)"/config_for_docker.js:/usr/share/nginx/html/config.js:ro afgane/rainstone-ui:latest
```

## Deploy on Kubernetes

See the [rainstone-helm repo](https://github.com/afgane/rainstone-helm).
