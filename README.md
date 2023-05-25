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
### backend 
- `pip install pipenv`
- `pipenv install`
- `pipenv shell`
- `python manage.py runserver`

## About the project
I completed this as a student at General Assembly. This is my first project using Ai. I'm most proud of the API element. The audio is recorded on the client side using `React-Media-Recorder` which captures audio and stores it as a audio `Blob` containing a `webM` file. Once on the server side, the `blob` is read and convered to a .wav file using `pyaudio`. 

```
def post(self, request):
        audio_file = request.FILES.get('audio')
        if audio_file: 
            audio_data = audio_file.read()

            # convert to audio segment using pydub
            audio_segment = AudioSegment.from_file(io.BytesIO(audio_data))
            
            # save to folder
            output_folder = 'output'
            if not os.path.exists(output_folder):
                os.makedirs(output_folder)
            
            # generate unique filename
            timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            output_filename = f'audio_{timestamp}.wav'

            # save audio as .wavfile
            output_file_path = os.path.join(output_folder, output_filename)
            audio_segment.export(output_file_path, format='wav')
            print('Saved file to: ', output_file_path)

            model = whisper.load_model("base")
            result = model.transcribe(output_file_path)
            transcript_text = result['text']
            print(result["text"])
```
Using a POST request, I built a `views.py` file that converts audio, generates a unique filename, saves and transcribes. I'm most proud of this code. 

## About the audio recorder
There are a lot of audio-media React hooks that record audio files, not all of them are great. I wish I would have spent more time researching this. A couple of the ones I tried returned corrupted files. 

## Where to go from here 
-[ ] CRUD functionality for transcripts
-[ ] Video transcription 
-[ ] Authentication 
-[ ] Mobile app
-[ ] Improved design
-[ ] Search feature