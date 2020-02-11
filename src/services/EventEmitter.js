import events from 'events';

class EventEmitter {
  constructor() {
    if (!EventEmitter.instance){
      this.emitter = new events.EventEmitter();
      EventEmitter.instance = this;
    }

    return EventEmitter.instance;
  }

  emit = (label, value) => {
    this.emitter.emit(label, value);
  }

  listen = (label, callback) => {
    this.emitter.addListener(label, callback);
  }
}

export default EventEmitter;
