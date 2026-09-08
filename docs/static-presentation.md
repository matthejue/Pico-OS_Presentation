# Present on Ubuntu

Extract `picoos-presentation-static.tar.gz`, open a terminal in the extracted
`picoos-presentation-static` folder, and run:

```sh
./start-presentation.sh
```

Open <http://127.0.0.1:8000/> in Firefox or Chromium. Keep the terminal open while
presenting; press `Ctrl+C` there to stop the server. Use the arrow keys to navigate
and `F11` for browser fullscreen. Presenter view is available at
<http://127.0.0.1:8000/#/presenter/1>.

The script installs Python 3 with `sudo apt-get update` and
`sudo apt-get install -y python3` if it is missing. Do this while connected to the
internet before presenting. Node.js, Yarn, and the source repository are not
needed on the presentation computer.

The slides and images are included. Web fonts and external links still use the
internet; without it, the browser uses fallback fonts. Check the deck on the
presentation computer beforehand.

If port 8000 is occupied, choose another port:

```sh
./start-presentation.sh 8080
```

The server listens only on this computer. The underlying command is:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory /path/to/picoos-presentation-static
```
