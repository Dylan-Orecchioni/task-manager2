export const updateTableIDB = (newTable) => {


    let request = indexedDB.open('task-managerDB', 2)

    request.onsuccess = function(event){

        const db = event.target.result

        const transaction = db.transaction(['table'],'readwrite')

        const tableStore = transaction.objectStore("table")

        const request = tableStore.put(newTable)

        request.onsuccess = function(){
            console.log("Tableau ajouté avec succès")
        }

        request.onerror = function(){
            console.error("une erreur est survenue lors de l'ajout du tableau")
        }

    }

}

export const deleteTableIDB = (tableId) => {


    let request = indexedDB.open('task-managerDB', 2)

    request.onsuccess = function(event){

        const db = event.target.result

        const transaction = db.transaction(['table'],'readwrite')

        const tableStore = transaction.objectStore("table")

        const request = tableStore.delete(tableId)

        request.onsuccess = function(){
            console.log("Tableau supprimé avec succès")
        }

        request.onerror = function(){
            console.error("une erreur est survenue lors de la suppression du tableau")
        }

    }

}