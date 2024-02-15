import axios from 'axios'

const url_get_tasks = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task?key=" + import.meta.env.VITE_API_KEY

export function getTasks(){

    try{

        return axios.get(url_get_tasks)
        .then(function(response){
            let tasksFirebase = response.data.documents
            let tasks = []

            for(let ts of tasksFirebase){
                let task = {
                    id: ts.fields.id.stringValue,
                    content: ts.fields.content.stringValue,
                    tableId: ts.fields.tableId.stringValue,
                }
                tasks.push(task)
            }
            return tasks
        })

    } catch(e){
        console.error(e)
    }

}