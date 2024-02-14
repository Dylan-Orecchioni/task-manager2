export const updateTaskIDB = (newTask) => {


    let request = indexedDB.open('task-managerDB', 2)

    request.onsuccess = function(event){

        const db = event.target.result

        const transaction = db.transaction(['task'],'readwrite')

        const taskStore = transaction.objectStore("task")

        const request = taskStore.put(newTask)

        request.onsuccess = function(){
            console.log("Tache ajouté avec succès")
        }

        request.onerror = function(){
            console.error("une erreur est survenue lors de l'ajout de la tâche")
        }

    }

}

export const deleteTaskIDB = (taskId) => {


    let request = indexedDB.open('task-managerDB', 2)

    request.onsuccess = function(event){

        const db = event.target.result

        const transaction = db.transaction(['task'],'readwrite')

        const taskStore = transaction.objectStore("task")

        const request = taskStore.delete(taskId)

        request.onsuccess = function(){
            console.log("Tâche supprimé avec succès")
        }

        request.onerror = function(){
            console.error("une erreur est survenue lors de la suppression de la tâche")
        }

    }

}