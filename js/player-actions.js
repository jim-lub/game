/* jshint esversion: 6 */
class Actions {
    constructor() {
      this.active = false;
      this.timestamp = null;
    }

    setToActive() {
      this.active = true;
    }
}

class Idle extends Actions {
  constructor() {
    super();
  }
}

class Run extends Actions {
  constructor() {
    super();
  }
}

class Jump extends Actions {
  constructor() {
    super();
  }
}

class Slide extends Actions {
  constructor() {
    super();
  }
}
