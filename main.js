prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML ="<img id='captured_image' src='"+data_uri+"'>";
    });
}
console.log("ml5 version", ml5.version);
classifier=ml5.imageClassifier("  https://teachablemachine.withgoogle.com/models/zZ6_zxK6i/model.json  ", model_loaded);
function model_loaded()
{
 console.log("model is loaded")
};

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1="The first prediction is: "+prediction_1;
    speak_data2="The second prediction is: "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    utterThis.rate=0.8;
    synth.speak(utterThis);
}
function check()
{
    img=document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);

    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;

    prediction_1 = results[0].label;
    prediction_2 = results[1].label;

    speak();
     if(results[0].label=="Best")
     {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
     }
     if(results[0].label=="Amazing")
     {
        document.getElementById("update_emoji").innerHTML = "&#128076;";
     }
     if(results[0].label=="Victory")
     {
        document.getElementById("update_emoji").innerHTML = "&#9996;";
     }

     if(results[1].label=="Best")
     {
        document.getElementById("update_emoji2").innerHTML = "&#128077;";
     }
     if(results[1].label=="Amazing")
     {
        document.getElementById("update_emoji2").innerHTML = "&#128076;";
     }
     if(results[1].label=="Victory")
     {
        document.getElementById("update_emoji2").innerHTML = "&#9996;";
     }
     
}
