import axios from 'axios';
const serverAddress = 'https://fd87172a.ngrok.io';

class ProductMappingService{
    //send mapping data
    sendData(data){
        axios.post(serverAddress+'/items/add/post',{ 
            item:data
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    //update mapping data
    updateData(data, id){
        axios.post(serverAddress+'/items/update/'+id, {
          item: data
        })
        .then(res => this.setState({ items: res.data }))
        .catch(err => console.log(err))
      }

      //remove mapping
      deleteData(id){
          axios.get(serverAddress+'/items/delete/'+id)
          .then(console.log("deleted"))
          .catch(err=>console.log(err))
      }
}

export default ProductMappingService;