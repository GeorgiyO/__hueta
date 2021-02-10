class GlobalStorage {

    setRealState;

    state = {};

    addCallback = (foo) => {
        return () => {
            foo();
            this.setRealState(this.state);
        }
    }

}