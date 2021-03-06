﻿package 
{
	import flash.display.Sprite;
	import flash.media.Microphone;
	import flash.system.Security;
	import org.bytearray.micrecorder.*;
	import org.bytearray.micrecorder.events.RecordingEvent;
	import org.bytearray.micrecorder.encoder.WaveEncoder;
	import flash.events.MouseEvent;
	import flash.events.Event;
	import flash.events.ActivityEvent;
	import fl.transitions.Tween;
	import fl.transitions.easing.Strong;
	import flash.net.FileReference;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import flash.display.LoaderInfo;
	import flash.external.ExternalInterface;
	
	import flash.media.Sound;
    import flash.media.SoundChannel;
	import org.as3wavsound.WavSound;
	import org.as3wavsound.WavSoundChannel;
	

	public class Main extends Sprite{
		//麦克风
		private var mic:Microphone;
		//wave encodeer
		private var waveEncoder:WaveEncoder = new WaveEncoder();
		//mic recoder
		private var recorder:MicRecorder = new MicRecorder(waveEncoder);
		//view bar
		private var recBar:RecBar = new RecBar();
		
		private var player:WavSound;
		//声道
        private var soundCL:WavSoundChannel;
		//最大音量
		private var maxTime:Number = 60;
		
		private var tween:Tween;
		
		private var fileReference:FileReference = new FileReference();
		
		private var tts:WavSound;
		//tag
		private var micSta = true;

		public function Main():void{ 
		 	Security.allowDomain("*");
		 	//recButton.visible = false;
			recButton.gotoAndStop(1);
			//activity.visible = false ;
			//godText.visible = false;
			//recBar.visible = false;
			

			mic = Microphone.getMicrophone();
			
			if(mic == null){
				micSta = false;
			}else{
				mic.setSilenceLevel(5);
				mic.gain = 50;
				mic.setLoopBack(false);
				mic.setUseEchoSuppression(true);
				Security.showSettings("2");
			}
			
			addListeners();
			trace(ExternalInterface.addCallback("getMicSta", getMicSta));
			trace("Hello");
			//jStartRecording(60);
		}
		public function getMicSta():Boolean{
			return micSta;
		}

		private function addListeners():void{			
			
			recorder.addEventListener(RecordingEvent.RECORDING, recording);
			recorder.addEventListener(Event.COMPLETE, recordComplete);
			activity.addEventListener(Event.ENTER_FRAME, updateMeter);
			 
			//accept call from javascript to start recording
			ExternalInterface.addCallback("jStartRecording", jStartRecording);
			ExternalInterface.addCallback("jStopRecording", jStopRecording);
			ExternalInterface.addCallback("jStartListenRecording", jStartListenRecording);
			ExternalInterface.addCallback("jStopListenRecording", jStopListenRecording);
			ExternalInterface.addCallback("jSendFileToServer", jSendFileToServer);			
		}	
		
		
		//external java script function call to start record
		public function jStartRecording(max_time):void{			
			maxTime = max_time;			
			if (mic != null){
				recorder.record();
				//ExternalInterface.call("$.jRecorder.callback_started_recording");				
			}
			else{
				//ExternalInterface.call("$.jRecorder.callback_error_recording", 0);
			}
		}
		
		//external javascript function to trigger stop recording
		public function jStopRecording():void{
			recorder.stop();
			mic.setLoopBack(false);
			//ExternalInterface.call("$.jRecorder.callback_stopped_recording");			
			//finalize_recording();			
		}
		//start
		public function jStartListenRecording():void{
			player = new WavSound(recorder.output);
 			soundCL = player.play();
		}
		//stop
		public function jStopListenRecording():void{
			if(soundCL){
				soundCL.stop();
				soundCL = null;
			}
		}
		
		public function jSendFileToServer():void{			
			finalize_recording();			
		}		
		
		public function jStopPreview():void{			
			//no function is currently available;
		}		
		

		private function updateMeter(e:Event):void{			
			//ExternalInterface.call("$.jRecorder.callback_activityLevel",  mic.activityLevel);			
		}

		private function recording(e:RecordingEvent):void{
			var currentTime:int = Math.floor(e.time / 1000);
			
			//ExternalInterface.call("$.jRecorder.callback_activityTime",  String(currentTime) );			 
			
			if(currentTime == maxTime ){
				jStopRecording();
			}			
		}

		private function recordComplete(e:Event):void{
			//fileReference.save(recorder.output, "recording.wav");			
			
			//finalize_recording();			
			preview_recording(); 
			
		}
		
		private function preview_recording():void{
			
			tts = new WavSound(recorder.output);
			tts.play();
			
			//ExternalInterface.call("$.jRecorder.callback_started_preview");			
			
		}
		
		//functioon send data to server
		private function finalize_recording():void{
			
			var _var1:String= '';
			
			var globalParam = LoaderInfo(this.root.loaderInfo).parameters;
			for (var element:String in globalParam) {
     			if (element == 'host'){
           			_var1 =   globalParam[element];
     			}
			}			
			
			//ExternalInterface.call("$.jRecorder.callback_finished_recording");
			
			if(_var1 != ''){
				var req:URLRequest = new URLRequest(_var1);
            	req.contentType = 'application/octet-stream';
				req.method = URLRequestMethod.POST;
				req.data = recorder.output;				
				
            	var loader:URLLoader = new URLLoader(req);
				ExternalInterface.call("$.jRecorder.callback_finished_sending");			
			}			
		}
		
		private function getFlashVars():Object {
			return Object( LoaderInfo( this.loaderInfo ).parameters );
		}
	}
}