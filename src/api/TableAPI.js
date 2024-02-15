import axios from 'axios'

const url_get_tables = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/table?key=" + import.meta.env.VITE_API_KEY

export function getTables(){

    try{

        return axios.get(url_get_tables)
        .then(function(response){
            let tablesFirebase = response.data.documents
            let tables = []
            console.log(tablesFirebase)
            for(let tb of tablesFirebase){
                let table = {
                    id: tb.name.split('/table/')[1],
                    order: tb.fields.order.stringValue,
                    spaceId: tb.fields.spaceId.stringValue,
                    title: tb.fields.title.stringValue,
                }
                tables.push(table)
            }
            return tables
        })

    } catch(e){
        console.error(e)
    }

}

const url_add_tables = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/table?key=" + import.meta.env.VITE_API_KEY;

export function addTablesAPI(title, spaceId, order) {
  console.log(title, spaceId, order);
  try {
    return axios.post(
      url_add_tables,
      {
        "fields": {
          "title": {
            "stringValue": title
          },
          "spaceId": {
            "stringValue": spaceId
          },
          "order": {
            "integerValue": order
          }
        }
      }
    )
    .then(function(response) {
      return response.data.name.split("/table/")[1];
    });
  } catch(e) {
    console.error(e);
  }
}


export function deleteTablesAPI(id){

  const url_delete_table = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/table/" + id + "?key=" + import.meta.env.VITE_API_KEY

  try{

      return axios.delete(
          url_delete_table
      )
      .then(function(response){
          console.log(response)
      })

  } catch(e){
      console.error(e)
  }

}