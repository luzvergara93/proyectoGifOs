
let btn = document.getElementById('btn2');
let close = document.getElementById('close');
let video = document.getElementById('video');
let capturar = document.getElementById('capturar');

btn.addEventListener('click', function(){


   document.getElementById('box').style.display= 'none';
   document.getElementById('newBox').style.display = 'block';

});

close.addEventListener('click', function() {

    document.getElementById('box').style.display= 'block';
    document.getElementById('newBox').style.display = 'none';

});



//FUNCION PEDIR PERMISOS



document.getElementById('camera').addEventListener('click', function getStreamAndRecord () {
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    height: { max: 480 }
    }
    })
    .then( stream => {
    video.srcObject = stream;
    //video.play()
    }).catch(function(err) {
        console.log(err.name, err.message);
    }

)});


capturar.addEventListener('click', function(){
    capturar.remove();
    document.getElementById('listo').style.display = 'block';
    document.getElementById('camera').remove();
    document.getElementById('recording').style.display = 'block';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('title2').innerHTML = 'Capturando Tu Guifo';
   // recorder.startRecording();
});



/* window.addEventListener('load', getStreamAndRecord, false);  */ 


recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
    console.log('started')
    },
    });


    