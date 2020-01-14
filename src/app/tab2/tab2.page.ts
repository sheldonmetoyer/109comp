import { Component } from '@angular/core';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';
import { Friend } from '../models/friend';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ Camera ]
})
export class Tab2Page {

  model = new Post();
  myFriends : Friend[] = [];

  constructor(private data: DataService, private camera : Camera) {
    this.data.getAllFriends().subscribe(list => {
      this.myFriends = []; //clear prev data
      
      //travel the list, filter only my friends
      for(var i=0; list.length; i++){
        if(list[i].belongsTo == 'Sheldon'){
          this.myFriends.push(list[i]);
        }
      }

    });
  }

  chooseImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };this.camera.getPicture(options).then
    (imageData => {
      let base64Image = "data:image/jpeg;base64," + imageData;
      console.log(base64Image);
      this.model.imageUrl = base64Image;
    },
    err => 
    {
      // Handle error
    }
  );
}

  sendPost(){
    this.model.createdOn = new Date(); //set this time
    console.log("Saving post", this.model);

    //save the obj
    this.data.savePost(this.model);

    //create new model (clear form)
    this.model = new Post();
  }

}
