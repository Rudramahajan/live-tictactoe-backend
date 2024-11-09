import notificationNamespace from "./notification.namespace"
import chatNamespace from "./chat.namespace"

const initializeNamespace = (socketServer) => {
    notificationNamespace(socketServer)
    chatNamespace(socketServer)
}

export default initializeNamespace