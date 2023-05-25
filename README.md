# Audio to text transcriber 
Jist is an audio transcriber using Whisper Ai. It's designed as a voice memo app that converts audio to text. It also logs the text in an API built with Django and Postgres. I built this as part of my coursework at General Assembly with the goal of gaining experience building APIs, working with Django, and experimenting with Ai.  
![Home page](/Screenshot%202023-05-24%20at%2011.57.02%20PM.png)
### Frameworks 
- React
- Django
- PSQL 

## Build status
Check out the app here: [Jist](https://jist-frontend.vercel.app/). 
In the project directory, you can run:

### Launching from repo:
### frontend 
- `npm install`
- `npm start` 
### [backend repo](https://github.com/navonodjoseph/backendjist/settings)
- `pip install pipenv`
- `pipenv install`
- `pipenv shell`
- `python manage.py runserver`

## About the project

Most of the project was focused on the backend which receives an audio `Blob`, reads the file and converts it from `webM` to `wav`. You can learn more about what audio files on the OpenAi's [documentation page](https://github.com/openai/whisper). 

This version uses Whisper's `base` model which I used mainly because of its speed and filesize. The performance of `base` is far from perfect. If you prefer to use a larger model size, you'll get better results. 

```
            model = whisper.load_model("base")
            result = model.transcribe(output_file_path)
            transcript_text = result['text']
            print(result["text"])
```


## About the audio recorder
There are a lot of audio-media React hooks that record audio files, not all of them are great. I wish I would have spent more time researching this. A couple of the ones I tried returned corrupted files. 

## Where to go from here
- [X] Build decent audio recorder
- [X] Automate voice transcription 
- [X] Database storage
- [ ] CRUD functionality for transcripts
- [ ] Video transcription 
- [ ] Authentication 
- [ ] Mobile app
- [ ] Improved design
- [ ] Search feature