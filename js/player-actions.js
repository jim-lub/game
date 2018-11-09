/* jshint esversion: 6 */
class PlayerActions {
    constructor(playerActions) {
      this.playerActions = playerActions;

      this.idle = {
        active: false
      };
      this.run = {
        active: false
      };
      this.jump = {
        active: false
      };
      this.slide = {
        active: false
      };
    }

    setToActive(arg) {
      // set active to false for each action
      this.playerActions.forEach(action => this[action].active = false);
      // set active to true for action argument
      this[arg].active = true;
    }
}
