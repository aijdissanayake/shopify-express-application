import axios from 'axios';

class ItemService{
    sendData(data){
        axios.post('https://fe5b1685.ngrok.io/items/add/post',{
            item:data
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    updateData(data, id){
        axios.post('https://fe5b1685.ngrok.io/items/update/'+id, {
          item: data
        })
        .then(res => this.setState({ items: res.data }))
        .catch(err => console.log(err))
      }

      deleteData(id){
          axios.get('https://fe5b1685.ngrok.io/items/delete/'+id)
          .then(console.log("deleted"))
          .catch(err=>console.log(err))
      }
}

export default ItemService;