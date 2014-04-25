define(["underscore", "backbone", "models/pedal"], function(_, Backbone, Pedal){
    
    var MIN_SAMPLES = 4,
    MAX_SAMPLES = 1000,
    SIZE = 1000,

    TunerPedal = Pedal.extend({

        setupPedal: function() {
            this.analyser = PB.context.createAnalyser();
            this.analyser.fftSize = 2048;
            this.input.connect(this.analyser);
            this.buf = new Uint8Array(2048);

            this.notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

            this.currentPitch = 0;
            this.confidence = 0;
            var self = this;
            window.setInterval(function() {
                self.updatePitch();
            }, 50);
        },

        updatePitch: function() {
            this.analyser.getByteTimeDomainData(this.buf);
            this.autoCorrelate();
            this.note = this.noteFromPitch();
            this.detune = this.centsOffFromPitch(this.note);
            
            this.trigger('change');
        },

        autoCorrelate: function() {
            this.currentPitch = 0;
            this.confidence = 0;

            var best_offset = -1;
            var best_correlation = 0;
            var rms = 0;

            if (this.buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
                return;  // Not enough data

            for (var i=0;i<SIZE;i++) {
                var val = (this.buf[i] - 128)/128;
                rms += val*val;
            }
            rms = Math.sqrt(rms/SIZE);

            for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
                var correlation = 0;

                for (var i=0; i<SIZE; i++) {
                    correlation += Math.abs(((this.buf[i] - 128)/128)-((this.buf[i+offset] - 128)/128));
                }
                correlation = 1 - (correlation/SIZE);
                if (correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            }
            if ((rms>0.01)&&(best_correlation > 0.01)) {
                this.confidence = best_correlation * rms * 10000;
                this.currentPitch = PB.context.sampleRate/best_offset;
                console.log("f = " + PB.context.sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
            }
        },

        noteFromPitch: function () {
            var noteNum = 12 * (Math.log( this.currentPitch / 440 )/Math.log(2) )
            return Math.round(noteNum) + 69;
        },

        frequencyFromNoteNumber: function(note) {
            return 440 * Math.pow(2,(note-69)/12);
        },

        centsOffFromPitch: function (note) {
            return ( 1200 * Math.log( this.currentPitch / this.frequencyFromNoteNumber( note ))/Math.log(2) );
        }
    });

    return TunerPedal;
});