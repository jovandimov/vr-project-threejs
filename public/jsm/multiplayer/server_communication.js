import { io } from "./socket.io.esm.min.js"; //../../node_modules/socket.io-client/dist/

class serverCommunication {
    constructor() {
        this.socket = io("http://localhost:4000");
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        this.socket.on('update', (data) => {
            console.log(data);
        });
    }
}

export { serverCommunication };