import gameNotificationNamespace from "./notification.namespace"

const initializeNamespace = (socketServer) => {
    gameNotificationNamespace(socketServer)
}

export default initializeNamespace